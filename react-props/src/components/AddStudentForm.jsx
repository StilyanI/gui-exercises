import {useState} from "react";
import './Classroom.css';

export default function AddStudentForm({ onAdd, classes }) {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('11А');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd({ name: name.trim(), grade });
        setName('');
    };

    return (
        <form className="add-student-form" onSubmit={handleSubmit}>
            <input
                className="form-input"
                placeholder="Име на ученик"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <select className="form-select" value={grade} onChange={e => setGrade(e.target.value)}>
                {classes.map(g => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>
            <button className="btn-add" type="submit">+ Добави</button>
        </form>
    );
}