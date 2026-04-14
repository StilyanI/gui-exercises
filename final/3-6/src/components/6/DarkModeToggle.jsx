function DarkModeToggle({ dark, onToggle }) {
  return (
    <button type="button" onClick={onToggle}>
      {dark ? "Светъл режим" : "Тъмен режим"}
    </button>
  );
}

export default DarkModeToggle;
