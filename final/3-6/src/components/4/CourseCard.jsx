function CourseCard({ course }) {
  const levelColors = {
    "Начинаещ": "level-badge level-badge--beginner",
    "Среден": "level-badge level-badge--middle",
    "Напреднал": "level-badge level-badge--advanced",
  };

  return (
    <div className="course-card panel">
      <div className="course-card__top">
        <h3>{course.title}</h3>
        <span className={levelColors[course.level]}>
          {course.level}
        </span>
      </div>
      <p>{course.category}</p>
      {course.rating >= 4.5 && <span className="top-rated">Top Rated</span>}
      <p>{course.students} студенти</p>
    </div>
  );
}

export default CourseCard;
