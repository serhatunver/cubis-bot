import Student from '../models/Student.js';

const CreateStudent = async (student) => {
  try {
    const newStudent = await Student.create(student);
    return newStudent;
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetStudent = async (studentId) => {
  try {
    const student = await Student.findOne({ studentId });
    return student;
  } catch (err) {
    throw new Error(err.message);
  }
};

const UpdateStudent = async (studentId, student) => {
  try {
    await Student.findOneAndUpdate({ studentId }, student).exec();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const DeleteStudent = async (studentId) => {
  try {
    await Student.findOneAndDelete({ studentId });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetCookies = async (studentId) => {
  try {
    const student = await Student.findOne({ studentId })
      .select('cookies')
      .exec();
    return student.cookies;
  } catch (err) {
    throw new Error(err.message);
  }
};

const SaveCookies = async (studentId, cookies) => {
  try {
    await Student.findOneAndUpdate({ studentId }, { cookies }).exec();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetCourses = async (studentId) => {
  try {
    const student = await Student.findOne({ studentId })
      .select('courses')
      .exec();
    return student.courses;
  } catch (err) {
    throw new Error(err.message);
  }
};

const SaveCourses = async (studentId, courses) => {
  try {
    await Student.findOneAndUpdate({ studentId }, { courses }).exec();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const SaveExams = async (studentId, courseCode, exams) => {
  try {
    await Student.findOneAndUpdate(
      { studentId, 'courses.code': courseCode },
      { $push: { 'courses.$.exams': { $each: exams } } }
    ).exec();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetExams = async (studentId, courseCode) => {
  try {
    const student = await Student.findOne({
      studentId,
      'courses.code': courseCode,
    }).exec();
    const course = student.courses.find((course) => course.code === courseCode);
    return course.exams;
  } catch (err) {
    throw new Error(err.message);
  }
};

const SaveExam = async (studentId, courseCode, exam) => {
  try {
    await Student.findOneAndUpdate(
      { studentId, 'courses.code': courseCode },
      { $push: { 'courses.$.exams': exam } }
    ).exec();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  CreateStudent,
  GetStudent,
  UpdateStudent,
  DeleteStudent,
  SaveCookies,
  GetCourses,
  SaveCourses,
  SaveExams,
  GetCookies,
  GetExams,
  SaveExam,
};
