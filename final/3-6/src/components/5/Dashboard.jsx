import { useTaskContext } from "./TaskContext.jsx";

function Dashboard() {
  const { tasks } = useTaskContext();
  const todo = tasks.filter(t => t.status === "todo").length;
  const inProg = tasks.filter(t => t.status === "in-progress").length;
  const done = tasks.filter(t => t.status === "done").length;
  const highPriority = tasks.filter(t => t.priority === "high").length;
  const pct = tasks.length > 0
    ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <section className="stats-grid">
      <article className="panel">
        <h3>За правене</h3>
        <p>{todo}</p>
      </article>
      <article className="panel">
        <h3>В прогрес</h3>
        <p>{inProg}</p>
      </article>
      <article className="panel">
        <h3>Готово</h3>
        <p>{done}</p>
      </article>
      <article className="panel">
        <h3>Високо приоритетни</h3>
        <p>{highPriority}</p>
      </article>
      <article className="panel">
        <h3>Завършени</h3>
        <p>{pct}%</p>
      </article>
    </section>
  );
}

export default Dashboard;
