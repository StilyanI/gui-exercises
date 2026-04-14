import { useEffect, useState } from "react";
import { ClassroomProvider } from "./ClassroomContext.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";
import GradeForm from "./GradeForm.jsx";
import SearchBar from "./SearchBar.jsx";
import StatsDashboard from "./StatsDashboard.jsx";
import StudentForm from "./StudentForm.jsx";
import StudentTable from "./StudentTable.jsx";

function ClassroomApp({ dark, onToggle }) {
  return (
    <div className={dark ? "task-page classroom-page classroom-page--dark" : "task-page classroom-page"}>
      <div className="panel classroom-actions">
        <DarkModeToggle dark={dark} onToggle={onToggle} />
        <SearchBar />
      </div>
      <StatsDashboard />
      <div className="classroom-grid">
        <StudentForm />
        <GradeForm />
        <div className="classroom-table-wrap">
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

function Classroom() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => localStorage.getItem("classroom-dark") === "true");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("classroom-dark", String(dark));
  }, [dark]);

  if (loading) {
    return <p className="panel">Зарежда се...</p>;
  }

  return (
    <ClassroomProvider>
      <ClassroomApp dark={dark} onToggle={() => setDark((value) => !value)} />
    </ClassroomProvider>
  );
}

export default Classroom;
