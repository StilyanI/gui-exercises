import { createStudentAverage, useClassroom } from "./ClassroomContext.jsx";

function StudentTable() {
  const { students, classFilter, searchQuery, dispatch } = useClassroom();

  const filteredStudents = students
    .filter(student => classFilter === "all" || student.class === classFilter)
    .filter(student => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(student => ({
      ...student,
      average: createStudentAverage(student),
    }))
    .sort((a, b) => b.average - a.average);

  return (
    <section className="panel">
      <div className="classroom-toolbar">
        <select
          value={classFilter}
          onChange={(e) => dispatch({ type: "SET_FILTER", classFilter: e.target.value })}
        >
          <option value="all">Всички класове</option>
          <option value="11А">11А</option>
          <option value="11Б">11Б</option>
        </select>
      </div>

      <div className="classroom-table">
        {filteredStudents.map((student) => (
          <div className="classroom-row" key={student.id}>
            <span className="classroom-row__name">{student.name}</span>
            <span className="classroom-row__class">{student.class}</span>
            <div className="classroom-grades classroom-row__grades">
              {Object.entries(student.grades).map(([subject, grades]) => (
                <div key={subject} className="classroom-grade-group">
                  <strong>{subject}</strong>
                  <span>{grades.join(", ")}</span>
                </div>
              ))}
            </div>
            <span
              className={
                student.average >= 5.5
                  ? "grade-badge grade-badge--high classroom-row__average"
                  : student.average <= 3
                    ? "grade-badge grade-badge--low classroom-row__average"
                    : "grade-badge classroom-row__average"
              }
            >
              {student.average.toFixed(2)}
            </span>
            <div className="classroom-row__actions">
              <button
                type="button"
                onClick={() => dispatch({ type: "REMOVE_STUDENT", id: student.id })}
              >
                Премахни
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudentTable;
