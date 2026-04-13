function SortControls({ sortBy, onSortChange }) {
  return (
    <div className="sort-controls panel">
      <button
        type="button"
        className={sortBy === "rating" ? "is-active" : ""}
        onClick={() => onSortChange("rating")}
      >
        Сортиране по рейтинг
      </button>
      <button
        type="button"
        className={sortBy === "students" ? "is-active" : ""}
        onClick={() => onSortChange("students")}
      >
        Сортиране по брой студенти
      </button>
    </div>
  );
}

export default SortControls;
