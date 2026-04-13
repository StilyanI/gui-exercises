function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Търси курс..."
      className="catalog-search"
    />
  );
}

export default SearchBar;
