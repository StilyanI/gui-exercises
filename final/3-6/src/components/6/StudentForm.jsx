import { useState } from "react";
import { useClassroom } from "./ClassroomContext.jsx";

function StudentForm() {
  const { dispatch } = useClassroom();
  const [name, setName] = useState("");
  const [className, setClassName] = useState("11А");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Името е задължително.");
      return;
    }

    setError("");
    dispatch({ type: "ADD_STUDENT", name: trimmed, className });
    setName("");
    setClassName("11А");
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Име на ученик"
      />
      <select value={className} onChange={(e) => setClassName(e.target.value)}>
        <option value="11А">11А</option>
        <option value="11Б">11Б</option>
      </select>
      <button type="submit">Добави ученик</button>
      {error && <p className="classroom-error">{error}</p>}
    </form>
  );
}

export default StudentForm;
