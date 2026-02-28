import {useState} from "react";
import './Classroom.css';
import GradeModal from "./GradeModal.jsx";

export default function StudentRow({ student, onGrade, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const avg = student.scores.length
        ? (student.scores.reduce((a, b) => a + b, 0) / student.scores.length).toFixed(2)
        : '-';
    const initials = student.name.split(' ').map(n => n[0]).join('');

    return (
        <>
            <div className="student-row">
                <div className="sr-avatar">{initials}</div>
                <div className="sr-info">
                    <span className="sr-name">{student.name}</span>
                    <span className="sr-grade">Клас {student.grade}</span>
                </div>
                <div className="sr-scores">
                    {student.scores.map((s, i) => (
                        <span key={i} className={`score-chip score-${s}`}>{s}</span>
                    ))}
                </div>
                <div className="sr-avg">Ср: <strong>{avg}</strong></div>
                <div className="sr-actions">
                    <button className="btn-grade" onClick={() => setShowModal(true)}>+ Оценка</button>
                    <button className="btn-delete" onClick={() => onDelete(student.id)}>✕</button>
                </div>
            </div>
            {showModal && (
                <GradeModal
                    studentName={student.name}
                    onConfirm={(g) => onGrade(student.id, g)}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}