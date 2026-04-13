import CourseCard from "./CourseCard.jsx";

function CourseList({ courses }) {
  if (courses.length === 0) {
    return <p className="panel">Няма намерени курсове</p>;
  }

  return (
    <div className="course-list">
      {courses.map(c => <CourseCard key={c.id} course={c} />)}
    </div>
  );
}

export default CourseList;
