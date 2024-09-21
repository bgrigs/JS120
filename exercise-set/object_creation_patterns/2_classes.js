// Use classes this time

class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName = function() {
    return this.firstName + ' ' + this.lastName;
  }

  communicate = function() {
    console.log('talking');
  };

  eat = function() {
    console.log('eating');
  };

  sleep = function() {
    console.log('zzzzz');
  };
}

const person = new Person('Foo', 'Bar', 21, 'male');
console.log(person instanceof Person);       // logs true
person.eat();                                // logs 'Eating'
person.communicate();                        // logs 'Communicating'
person.sleep();                              // logs 'Sleeping'
console.log(person.fullName());              // logs 'Foo Bar'

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialty) {
    super(firstName, lastName, age, gender);
    this.specialty = specialty;
  }

  diagnose = function() {
    console.log('diagnosing');
  };
}

const doctor = new Doctor('Bar', 'Qux', 21, 'female', 'Pediatrics');
console.log(doctor instanceof Person);       // logs true
console.log(doctor instanceof Doctor);       // logs true
doctor.eat();                                // logs 'Eating'
doctor.communicate();                        // logs 'Communicating'
doctor.sleep();                              // logs 'Sleeping'
console.log(doctor.fullName());              // logs 'Bar Qux'
doctor.diagnose();                           // logs 'Diagnosing'

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);
    this.subject = subject;
  }

  teach = function() {
    console.log(`teaching`);
  }
}

const professor = new Professor('Bar', 'Foo', 48, 'female', 'Law');
console.log(professor instanceof Person);    // logs true
console.log(professor instanceof Professor); // logs true
console.log(professor instanceof Doctor);    // logs false
professor.eat();                             // logs 'Eating'
professor.communicate();                     // logs 'Communicating'
professor.sleep();                           // logs 'Sleeping'
console.log(professor.fullName());           // logs 'Bar Foo'
professor.teach();                           // logs 'Teaching'

class Student extends Person {
  constructor(firstName, lastName, age, gender, degree) {
    super(firstName, lastName, age, gender);
    this.degree = degree;
  }

  study = function() {
    console.log(`study`);
  }
}

class GraduateStudent extends Student {
  constructor(firstName, lastName, age, gender, degree, gradDegree) {
    super(firstName, lastName, age, gender, degree);
    this.graduateDegree = gradDegree;
  }

  research = function() {
    console.log('researching');
  }
}

const graduateStudent = new GraduateStudent('Qux', 'Bar', 21, 'non-binary', 'BS Industrial Engineering', 'MS Industrial Engineering');
console.log(graduateStudent instanceof Person);          // logs true
console.log(graduateStudent instanceof Student);         // logs true
console.log(graduateStudent instanceof GraduateStudent); // logs true
console.log(graduateStudent instanceof Professor);       // logs false
console.log(graduateStudent instanceof Doctor);          // logs false
graduateStudent.eat();                       // logs 'Eating'
graduateStudent.communicate();               // logs 'Communicating'
graduateStudent.sleep();                     // logs 'Sleeping'
console.log(graduateStudent.fullName());     // logs 'Qux Bar'
graduateStudent.study();                     // logs 'Studying'
graduateStudent.research();                  // logs 'Researching'

console.log(person instanceof Doctor);       // logs false
console.log(person instanceof Professor);    // logs false
console.log(person instanceof Student);      // logs false
console.log(doctor instanceof Professor);    // logs false
console.log(doctor instanceof Student);      // logs false
console.log(professor instanceof Student);   // logs false
