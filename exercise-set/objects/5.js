// School

// FINISH!!!!

class Student {
  constructor(name, year) {
    this.name = name;
    this.year = year;
    this.courses = [];
  }

  info() {console.log(`${this.name} is a ${this.year} year student`)}
  listCourses() {console.log(this.courses)}
  addCourse(course) {this.courses.push(course)}

  addNote(code, note) {
    this.courses.forEach(course => {
      if (course.code === code) course.note = note;
    });
  }

  viewNotes() {
    this.courses.forEach(course => {
      if (course.note) console.log(`${course.name}: ${course.note}`);
    });
  }

  updateNote(code, note) {this.addNote(code, note)}
}

class School {
  static VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];

  constructor() {
    this.students = [];
  }

  addStudent(name, year) {
    if (!School.VALID_YEARS.includes(year)) {
      console.log('Invalid year');
      return undefined;
    } else {
      let student = new Student(name, year);
      this.students.push(student);
      return student;
    }
  }

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  }

  addGrade(student, code, grade) {
    let course = student.courses.find(course => course.code === code);
    course.grade = grade;
  }

  getReportCard(student) {
    student.courses.forEach(course => {
      let grade = course.grade ? course.grade : 'In progress';
      console.log(`${course.name}: ${grade}`);
    });
  }

  courseReport(courseName) {
    console.log('');
    console.log(`=${courseName} Grades=`);
    this.students.forEach(student => {
      student.courses.forEach(course => {
        if (course.name === courseName && course.grade) {
          console.log(`${student.name}: ${course.grade}`);
        }
      });
    });
    console.log('---');
  }
}

let school = new School();
let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, 'Math', 101);
school.enrollStudent(paul, 'Advanced Math', 102);
school.enrollStudent(paul, 'Physics', 202);
school.addGrade(paul, 101, 95);
school.addGrade(paul, 102, 90);

console.log(paul);
school.getReportCard(paul);

let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, 'Math', 101);
school.addGrade(mary, 101, 91);
console.log(mary);
school.getReportCard(mary);

let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, 'Math', 101);
school.enrollStudent(kim, 'Advanced Math', 102);
school.addGrade(kim, 101, 93);
school.addGrade(kim, 102, 90);
console.log(kim);
school.getReportCard(kim);

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');