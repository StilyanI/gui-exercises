import { useClassroom } from "./ClassroomContext.jsx";

function SearchBar() {
  const { searchQuery, dispatch } = useClassroom();

  return (
    <input
      value={searchQuery}
      onChange={(e) =>
        dispatch({ type: "SET_SEARCH", searchQuery: e.target.value })
      }
      placeholder="Търсене по име"
    />
  );
}

export default SearchBar;
