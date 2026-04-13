import Dashboard from "./Dashboard.jsx";
import FilterBar from "./FilterBar.jsx";
import KanbanColumn from "./KanbanColumn.jsx";
import TaskForm from "./TaskForm.jsx";
import { FilterProvider } from "./FilterContext.jsx";
import { TaskProvider } from "./TaskContext.jsx";

function BoardApp() {
  return (
    <>
      <Dashboard />
      <TaskForm />
      <FilterBar />
      <div className="kanban-grid">
        <KanbanColumn status="todo" label="За правене" />
        <KanbanColumn status="in-progress" label="В прогрес" />
        <KanbanColumn status="done" label="Готово" />
      </div>
    </>
  );
}

function KanbanBoard() {
  return (
    <section className="task-page">
      <TaskProvider>
        <FilterProvider>
          <BoardApp />
        </FilterProvider>
      </TaskProvider>
    </section>
  );
}

export default KanbanBoard;
