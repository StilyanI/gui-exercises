import { useEffect, useState } from "react";

const API_BASE = "https://jsonplaceholder.typicode.com";

async function fetchData(endpoint) {
  const response = await fetch(API_BASE + endpoint);
  if (!response.ok) {
    throw new Error("HTTP " + response.status + ": " + response.statusText);
  }
  return response.json();
}

const initialStatuses = {
  users: "Зарежда се...",
  posts: "Зарежда се...",
  comments: "Зарежда се...",
};

function StatusCard({ title, status, count, error }) {
  const statusClass =
    status === "Заредено"
      ? "status-card status-card--loaded"
      : status === "Грешка"
        ? "status-card status-card--error"
        : "status-card";

  return (
    <article className={statusClass}>
      <h3>{title}</h3>
      <p className="status-card__label">Статус: {status}</p>
      {typeof count === "number" && <p>Елементи: {count}</p>}
      {error && <p className="status-card__error">Грешка: {error}</p>}
    </article>
  );
}

function AsyncDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  async function loadDashboard() {
    const startTime = Date.now();
    setLoading(true);
    setMessage("");
    setUsers([]);
    setPosts([]);
    setComments([]);
    setStatuses({
      users: "Зарежда се...",
      posts: "Зарежда се...",
      comments: "Зарежда се...",
    });

    try {
      const [usersData, postsData, commentsData] = await Promise.all([
        fetchData("/users"),
        fetchData("/posts?_limit=10"),
        fetchData("/comments?_limit=20"),
      ]);

      const elapsed = Date.now() - startTime;

      setUsers(usersData);
      setPosts(postsData);
      setComments(commentsData);
      setElapsedTime(elapsed);
      setStatuses({
        users: "Заредено",
        posts: "Заредено",
        comments: "Заредено",
      });
    } catch (error) {
      console.error("Promise.all failed:", error.message);

      try {
        const results = await Promise.allSettled([
          fetchData("/users"),
          fetchData("/posts?_limit=10"),
          fetchData("/comments?_limit=20"),
        ]);

        const elapsed = Date.now() - startTime;
        const names = ["Потребители", "Постове", "Коментари"];
        const nextStatuses = { users: "Грешка", posts: "Грешка", comments: "Грешка" };

        results.forEach((result, index) => {
          const key = index === 0 ? "users" : index === 1 ? "posts" : "comments";
          if (result.status === "fulfilled") {
            if (key === "users") setUsers(result.value);
            if (key === "posts") setPosts(result.value);
            if (key === "comments") setComments(result.value);
            nextStatuses[key] = "Заредено";
          } else {
            nextStatuses[key] = "Грешка";
            console.error(names[index] + ":", result.reason.message);
          }
        });

        setStatuses(nextStatuses);
        setElapsedTime(elapsed);
        setMessage("Част от заявките се провалиха, но наличните данни бяха заредени.");
      } catch (fallbackError) {
        setMessage("Неуспешно зареждане: " + fallbackError.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const avgComments = posts.length > 0
    ? comments.reduce((sum) => sum + 1, 0) / posts.length
    : 0;

  return (
    <section className="task-page">
      <div className="panel actions-row">
        <p className="toolbar-text">Време за зареждане: {elapsedTime} ms</p>
        <button type="button" onClick={loadDashboard}>Презареди</button>
      </div>

      {loading && <p className="panel">Зарежда се...</p>}
      {message && <p className="panel info-message">{message}</p>}

      <section className="status-grid">
        <StatusCard
          title="Потребители"
          status={statuses.users}
          count={users.length}
          error={statuses.users === "Грешка" ? "Данните не са налични." : ""}
        />
        <StatusCard
          title="Постове"
          status={statuses.posts}
          count={posts.length}
          error={statuses.posts === "Грешка" ? "Данните не са налични." : ""}
        />
        <StatusCard
          title="Коментари"
          status={statuses.comments}
          count={comments.length}
          error={statuses.comments === "Грешка" ? "Данните не са налични." : ""}
        />
      </section>

      <section className="stats-grid stats-grid--dashboard">
        <article className="panel">
          <h3>Статистика</h3>
          <p>Брой потребители: {users.length}</p>
          <p>Постове: {posts.length}</p>
          <p>Среден брой коментари на пост: {avgComments.toFixed(2)}</p>
        </article>
        <article className="panel">
          <h3>Примерни потребители</h3>
          <ul className="simple-list">
            {users.slice(0, 5).map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h3>Примерни постове</h3>
          <ul className="simple-list">
            {posts.slice(0, 4).map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}

export default AsyncDashboard;
