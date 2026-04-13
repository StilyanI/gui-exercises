import { useTaskContext } from "./TaskContext.jsx";

const priorityLabels = {
  low: "priority-badge priority-badge--low",
  medium: "priority-badge priority-badge--medium",
  high: "priority-badge priority-badge--high",
};

const priorityMap = {
    low: "Нисък",
    medium: "Среден",
    high: "Висок"
};

function TaskCard({ task }) {
  const { dispatch } = useTaskContext();
  const canMove = task.status !== "done";

  return (
    <article className="task-card">
      <div className="task-card__top">
        <h4>{task.title}</h4>
        <span className={priorityLabels[task.priority]}>
          {priorityMap[task.priority]}
        </span>
      </div>
      <p>Създадена: {task.createdAt}</p>
      <div className="task-card__actions">
        {canMove && (
          <button type="button" onClick={() => dispatch({ type: "MOVE_TASK", id: task.id })}>
            Напред
          </button>
        )}
        <button type="button" onClick={() => dispatch({ type: "DELETE_TASK", id: task.id })}>
          Изтрий
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
