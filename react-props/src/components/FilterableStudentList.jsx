import { useState } from 'react';
import './FilterableStudentList.css';

function SearchInput({ value, onChange }) {
    return (
        <div className="search-wrapper">
            <input
                className="search-input"
                type="text"
                placeholder="Търси ученик..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            {value && (
                <button className="search-clear" onClick={() => onChange('')}>✕</button>
            )}
        </div>
    );
}

function StudentItem({ student }) {
    const initials = student.name.split(" ").map(n => n[0]).join("");
    return (
        <div className="fsl-student-item">
            <div className="fsl-avatar">{initials}</div>
            <div>
                <div className="fsl-name">{student.name}</div>
                <div className="fsl-grade">Клас {student.grade}</div>
            </div>
        </div>
    );
}

const students = [
    { id: 1, name: "Иван Петров", grade: "11А" },
    { id: 2, name: "Мария Иванова", grade: "11Б" }
];

export default function FilterableStudentList() {
    const [query, setQuery] = useState('');

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fsl-container">
            <SearchInput value={query} onChange={setQuery} />
            <div className="fsl-count">{filtered.length} ученик(а)</div>
            <div className="fsl-list">
                {filtered.length === 0
                    ? <p className="fsl-empty">Няма намерени ученици</p>
                    : filtered.map(s => <StudentItem key={s.id} student={s} />)
                }
            </div>
        </div>
    );
}