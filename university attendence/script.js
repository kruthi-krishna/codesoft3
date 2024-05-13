// DOM elements
const authContainer = document.getElementById('authContainer');
const studentContainer = document.getElementById('studentContainer');
const instructorContainer = document.getElementById('instructorContainer');
const modal = document.getElementById('modal');
const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');
const studentNameDisplay = document.getElementById('studentNameDisplay');
const calendar = document.getElementById('calendar');
const attendanceSummary = document.getElementById('attendanceSummary');
const daysPresentDisplay = document.getElementById('daysPresent');
const daysAbsentDisplay = document.getElementById('daysAbsent');
const coursesList = document.getElementById('coursesList');
const courseManagement = document.getElementById('courseManagement');
const createCourseBtn = document.getElementById('createCourseBtn');

// Event listeners
loginForm.addEventListener('submit', loginUser);
registerBtn.addEventListener('click', showRegisterModal);
createCourseBtn.addEventListener('click', showCreateCourseModal);

// Function to validate password
function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{7,}$/;
  return regex.test(password);
}

// Function to login user
function loginUser(event) {
  event.preventDefault();
  const studentName = document.getElementById('studentName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (password.length < 7 || !validatePassword(password)) {
    alert("Password must be at least 7 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    return;
  }

  // Proceed with form submission or authentication
  // For demo purposes, let's just display the student name and switch to student interface
  studentNameDisplay.textContent = studentName;
  updateAttendanceSummary(); // Update attendance summary dynamically
  showStudentInterface();
}

function showRegisterModal() {
  // Display registration form in a modal
}

function showCreateCourseModal() {
  // Display form to create a new course in a modal
}

function showStudentInterface() {
  authContainer.classList.add('hidden');
  studentContainer.classList.remove('hidden');
  displayCalendar();
}

function showInstructorInterface() {
  authContainer.classList.add('hidden');
  instructorContainer.classList.remove('hidden');
}

// Dummy data for demonstration purposes
let daysPresent = 0;
let daysAbsent = 0;
const totalDays = 5; // Total days in a week (Monday to Friday)
const subjects = ['English Literature', 'Mathematics', 'Science', 'Social Studies'];

// Function to update attendance summary
function updateAttendanceSummary() {
  // Count the total number of days present and absent
  daysPresent = 0;
  daysAbsent = 0;
  const cells = document.querySelectorAll('.calendarTable input[type="checkbox"]');
  cells.forEach(cell => {
    if (cell.checked) {
      daysPresent++;
    } else {
      daysAbsent++;
    }
  });
  daysPresentDisplay.textContent = daysPresent;
  daysAbsentDisplay.textContent = daysAbsent;
}

// Populate student's course list
subjects.forEach(subject => {
  const subjectItem = document.createElement('div');
  subjectItem.classList.add('subjectItem');
  subjectItem.textContent = subject;
  coursesList.appendChild(subjectItem);
});

// Function to display calendar and attendance summary
function displayCalendar() {
  // Clear existing calendar content
  calendar.innerHTML = '';

  // Create table for calendar
  const table = document.createElement('table');
  table.classList.add('calendarTable');

  // Create table body
  const tbody = document.createElement('tbody');

  // Row for subject names
  const subjectRow = document.createElement('tr');
  const emptyCell = document.createElement('td'); // Empty cell for day names column
  subjectRow.appendChild(emptyCell); // Append empty cell
  subjects.forEach(subject => {
    const subjectCell = document.createElement('td');
    subjectCell.textContent = subject;
    subjectRow.appendChild(subjectCell);
  });
  tbody.appendChild(subjectRow);

  // Rows for days of the week
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    // Day name cell
    const dayCell = document.createElement('td');
    dayCell.textContent = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i];
    row.appendChild(dayCell);
    // Boxes for each subject
    subjects.forEach(() => {
      const boxCell = document.createElement('td');
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.addEventListener('click', toggleAttendance);
      boxCell.appendChild(checkBox);
      row.appendChild(boxCell);
    });
    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append table to calendar container
  calendar.appendChild(table);
}

// Function to toggle attendance for a day
function toggleAttendance(event) {
  const checkBox = event.target;
  const cell = checkBox.parentElement;

  // Prompt user to select P for Present or A for Absent
  const selection = prompt("Select P for Present or A for Absent").toUpperCase();

  if (selection === 'P') {
    checkBox.checked = true;
    cell.classList.remove('absent');
    cell.classList.add('present');
  } else if (selection === 'A') {
    checkBox.checked = false;
    cell.classList.remove('present');
    cell.classList.add('absent');
  } else {
    alert('Invalid option selected. Please choose P for Present or A for Absent.');
    return;
  }

  updateAttendanceSummary();
}
