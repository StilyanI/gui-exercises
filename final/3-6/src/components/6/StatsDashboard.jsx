import { createStudentAverage, useClassroom } from "./ClassroomContext.jsx";

function getAverageForClass(students, className) {
  const classStudents = students.filter(student => student.class === className);
  if (classStudents.length === 0) return 0;

  return classStudents
    .map(createStudentAverage)
    .reduce((sum, average) => sum + average, 0) / classStudents.length;
}

function StatsDashboard() {
  const { students, classFilter, searchQuery } = useClassroom();
  const filtered = students
    .filter(s => classFilter === "all" || s.class === classFilter)
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const withAverages = filtered.map(student => ({
    ...student,
    average: createStudentAverage(student),
  }));

  const classAvg = withAverages.length > 0
    ? withAverages.reduce((sum, student) => sum + student.average, 0) / withAverages.length
    : 0;

  const best = [...withAverages].sort((a, b) => b.average - a.average)[0];
  const honors = withAverages.filter(student => student.average >= 5.5).length;
  const avg11A = getAverageForClass(students, "11А");
  const avg11B = getAverageForClass(students, "11Б");

  return (
    <section className="stats-grid classroom-stats">
      <article className="panel">
        <span className="classroom-stat-label">Общ среден успех</span>
        <strong className="classroom-stat-value">{classAvg.toFixed(2)}</strong>
      </article>
      <article className="panel">
        <span className="classroom-stat-label">Най-добър ученик</span>
        <strong className="classroom-stat-value classroom-stat-value--small">
          {best ? `${best.name} (${best.average.toFixed(2)})` : "Няма данни"}
        </strong>
      </article>
      <article className="panel">
        <span className="classroom-stat-label">11А vs 11Б</span>
        <strong className="classroom-stat-value classroom-stat-value--small">
          11А: {avg11A.toFixed(2)} | 11Б: {avg11B.toFixed(2)}
        </strong>
      </article>
      <article className="panel">
        <span className="classroom-stat-label">Отличници</span>
        <strong className="classroom-stat-value">{honors}</strong>
      </article>
    </section>
  );
}

export default StatsDashboard;
