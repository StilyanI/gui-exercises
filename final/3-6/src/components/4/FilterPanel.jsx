function FilterPanel({ category, level, onCategoryChange, onLevelChange, onClear }) {
  return (
    <div className="filter-panel panel">
      <select value={category} onChange={e => onCategoryChange(e.target.value)}>
        <option value="all">Всички категории</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DevOps">DevOps</option>
      </select>
      <select value={level} onChange={e => onLevelChange(e.target.value)}>
        <option value="all">Всички нива</option>
        <option value="Начинаещ">Начинаещ</option>
        <option value="Среден">Среден</option>
        <option value="Напреднал">Напреднал</option>
      </select>
      <button type="button" onClick={onClear}>Изчисти филтрите</button>
    </div>
  );
}

export default FilterPanel;
