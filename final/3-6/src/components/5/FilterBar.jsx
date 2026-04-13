import { useFilterContext } from "./FilterContext.jsx";

function FilterBar() {
  const { searchQuery, priorityFilter, setSearch, setPriority } = useFilterContext();

  return (
    <div className="filter-panel panel">
      <input
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Търси задача"
      />
      <select value={priorityFilter} onChange={(e) => setPriority(e.target.value)}>
        <option value="all">Всички приоритети</option>
        <option value="low">Нисък</option>
        <option value="medium">Среден</option>
        <option value="high">Висок</option>
      </select>
    </div>
  );
}

export default FilterBar;
