import { useState } from "react";
import { useTaskContext } from "./TaskContext.jsx";

function TaskForm() {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      title: title.trim(),
      priority,
    });

    setTitle("");
    setPriority("medium");
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Нова задача"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Нисък</option>
        <option value="medium">Среден</option>
        <option value="high">Висок</option>
      </select>
      <button type="submit">Добави</button>
    </form>
  );
}

export default TaskForm;
