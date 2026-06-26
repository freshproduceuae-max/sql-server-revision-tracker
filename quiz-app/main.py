import pyglet
import os
import sys
import json
import time
from PyQt5.QtWidgets import (QApplication, QMainWindow, QStackedWidget, QWidget, QVBoxLayout, QHBoxLayout, QLabel,
                             QPushButton, QTabWidget, QFormLayout, QFileDialog, QMessageBox, QComboBox, QListWidget,
                             QTextEdit, QDialog, QScrollArea, QGridLayout, QButtonGroup, QRadioButton, QLineEdit,
                             QProgressBar)
from PyQt5.QtGui import QFont, QIcon
from PyQt5.QtCore import Qt, pyqtSignal
import pyttsx3


# ─────────────────────────────────────────────────────────────
# ProgressManager
# ─────────────────────────────────────────────────────────────
class ProgressManager:
    def __init__(self, file_path='progress.json'):
        self.file_path = file_path
        self.progress_data = self.load_progress()

    def load_progress(self):
        try:
            with open(self.file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def save_progress(self):
        with open(self.file_path, 'w') as f:
            json.dump(self.progress_data, f, indent=4)

    def update_progress(self, quiz_name, lesson_index, question_index, score, total_questions):
        # FIX: store total_questions so completion check is accurate
        if quiz_name not in self.progress_data:
            self.progress_data[quiz_name] = {}
        key = str(lesson_index)
        if key not in self.progress_data[quiz_name]:
            self.progress_data[quiz_name][key] = {
                "last_question": question_index,
                "score": score,
                "completed_times": 0,
                "total_questions": total_questions
            }
        else:
            self.progress_data[quiz_name][key]["last_question"] = question_index
            self.progress_data[quiz_name][key]["score"] = score
            # FIX: compare against actual total_questions, not dict length
            if question_index >= total_questions - 1:
                self.progress_data[quiz_name][key]["completed_times"] += 1
        self.save_progress()

    def get_lesson_progress(self, quiz_name, lesson_index):
        return self.progress_data.get(quiz_name, {}).get(str(lesson_index), None)

    def calculate_course_completion_percentage(self, quiz_name):
        quiz_progress = self.progress_data.get(quiz_name, {})
        total = len(quiz_progress)
        completed = sum(1 for l in quiz_progress.values() if l.get('last_question') is not None)
        return (completed / total) * 100 if total > 0 else 0


# ─────────────────────────────────────────────────────────────
# UserCourseStatistics
# ─────────────────────────────────────────────────────────────
class UserCourseStatistics:
    def __init__(self, file_path='course_statistics.json'):
        self.file_path = file_path
        self.statistics_data = self.load_statistics()

    def load_statistics(self):
        try:
            with open(self.file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def save_statistics(self):
        with open(self.file_path, 'w') as f:
            json.dump(self.statistics_data, f, indent=4)

    def update_statistics(self, quiz_name, lesson_name, time_spent, score, completed):
        if quiz_name not in self.statistics_data:
            self.statistics_data[quiz_name] = {}
        if lesson_name not in self.statistics_data[quiz_name]:
            self.statistics_data[quiz_name][lesson_name] = {
                "total_time_spent": 0, "attempts": 0,
                "average_score": 0, "completed": False
            }
        ls = self.statistics_data[quiz_name][lesson_name]
        ls["total_time_spent"] += time_spent
        ls["attempts"] += 1
        ls["average_score"] = (ls["average_score"] * (ls["attempts"] - 1) + score) / ls["attempts"]
        ls["completed"] = completed
        self.save_statistics()

    def get_statistics(self, quiz_name):
        return self.statistics_data.get(quiz_name)

    def calculate_average_score(self, quiz_name):
        qs = self.statistics_data.get(quiz_name, {})
        return sum(l['average_score'] for l in qs.values()) / len(qs) if qs else 0

    def calculate_time_spent(self, quiz_name):
        qs = self.statistics_data.get(quiz_name, {})
        return sum(l['total_time_spent'] for l in qs.values())

    def calculate_pass_fail_rate(self, quiz_name):
        qs = self.statistics_data.get(quiz_name, {})
        passed = sum(1 for l in qs.values() if l['average_score'] >= 50)
        return (passed / len(qs)) * 100 if qs else 0


# ─────────────────────────────────────────────────────────────
# ClickableLabel
# ─────────────────────────────────────────────────────────────
class ClickableLabel(QLabel):
    clicked = pyqtSignal()

    def __init__(self, parent=None):
        super().__init__(parent)

    def mousePressEvent(self, event):
        self.clicked.emit()
        super().mousePressEvent(event)


# ─────────────────────────────────────────────────────────────
# MainWindow
# ─────────────────────────────────────────────────────────────
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Quiz Application")
        self.setGeometry(100, 100, 900, 600)
        self.setStyleSheet("background-color: white;")

        self.progress_manager = ProgressManager()
        self.user_stats = UserCourseStatistics()

        self.central_widget = QStackedWidget()
        self.setCentralWidget(self.central_widget)

        self.login_page = LoginPage(self)
        self.home_page = HomePage(self)
        self.admin_page = AdminPage(self)

        self.central_widget.addWidget(self.login_page)
        self.central_widget.addWidget(self.home_page)
        self.central_widget.addWidget(self.admin_page)

        self.central_widget.setCurrentWidget(self.login_page)


# ─────────────────────────────────────────────────────────────
# LoginPage
# ─────────────────────────────────────────────────────────────
class LoginPage(QWidget):
    def __init__(self, main_window):
        super().__init__()
        self.main_window = main_window
        layout = QVBoxLayout()

        self.welcome_label = QLabel("Please Log In")
        self.welcome_label.setFont(QFont("Poppins", 20))
        layout.addWidget(self.welcome_label, alignment=Qt.AlignCenter)

        self.username_input = QLineEdit(self)
        self.username_input.setFont(QFont("Poppins", 16))
        self.username_input.setPlaceholderText("Username")
        layout.addWidget(self.username_input, alignment=Qt.AlignCenter)

        self.password_input = QLineEdit(self)
        self.password_input.setFont(QFont("Poppins", 16))
        self.password_input.setPlaceholderText("Password")
        self.password_input.setEchoMode(QLineEdit.Password)
        layout.addWidget(self.password_input, alignment=Qt.AlignCenter)

        self.login_btn = QPushButton("Log In")
        self.login_btn.setFont(QFont("Poppins", 16))
        self.login_btn.setStyleSheet("background-color: #FFA500; color: white; padding: 10px; border-radius: 10px;")
        self.login_btn.clicked.connect(self.check_login)
        layout.addWidget(self.login_btn, alignment=Qt.AlignCenter)

        self.setLayout(layout)

    def check_login(self):
        username = self.username_input.text().strip()
        password = self.password_input.text().strip()
        if not username or not password:
            QMessageBox.warning(self, "Input Error", "Username and Password cannot be empty.")
            return
        role = self.login(username, password)
        if role == "Admin":
            self.main_window.central_widget.setCurrentWidget(self.main_window.admin_page)
        elif role == "User":
            self.main_window.central_widget.setCurrentWidget(self.main_window.home_page)
        else:
            QMessageBox.warning(self, "Login Failed", "Invalid username or password.")

    def login(self, username, password):
        try:
            with open('credentials.json', 'r') as f:
                credentials = json.load(f)
            if username in credentials and credentials[username]['password'] == password:
                return credentials[username]['role']
        except FileNotFoundError:
            QMessageBox.warning(self, "Error", "Credentials file not found.")
        return None


# ─────────────────────────────────────────────────────────────
# HomePage
# ─────────────────────────────────────────────────────────────
class HomePage(QWidget):
    def __init__(self, main_window):
        super().__init__()
        self.main_window = main_window
        self.hidden_quizzes = set()
        layout = QVBoxLayout()

        self.welcome_label = QLabel("Welcome to the Quiz Application")
        self.welcome_label.setFont(QFont("Poppins", 20))
        layout.addWidget(self.welcome_label, alignment=Qt.AlignCenter)

        self.quiz_selection = QComboBox(self)
        self.quiz_selection.setFont(QFont("Poppins", 16))
        layout.addWidget(self.quiz_selection, alignment=Qt.AlignCenter)

        self.start_quiz_btn = QPushButton("Start Quiz")
        self.start_quiz_btn.setFont(QFont("Poppins", 16))
        self.start_quiz_btn.setStyleSheet("background-color: #FFA500; color: white; padding: 10px; border-radius: 10px;")
        self.start_quiz_btn.clicked.connect(self.start_quiz)
        layout.addWidget(self.start_quiz_btn, alignment=Qt.AlignCenter)

        self.view_progress_btn = QPushButton("View Progress")
        self.view_progress_btn.setFont(QFont("Poppins", 16))
        self.view_progress_btn.setStyleSheet("background-color: #32CD32; color: white; padding: 10px; border-radius: 10px;")
        self.view_progress_btn.clicked.connect(self.view_progress)
        layout.addWidget(self.view_progress_btn, alignment=Qt.AlignCenter)

        self.back_btn = QPushButton("Back to Login")
        self.back_btn.setFont(QFont("Poppins", 16))
        self.back_btn.setStyleSheet("background-color: #FF6347; color: white; padding: 10px; border-radius: 10px;")
        self.back_btn.clicked.connect(self.go_back)
        layout.addWidget(self.back_btn, alignment=Qt.AlignCenter)

        self.setLayout(layout)
        self.load_quizzes()

    def load_quizzes(self):
        data = self.load_quiz_data()
        if data:
            self.quiz_selection.clear()
            for quiz in data['quizzes']:
                if quiz["quiz_name"] not in self.hidden_quizzes:
                    self.quiz_selection.addItem(quiz["quiz_name"])

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_S and event.modifiers() == Qt.ControlModifier:
            self.hidden_quizzes.add(self.quiz_selection.currentText())
            self.load_quizzes()
        elif event.key() == Qt.Key_H and event.modifiers() == Qt.ControlModifier:
            self.hidden_quizzes.clear()
            self.load_quizzes()

    def start_quiz(self):
        selected_name = self.quiz_selection.currentText()
        data = self.load_quiz_data()
        selected_quiz = next((q for q in data['quizzes'] if q["quiz_name"] == selected_name), None)
        if selected_quiz:
            navigator = LessonNavigator(selected_quiz, self.main_window.progress_manager, self)
            if navigator.exec_() == QDialog.Accepted:
                dlg = QuizDialog(selected_quiz, navigator.selected_lesson_index,
                                 self.main_window.progress_manager, self.main_window.user_stats)
                dlg.exec_()

    def view_progress(self):
        selected_name = self.quiz_selection.currentText()
        stats = self.main_window.user_stats.get_statistics(selected_name)
        if stats:
            avg = self.main_window.user_stats.calculate_average_score(selected_name)
            total_time = self.main_window.user_stats.calculate_time_spent(selected_name)
            pass_fail = self.main_window.user_stats.calculate_pass_fail_rate(selected_name)
            completion = self.main_window.progress_manager.calculate_course_completion_percentage(selected_name)
            details = (f"Quiz: {selected_name}\n\nAverage Score: {avg:.2f}%\n"
                       f"Total Time: {total_time:.2f}s\nPass/Fail Rate: {pass_fail:.2f}%\n"
                       f"Completion: {completion:.2f}%\n\nLessons:\n")
            for name, ls in stats.items():
                details += (f"\n{name}\n  Time: {ls['total_time_spent']:.1f}s  "
                            f"Attempts: {ls['attempts']}  "
                            f"Avg Score: {ls['average_score']:.1f}%  "
                            f"Done: {'Yes' if ls['completed'] else 'No'}\n")
            QMessageBox.information(self, "Statistics", details)
        else:
            QMessageBox.information(self, "Statistics", "No statistics available.")

    def load_quiz_data(self):
        try:
            with open('quizzes.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            QMessageBox.warning(self, "Error", "quizzes.json not found.")
        except json.JSONDecodeError as e:
            QMessageBox.warning(self, "Error", f"JSON error: {e}")
        return None

    def go_back(self):
        self.main_window.central_widget.setCurrentWidget(self.main_window.login_page)


# ─────────────────────────────────────────────────────────────
# AdminPage
# ─────────────────────────────────────────────────────────────
class AdminPage(QWidget):
    def __init__(self, main_window):
        super().__init__()
        self.main_window = main_window
        self.quizzes = []
        layout = QVBoxLayout()

        self.admin_label = QLabel("Admin Dashboard")
        self.admin_label.setFont(QFont("Poppins", 24))
        self.admin_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.admin_label)

        self.tab_widget = QTabWidget()
        self.tab_widget.setFont(QFont("Poppins", 16))
        self.setup_quiz_management_tab()
        self.setup_user_management_tab()
        self.setup_progress_tab()
        self.setup_navigation_buttons()

        layout.addWidget(self.tab_widget)
        self.setLayout(layout)
        self.load_quizzes()

    def setup_quiz_management_tab(self):
        self.quiz_management_tab = QWidget()
        ql = QVBoxLayout()

        self.quiz_selection = QComboBox()
        self.quiz_selection.setFont(QFont("Poppins", 16))
        self.quiz_selection.currentIndexChanged.connect(self.load_questions)
        ql.addWidget(self.quiz_selection)

        self.questions_list = QListWidget()
        self.questions_list.setFont(QFont("Poppins", 14))
        self.questions_list.itemClicked.connect(self.load_question_details)
        ql.addWidget(self.questions_list)

        self.form_layout = QFormLayout()
        self.question_input = QLineEdit()
        self.question_input.setFont(QFont("Poppins", 16))
        self.form_layout.addRow("Question:", self.question_input)

        self.choices_input = QTextEdit()
        self.choices_input.setFont(QFont("Poppins", 16))
        self.form_layout.addRow("Choices (comma-separated):", self.choices_input)

        self.correct_answer_input = QLineEdit()
        self.correct_answer_input.setFont(QFont("Poppins", 16))
        self.form_layout.addRow("Correct Answer(s):", self.correct_answer_input)

        self.image_upload_btn = QPushButton("Upload Image")
        self.image_upload_btn.setFont(QFont("Poppins", 16))
        self.image_upload_btn.setStyleSheet("background-color: #FFA500; color: white; padding: 10px; border-radius: 10px;")
        self.image_upload_btn.clicked.connect(self.upload_image)
        self.form_layout.addRow("Image:", self.image_upload_btn)
        ql.addLayout(self.form_layout)

        btn_layout = QHBoxLayout()
        self.save_btn = QPushButton("Save Question")
        self.save_btn.setFont(QFont("Poppins", 16))
        self.save_btn.setStyleSheet("background-color: #32CD32; color: white; padding: 10px; border-radius: 10px;")
        self.save_btn.clicked.connect(self.save_question)
        btn_layout.addWidget(self.save_btn)

        self.add_question_btn = QPushButton("Add New Question")
        self.add_question_btn.setFont(QFont("Poppins", 16))
        self.add_question_btn.setStyleSheet("background-color: #1E90FF; color: white; padding: 10px; border-radius: 10px;")
        self.add_question_btn.clicked.connect(self.add_new_question)
        btn_layout.addWidget(self.add_question_btn)
        ql.addLayout(btn_layout)

        self.quiz_management_tab.setLayout(ql)
        self.tab_widget.addTab(self.quiz_management_tab, "Manage Quizzes")

    def setup_user_management_tab(self):
        self.user_management_tab = QWidget()
        ul = QVBoxLayout()

        self.user_list = QListWidget()
        self.user_list.setFont(QFont("Poppins", 14))
        self.load_users()
        ul.addWidget(self.user_list)

        self.user_form_layout = QFormLayout()
        self.new_user_name = QLineEdit()
        self.new_user_name.setFont(QFont("Poppins", 16))
        self.user_form_layout.addRow("Username:", self.new_user_name)

        self.new_user_password = QLineEdit()
        self.new_user_password.setFont(QFont("Poppins", 16))
        self.new_user_password.setEchoMode(QLineEdit.Password)
        self.user_form_layout.addRow("Password:", self.new_user_password)

        self.add_user_btn = QPushButton("Add User")
        self.add_user_btn.setFont(QFont("Poppins", 16))
        self.add_user_btn.setStyleSheet("background-color: #32CD32; color: white; padding: 10px; border-radius: 10px;")
        self.add_user_btn.clicked.connect(self.add_user)
        self.user_form_layout.addWidget(self.add_user_btn)

        ul.addLayout(self.user_form_layout)
        self.user_management_tab.setLayout(ul)
        self.tab_widget.addTab(self.user_management_tab, "Manage Users")

    def setup_progress_tab(self):
        self.progress_tab = QWidget()
        pl = QVBoxLayout()
        self.progress_display = QListWidget()
        self.progress_display.setFont(QFont("Poppins", 14))
        pl.addWidget(self.progress_display)
        self.load_admin_progress()
        self.progress_tab.setLayout(pl)
        self.tab_widget.addTab(self.progress_tab, "View Progress")

    def setup_navigation_buttons(self):
        nav_widget = QWidget()
        nav_layout = QHBoxLayout(nav_widget)
        self.back_btn = QPushButton("Back")
        self.back_btn.setFont(QFont("Poppins", 16))
        self.back_btn.setStyleSheet("background-color: #FF6347; color: white; padding: 10px; border-radius: 10px;")
        self.back_btn.clicked.connect(self.go_back)
        nav_layout.addWidget(self.back_btn, alignment=Qt.AlignLeft)
        self.home_btn = QPushButton("Home")
        self.home_btn.setFont(QFont("Poppins", 16))
        self.home_btn.setStyleSheet("background-color: #FFA500; color: white; padding: 10px; border-radius: 10px;")
        self.home_btn.clicked.connect(self.go_home)
        nav_layout.addWidget(self.home_btn, alignment=Qt.AlignRight)
        self.tab_widget.setCornerWidget(nav_widget, Qt.TopLeftCorner)

    def go_back(self):
        self.main_window.central_widget.setCurrentWidget(self.main_window.home_page)

    def go_home(self):
        self.main_window.central_widget.setCurrentWidget(self.main_window.home_page)

    def load_quizzes(self):
        try:
            with open('quizzes.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.quizzes = data['quizzes']
                self.quiz_selection.clear()
                for q in self.quizzes:
                    self.quiz_selection.addItem(q["quiz_name"])
        except FileNotFoundError:
            QMessageBox.warning(self, "Error", "quizzes.json not found.")
        except json.JSONDecodeError as e:
            QMessageBox.warning(self, "Error", f"JSON error: {e}")

    def load_questions(self):
        selected = self.quiz_selection.currentText()
        self.questions_list.clear()
        quiz = next((q for q in self.quizzes if q["quiz_name"] == selected), None)
        if quiz:
            for lesson in quiz["lessons"]:
                for q in lesson["questions"]:
                    self.questions_list.addItem(q["question_text"])

    def load_question_details(self, item):
        selected = self.quiz_selection.currentText()
        quiz = next((q for q in self.quizzes if q["quiz_name"] == selected), None)
        if quiz:
            for lesson in quiz["lessons"]:
                for q in lesson["questions"]:
                    if q['question_text'] == item.text():
                        self.question_input.setText(q['question_text'])
                        self.choices_input.setText(", ".join(q['choices']))
                        self.correct_answer_input.setText(", ".join(q['correct_answer']))

    def save_question(self):
        selected_quiz = self.quiz_selection.currentText()
        selected_item = self.questions_list.currentItem()
        if selected_quiz and selected_item:
            for quiz in self.quizzes:
                if quiz["quiz_name"] == selected_quiz:
                    for lesson in quiz["lessons"]:
                        for q in lesson["questions"]:
                            if q['question_text'] == selected_item.text():
                                q['question_text'] = self.question_input.text()
                                q['choices'] = [c.strip() for c in self.choices_input.toPlainText().split(",")]
                                q['correct_answer'] = [a.strip() for a in self.correct_answer_input.text().split(",")]
                                self.save_quizzes()
                                QMessageBox.information(self, "Success", "Question saved.")
                                self.load_questions()
                                return
        QMessageBox.warning(self, "Error", "Could not save question.")

    def add_new_question(self):
        self.question_input.clear()
        self.choices_input.clear()
        self.correct_answer_input.clear()
        self.questions_list.clearSelection()
        QMessageBox.information(self, "New Question", "Fill in the details and click Save.")

    def save_quizzes(self):
        # FIX: save the full quizzes list, not just one quiz
        try:
            with open('quizzes.json', 'w', encoding='utf-8') as f:
                json.dump({"quizzes": self.quizzes}, f, indent=4)
        except IOError as e:
            QMessageBox.warning(self, "Error", f"Failed to save: {e}")

    def upload_image(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "Upload Image", "", "Image Files (*.png *.jpg *.bmp)")
        if file_name:
            selected_quiz = self.quiz_selection.currentText()
            selected_item = self.questions_list.currentItem()
            if selected_quiz and selected_item:
                for quiz in self.quizzes:
                    if quiz["quiz_name"] == selected_quiz:
                        for lesson in quiz["lessons"]:
                            for q in lesson["questions"]:
                                if q['question_text'] == selected_item.text():
                                    q['image'] = file_name
                                    QMessageBox.information(self, "Success", "Image uploaded.")
                                    return
        QMessageBox.warning(self, "Error", "Could not upload image.")

    def load_users(self):
        try:
            with open('user_data.json', 'r') as f:
                data = json.load(f)
                for user in data['users']:
                    self.user_list.addItem(f"User: {user['name']} (ID: {user['user_id']})")
        except FileNotFoundError:
            QMessageBox.warning(self, "Error", "user_data.json not found.")

    def add_user(self):
        name = self.new_user_name.text()
        pwd = self.new_user_password.text()
        if name and pwd:
            new_user = {"name": name, "password": pwd, "user_id": self.user_list.count() + 1}
            self.user_list.addItem(f"User: {name} (ID: {new_user['user_id']})")
            try:
                with open('user_data.json', 'r+') as f:
                    data = json.load(f)
                    data['users'].append(new_user)
                    f.seek(0)
                    json.dump(data, f, indent=4)
                QMessageBox.information(self, "Success", "User added.")
            except FileNotFoundError:
                QMessageBox.warning(self, "Error", "user_data.json not found.")
        else:
            QMessageBox.warning(self, "Error", "Username and password required.")

    def load_admin_progress(self):
        progress_file = 'progress.json'
        if not os.path.exists(progress_file):
            with open(progress_file, 'w') as f:
                json.dump({}, f)
            return
        try:
            with open(progress_file, 'r') as f:
                data = json.load(f)
                self.progress_display.clear()
                for user, progress in data.items():
                    self.progress_display.addItem(f"User: {user}")
                    for lesson, stats in progress.items():
                        self.progress_display.addItem(
                            f"  Lesson {int(lesson)+1}: Last Q: {stats['last_question']}, Score: {stats['score']}"
                        )
        except json.JSONDecodeError:
            QMessageBox.warning(self, "Error", "Error reading progress file.")


# ─────────────────────────────────────────────────────────────
# LessonNavigator
# ─────────────────────────────────────────────────────────────
class LessonNavigator(QDialog):
    def __init__(self, quiz, progress_manager, parent=None):
        super().__init__(parent)
        self.setWindowTitle(f"Select a Lesson - {quiz['quiz_name']}")
        self.setGeometry(100, 100, 1400, 600)
        self.selected_lesson_index = None
        self.progress_manager = progress_manager
        self.lessons = quiz['lessons']
        self.quiz_name = quiz['quiz_name']

        layout = QVBoxLayout()
        self.setLayout(layout)
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        layout.addWidget(scroll)
        container = QWidget()
        grid = QGridLayout(container)
        scroll.setWidget(container)

        for i, lesson in enumerate(self.lessons):
            btn = QPushButton(f"Lesson {i+1}: {lesson['lesson_name']}")
            btn.setFont(QFont("Poppins", 14))
            prog = self.progress_manager.get_lesson_progress(self.quiz_name, i)
            btn.setIcon(QIcon('ip.jpeg' if prog else 'completed.png'))
            btn.clicked.connect(lambda checked, idx=i: self.start_lesson(idx))
            grid.addWidget(btn, i // 2, i % 2)

    def start_lesson(self, index):
        self.selected_lesson_index = index
        self.accept()


# ─────────────────────────────────────────────────────────────
# ExplanationEditDialog
# ─────────────────────────────────────────────────────────────
class ExplanationEditDialog(QDialog):
    def __init__(self, current_explanation, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Edit Explanation")
        self.setGeometry(100, 100, 400, 200)
        self.setMinimumSize(300, 150)
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Edit the explanation below:"))
        self.explanation_edit = QTextEdit(self)
        self.explanation_edit.setText(current_explanation)
        layout.addWidget(self.explanation_edit)
        save_btn = QPushButton("Save Explanation")
        save_btn.clicked.connect(self.save_explanation)
        layout.addWidget(save_btn)
        self.setLayout(layout)
        self.updated_explanation = None

    def save_explanation(self):
        self.updated_explanation = self.explanation_edit.toPlainText().strip()
        self.accept()


# ─────────────────────────────────────────────────────────────
# QuizDialog
# ─────────────────────────────────────────────────────────────
class QuizDialog(QDialog):
    def __init__(self, quiz_data, selected_lesson, progress_manager, user_stats, parent=None):
        super().__init__(parent)

        # TTS engine setup
        self.engine = pyttsx3.init()
        voices = self.engine.getProperty('voices')
        # FIX: voice.languages is a list — iterate and check membership properly
        for voice in voices:
            langs = voice.languages
            # Match by name instead of languages list for reliability
            if 'naayf' in voice.name.lower() or 'arabic' in voice.name.lower():
                self.engine.setProperty('voice', voice.id)
                break

        self.incorrect_answers = []
        screen = QApplication.desktop().availableGeometry(self)
        self.setGeometry(screen.left() + 100, screen.top() + 100,
                         screen.width() // 2, screen.height() // 2)
        self.setMinimumSize(800, 600)
        self.setWindowTitle("Quiz")

        self.quiz_data = quiz_data
        self.selected_lesson = selected_lesson
        self.current_question_index = 0
        self.score = 0
        self.total_questions = len(quiz_data['lessons'][selected_lesson]['questions'])
        self.progress_manager = progress_manager
        self.user_stats = user_stats
        self.current_question = None  # FIX: initialise so edit_explanation never crashes

        self.main_layout = QVBoxLayout()
        self.main_layout.setContentsMargins(20, 20, 20, 20)
        self.main_layout.setSpacing(20)
        self.setLayout(self.main_layout)

        self.add_header()
        self.add_progress_bar_and_question_number()

        # FIX: do NOT add explanation_label in __init__ — it gets cleared immediately
        # It is created fresh in show_explanation() each time

        self.start_time = time.time()

        # Load sounds (use relative paths; handle missing files gracefully)
        try:
            self.correct_sound = pyglet.media.load('Sounds/Right.wav', streaming=False)
            self.wrong_sound = pyglet.media.load('Sounds/Wrong.wav', streaming=False)
        except Exception:
            self.correct_sound = None
            self.wrong_sound = None

        self.load_question()

    def play_sound(self, correct):
        try:
            if correct and self.correct_sound:
                self.correct_sound.play()
            elif not correct and self.wrong_sound:
                self.wrong_sound.play()
        except Exception:
            pass

    def add_header(self):
        self.quiz_name_label = QLabel(self.quiz_data['quiz_name'])
        self.quiz_name_label.setFont(QFont("Poppins", 16, QFont.Bold))
        self.quiz_name_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(self.quiz_name_label)

        self.lesson_name_label = QLabel(
            f"Lesson {self.selected_lesson+1}: "
            f"{self.quiz_data['lessons'][self.selected_lesson]['lesson_name']}"
        )
        self.lesson_name_label.setFont(QFont("Poppins", 14, QFont.Bold))
        self.lesson_name_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(self.lesson_name_label)

    def add_progress_bar_and_question_number(self):
        self.question_number_label = QLabel(f"Question 1 of {self.total_questions}")
        self.question_number_label.setFont(QFont("Poppins", 12))
        self.question_number_label.setAlignment(Qt.AlignLeft)
        self.main_layout.addWidget(self.question_number_label)

        self.progress_bar = QProgressBar(self)
        self.progress_bar.setValue(0)
        self.progress_bar.setStyleSheet("QProgressBar::chunk {background-color: #32CD32;}")
        self.main_layout.addWidget(self.progress_bar)

    def load_question(self):
        self.clear_layout()
        lesson_data = self.quiz_data['lessons'][self.selected_lesson]
        if self.current_question_index >= len(lesson_data['questions']):
            self.show_final_score()
            return

        self.current_question = lesson_data['questions'][self.current_question_index]  # FIX: assign to self
        q_type = self.current_question.get("type", "multiple_choice")

        q_label = QLabel(self.current_question["question_text"])
        q_label.setFont(QFont("Poppins", 16))
        q_label.setWordWrap(True)
        q_label.setAlignment(Qt.AlignLeft)
        self.main_layout.addWidget(q_label)

        if q_type == "multiple_choice":
            self.load_multiple_choice_question(self.current_question)
        elif q_type == "true_false":
            self.load_true_false_question(self.current_question)
        elif q_type == "fill_in_the_blank":
            self.load_fill_in_the_blank_question(self.current_question)
        elif q_type == "matching_pairs":
            self.load_matching_pairs_question(self.current_question)
        elif q_type == "short_answer":
            self.load_short_answer_question(self.current_question)

        self.submit_button = QPushButton("Submit Answer")
        self.submit_button.setFont(QFont("Poppins", 14))
        self.submit_button.setStyleSheet(
            "QPushButton{background-color:#FFA500;color:white;padding:10px;border-radius:10px;}"
            "QPushButton:hover{background-color:#ff9900;}"
        )
        self.submit_button.clicked.connect(lambda: self.check_answer(self.current_question))
        self.main_layout.addWidget(self.submit_button, alignment=Qt.AlignCenter)

        pct = int((self.current_question_index + 1) / self.total_questions * 100)
        self.progress_bar.setValue(pct)
        self.question_number_label.setText(f"Question {self.current_question_index+1} of {self.total_questions}")

    def clear_layout(self):
        # Keep first 4 widgets: quiz name, lesson name, question number, progress bar
        while self.main_layout.count() > 4:
            item = self.main_layout.takeAt(4)
            w = item.widget()
            if w:
                w.deleteLater()
            elif item.layout():
                self._clear_nested(item.layout())

    def _clear_nested(self, layout):
        while layout.count():
            item = layout.takeAt(0)
            w = item.widget()
            if w:
                w.deleteLater()
            elif item.layout():
                self._clear_nested(item.layout())

    def load_multiple_choice_question(self, question):
        self.answer_group = QButtonGroup(self)
        for choice in question["choices"]:
            btn = QRadioButton(choice)
            btn.setFont(QFont("Poppins", 16))
            btn.setMinimumHeight(40)
            btn.setStyleSheet("QRadioButton { padding: 10px; }")
            self.main_layout.addWidget(btn)
            self.answer_group.addButton(btn)

    def load_true_false_question(self, question):
        self.answer_group = QButtonGroup(self)
        for label in ["True", "False"]:
            btn = QRadioButton(label)
            btn.setFont(QFont("Poppins", 16))
            btn.setMinimumHeight(40)
            self.main_layout.addWidget(btn)
            self.answer_group.addButton(btn)

    def load_fill_in_the_blank_question(self, question):
        self.answer_input = QLineEdit(self)
        self.answer_input.setFont(QFont("Poppins", 16))
        self.answer_input.setMinimumHeight(40)
        self.main_layout.addWidget(self.answer_input)

    def load_matching_pairs_question(self, question):
        combined = question.get("choices", {})
        terms = combined.get("terms", list(combined.keys()))
        definitions = combined.get("definitions", list(combined.values()))
        self.matching_widgets = []
        for term in terms:
            term_label = QLabel(term)
            term_label.setFont(QFont("Poppins", 16))
            combo = QComboBox()
            combo.setFont(QFont("Poppins", 16))
            combo.addItems(definitions)
            combo.setMinimumWidth(200)
            combo.setMinimumHeight(40)
            row = QHBoxLayout()
            row.addWidget(term_label)
            row.addWidget(combo)
            self.main_layout.addLayout(row)
            self.matching_widgets.append((term, combo))

    def load_short_answer_question(self, question):
        self.answer_input = QTextEdit(self)
        self.answer_input.setFont(QFont("Poppins", 14))
        self.answer_input.setMinimumHeight(100)
        self.main_layout.addWidget(self.answer_input)

    def check_answer(self, current_question):
        q_type = current_question.get("type", "multiple_choice")
        correct = False
        explanation_text = current_question.get("explanation", "")

        # ── Multiple choice ──────────────────────────────────
        if q_type == "multiple_choice":
            selected_button = self.answer_group.checkedButton()
            if not selected_button:
                QMessageBox.warning(self, "No Selection", "Please select an answer.")
                return
            selected = selected_button.text().strip().lower()
            correct_answers = current_question.get("correct_answer", [])
            if isinstance(correct_answers, str):
                correct_answers = [correct_answers]
            correct_answers = [a.strip().lower() for a in correct_answers]
            correct = selected in correct_answers
            if correct:
                explanation_text = f"✅ Correct!\n\n{explanation_text}"
                selected_button.setStyleSheet("background-color: #32CD32; color: white;")
                self.score += 1
            else:
                explanation_text = f"❌ Wrong. Correct: {', '.join(correct_answers)}\n\n{explanation_text}"
                selected_button.setStyleSheet("background-color: #FF6347; color: white;")
                self.incorrect_answers.append(current_question)

        # ── True / False ─────────────────────────────────────
        # FIX: code was inside the `if not selected_button` block after return — unreachable
        elif q_type == "true_false":
            selected_button = self.answer_group.checkedButton()
            if not selected_button:
                QMessageBox.warning(self, "No Selection", "Please select True or False.")
                return
            # FIX: these lines now at correct indentation level
            selected = selected_button.text().strip()
            correct_answers = current_question.get("correct_answer", [])
            correct = selected in correct_answers
            if correct:
                explanation_text = f"✅ Correct!\n\n{explanation_text}"
                selected_button.setStyleSheet("background-color: #32CD32; color: white;")
                self.score += 1
            else:
                explanation_text = f"❌ Wrong. Correct: {', '.join(correct_answers)}\n\n{explanation_text}"
                selected_button.setStyleSheet("background-color: #FF6347; color: white;")
                self.incorrect_answers.append(current_question)

        # ── Fill in the blank ────────────────────────────────
        # FIX: same indentation bug — answer checking was inside the guard block
        elif q_type == "fill_in_the_blank":
            entered = self.answer_input.text().strip().lower()
            if not entered:
                QMessageBox.warning(self, "No Answer", "Please enter an answer.")
                return
            # FIX: these lines now at correct indentation level
            correct_answers = [a.lower() for a in current_question.get("correct_answer", [])]
            correct = entered in correct_answers
            if correct:
                explanation_text = f"✅ Correct!\n\n{explanation_text}"
                self.answer_input.setStyleSheet("background-color: #32CD32; color: white;")
                self.score += 1
            else:
                explanation_text = f"❌ Wrong. Correct: {', '.join(current_question['correct_answer'])}\n\n{explanation_text}"
                self.answer_input.setStyleSheet("background-color: #FF6347; color: white;")
                self.incorrect_answers.append(current_question)

        # ── Matching pairs ───────────────────────────────────
        # FIX: `if correct` was inside the for loop — score could be added multiple times
        elif q_type == "matching_pairs":
            correct = True
            for term, combo in self.matching_widgets:
                selected = combo.currentText().strip()
                if current_question["correct_answer"].get(term) != selected:
                    correct = False
                    combo.setStyleSheet("background-color: #FF6347; color: white;")
                else:
                    combo.setStyleSheet("background-color: #32CD32; color: white;")
            # FIX: now outside the loop
            if correct:
                explanation_text = f"✅ Correct!\n\n{explanation_text}"
                self.score += 1
            else:
                explanation_text = f"❌ Wrong. Some pairs were incorrect.\n\n{explanation_text}"
                self.incorrect_answers.append(current_question)

        # ── Short answer ─────────────────────────────────────
        elif q_type == "short_answer":
            entered = self.answer_input.toPlainText().strip().lower()
            keywords = [kw.lower() for kw in current_question.get("correct_answer", [])]
            correct = any(kw in entered for kw in keywords)
            if correct:
                explanation_text = f"✅ Correct!\n\n{explanation_text}"
                self.answer_input.setStyleSheet("background-color: #32CD32; color: white;")
                self.score += 1
            else:
                explanation_text = f"❌ Wrong. Expected: {', '.join(current_question['correct_answer'])}\n\n{explanation_text}"
                self.answer_input.setStyleSheet("background-color: #FF6347; color: white;")
                self.incorrect_answers.append(current_question)

        self.setStyleSheet(
            f"QDialog {{background: qlineargradient(spread:pad,x1:0,y1:0,x2:1,y2:1,"
            f"stop:0 white,stop:1 {'#32CD32' if correct else '#FF6347'});}}"
        )
        self.play_sound(correct)
        self.show_explanation(explanation_text)
        self.submit_button.hide()
        self.show_continue_button()

    def show_explanation(self, explanation_text):
        self.explanation_label = ClickableLabel(self)
        self.explanation_label.setText(f"Explanation: {explanation_text}")
        self.explanation_label.setFont(QFont("Poppins", 12))
        self.explanation_label.setWordWrap(True)
        self.explanation_label.mousePressEvent = self.edit_explanation
        self.main_layout.addWidget(self.explanation_label)
        self.explanation_label.show()

    def edit_explanation(self, event):
        # FIX: self.current_question is now always set before this is reachable
        if self.current_question:
            dlg = ExplanationEditDialog(self.current_question.get("explanation", ""), self)
            if dlg.exec_() == QDialog.Accepted and dlg.updated_explanation:
                self.current_question["explanation"] = dlg.updated_explanation
                self.explanation_label.setText(f"Explanation: {dlg.updated_explanation}")
                self.save_quiz_data()
        else:
            QMessageBox.warning(self, "Error", "No current question available.")

    def save_quiz_data(self):
        # FIX: load full file, replace this quiz, write back — preserves other quizzes
        try:
            with open('quizzes.json', 'r', encoding='utf-8') as f:
                all_data = json.load(f)
            for i, q in enumerate(all_data['quizzes']):
                if q['quiz_name'] == self.quiz_data['quiz_name']:
                    all_data['quizzes'][i] = self.quiz_data
                    break
            with open('quizzes.json', 'w', encoding='utf-8') as f:
                json.dump(all_data, f, indent=4)
        except Exception as e:
            QMessageBox.warning(self, "Error", f"Failed to save: {e}")

    def show_continue_button(self):
        self.continue_button = QPushButton("Continue")
        self.continue_button.setFont(QFont("Poppins", 14))
        self.continue_button.setStyleSheet(
            "QPushButton{background-color:#1E90FF;color:white;padding:10px;border-radius:10px;margin-top:20px;}"
            "QPushButton:hover{background-color:#1c86ee;}"
        )
        self.continue_button.clicked.connect(self.continue_to_next_question)
        self.main_layout.addWidget(self.continue_button, alignment=Qt.AlignCenter)

    def continue_to_next_question(self):
        self.current_question_index += 1
        self.setStyleSheet("QDialog { background-color: #f5f5f5; }")
        self.load_question()

    # FIX: only ONE show_final_score — the complete version with stats logging
    def show_final_score(self):
        self.clear_layout()

        self.progress_manager.update_progress(
            self.quiz_data['quiz_name'], self.selected_lesson,
            self.current_question_index, self.score, self.total_questions
        )
        time_spent = time.time() - self.start_time
        self.user_stats.update_statistics(
            self.quiz_data['quiz_name'],
            self.quiz_data['lessons'][self.selected_lesson]['lesson_name'],
            time_spent, self.score, completed=True
        )

        final_label = QLabel(f"Your final score is: {self.score} out of {self.total_questions}")
        final_label.setFont(QFont("Poppins", 18))
        final_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(final_label)

        pct = (self.score / self.total_questions) * 100
        pct_label = QLabel(f"Correct Answers: {pct:.2f}%")
        pct_label.setFont(QFont("Poppins", 16))
        pct_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(pct_label)

        close_btn = QPushButton("Close")
        close_btn.setFont(QFont("Poppins", 14))
        close_btn.setStyleSheet("QPushButton{background-color:#FF6347;color:white;padding:10px;border-radius:10px;}")
        close_btn.clicked.connect(self.close)
        self.main_layout.addWidget(close_btn, alignment=Qt.AlignCenter)

        if self.incorrect_answers:
            retry_btn = QPushButton("Retry Incorrect Answers")
            retry_btn.setFont(QFont("Poppins", 14))
            retry_btn.setStyleSheet(
                "QPushButton{background-color:#FFA500;color:white;padding:10px;border-radius:10px;}"
                "QPushButton:hover{background-color:#ff9900;}"
            )
            retry_btn.clicked.connect(self.retry_incorrect_answers)
            self.main_layout.addWidget(retry_btn, alignment=Qt.AlignCenter)

    def retry_incorrect_answers(self):
        if not self.incorrect_answers:
            return
        self.quiz_data['lessons'][self.selected_lesson]['questions'] = self.incorrect_answers
        self.total_questions = len(self.incorrect_answers)
        self.current_question_index = 0
        self.score = 0
        self.incorrect_answers = []
        self.clear_layout()
        self.load_question()


# ─────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────
if __name__ == '__main__':
    app = QApplication(sys.argv)
    main_win = MainWindow()
    main_win.show()
    sys.exit(app.exec_())
