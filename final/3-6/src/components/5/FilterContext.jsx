import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    priorityFilter: "all",
  });
  const setSearch = (q) =>
    setFilters(p => ({ ...p, searchQuery: q }));
  const setPriority = (p) =>
    setFilters(prev => ({ ...prev, priorityFilter: p }));

  return (
    <FilterContext.Provider
      value={{ ...filters, setSearch, setPriority }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext трябва да е в FilterProvider");
  return ctx;
}

export { FilterProvider, useFilterContext };
