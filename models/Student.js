import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  cookies: [],
  courses: [
    {
      code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      exams: [
        {
          name: {
            type: String,
          },
          score: {
            type: String,
          },
        },
      ],
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
