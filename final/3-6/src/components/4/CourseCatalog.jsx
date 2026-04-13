import { useState } from "react";
import { courses } from "./courses.js";
import SearchBar from "./SearchBar.jsx";
import FilterPanel from "./FilterPanel.jsx";
import SortControls from "./SortControls.jsx";
import CourseList from "./CourseList.jsx";
import StatsBar from "./StatsBar.jsx";

function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = courses
    .filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()))
    .filter(c => category === "all" || c.category === category)
    .filter(c => level === "all" || c.level === level)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const avgRating = filtered.length > 0
    ? filtered.reduce((sum, c) => sum + c.rating, 0)
      / filtered.length
    : 0;

  return (
    <section className="task-page">
      <SearchBar value={search} onChange={setSearch} />
      <FilterPanel
        category={category}
        level={level}
        onCategoryChange={setCategory}
        onLevelChange={setLevel}
        onClear={() => {
          setSearch("");
          setCategory("all");
          setLevel("all");
          setSortBy("rating");
        }}
      />
      <SortControls sortBy={sortBy} onSortChange={setSortBy} />

      <StatsBar>
        <span>Курсове: {filtered.length}</span>
        <span>Среден рейтинг: {avgRating.toFixed(1)}</span>
        <span>Общо студенти: {filtered.reduce((s, c) => s + c.students, 0)}</span>
      </StatsBar>

      <CourseList courses={filtered} />
    </section>
  );
}

export default CourseCatalog;
