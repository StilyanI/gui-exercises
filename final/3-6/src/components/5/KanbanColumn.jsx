import { useTaskContext } from "./TaskContext.jsx";
import { useFilterContext } from "./FilterContext.jsx";
import TaskCard from "./TaskCard.jsx";

function KanbanColumn({ status, label }) {
  const { tasks } = useTaskContext();
  const { searchQuery, priorityFilter } = useFilterContext();

  const filtered = tasks
    .filter(t => t.status === status)
    .filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(t =>
      priorityFilter === "all" || t.priority === priorityFilter);

  return (
    <div className="kanban-column panel">
      <h3>{label} ({filtered.length})</h3>
      <div className="kanban-column__list">
        {filtered.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filtered.length === 0 && <p className="empty-text">Няма задачи</p>}
      </div>
    </div>
  );
}

export default KanbanColumn;
