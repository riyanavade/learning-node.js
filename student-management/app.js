import {student} from "./student.js"
import fs from "node:fs"

console.log("student details");
console.log("Name:",student.name);
console.log("Course:",student.course);
console.log("semester:",student.semester);

const details=`
Name:${student.name}
Course:${student.course}
Semester:${student.semester}`;

fs.writeFileSync("student.txt",details);
console.log("student details saved successfully");

