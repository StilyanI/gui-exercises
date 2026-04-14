import { useEffect, useState } from "react";
import { useClassroom } from "./ClassroomContext.jsx";

const subjects = ["Математика", "Информатика", "Физика", "Химия", "Биология", "История", "Литература", "Английски"];

function GradeForm() {
  const { students, dispatch } = useClassroom();
  const firstStudentId = students[0]?.id ?? "";
  const [studentId, setStudentId] = useState(firstStudentId);
  const [subject, setSubject] = useState("Математика");
  const [grade, setGrade] = useState(6);

  useEffect(() => {
    if (!students.some(student => student.id === studentId) && students[0]) {
      setStudentId(students[0].id);
    }
  }, [studentId, students]);

  function handleSubmit(e) {
    e.preventDefault();
    const numericGrade = Number(grade);
    if (!studentId || numericGrade < 2 || numericGrade > 6) return;

    dispatch({
      type: "ADD_GRADE",
      studentId: Number(studentId),
      subject,
      grade: numericGrade,
    });
    setGrade(6);
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit}>
      <select value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        {subjects.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <input
        type="number"
        min="2"
        max="6"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <button type="submit">Добави оценка</button>
    </form>
  );
}

export default GradeForm;
