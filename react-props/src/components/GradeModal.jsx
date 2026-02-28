import {useState} from "react";
import './Classroom.css';

export default function GradeModal({ studentName, onConfirm, onClose }) {
    const [value, setValue] = useState('');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>Постави оценка</h3>
                <p className="modal-subtitle">Ученик: <strong>{studentName}</strong></p>
                <div className="grade-buttons">
                    {[2, 3, 4, 5, 6].map(g => (
                        <button
                            key={g}
                            className={`grade-btn ${value === g ? 'selected' : ''}`}
                            onClick={() => setValue(g)}
                        >
                            {g}
                        </button>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Отказ</button>
                    <button className="btn-confirm" onClick={() => { if (value) { onConfirm(value); onClose(); } }}>
                        Потвърди
                    </button>
                </div>
            </div>
        </div>
    );
}