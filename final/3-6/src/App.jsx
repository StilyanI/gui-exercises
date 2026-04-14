import { useEffect, useMemo, useState } from "react";
import AsyncDashboard from "./components/3/AsyncDashboard.jsx";
import CourseCatalog from "./components/4/CourseCatalog.jsx";
import KanbanBoard from "./components/5/KanbanBoard.jsx";
import Classroom from "./components/6/Classroom.jsx";

function getRouteFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "3" || hash === "4" || hash === "5" || hash === "6") {
    return hash;
  }
  return "home";
}

function HomeCard({ id }) {
  return (
    <a className="home-link" href={`#${id}`}>
      Задача {id}
    </a>
  );
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = useMemo(() => {
    if (route === "3") return <AsyncDashboard />;
    if (route === "4") return <CourseCatalog />;
    if (route === "5") return <KanbanBoard />;
    if (route === "6") return <Classroom />;
    return (
      <section className="home-grid">
        <HomeCard id="3" />
        <HomeCard id="4" />
        <HomeCard id="5" />
        <HomeCard id="6" />
      </section>
    );
  }, [route]);

  return (
    <div className="shell">
      <header className="shell__header">
        <nav className="shell__nav" aria-label="Навигация към задачите">
          <a href="#home">Начало</a>
          <a href="#3">Задача 3</a>
          <a href="#4">Задача 4</a>
          <a href="#5">Задача 5</a>
          <a href="#6">Задача 6</a>
        </nav>
      </header>

      <main className="shell__content">{page}</main>
    </div>
  );
}

export default App;
