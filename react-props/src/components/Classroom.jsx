import { useState } from 'react';
import './Classroom.css';
import AddStudentForm from "./AddStudentForm.jsx";
import StudentRow from "./StudentRow.jsx";
import ClassStats from "./ClassStats.jsx";

let nextId = 1;
export default function Classroom() {
    const [students, setStudents] = useState([
        { id: nextId++, name: 'Иван Петров', grade: '11А', scores: [5, 6, 5] },
        { id: nextId++, name: 'Мария Иванова', grade: '11Б', scores: [6, 6] },
    ]);

    const handleAdd = ({ name, grade }) => {
        setStudents(prev => [...prev, { id: nextId++, name, grade, scores: [] }]);
    };

    const handleGrade = (id, score) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, scores: [...s.scores, score] } : s
        ));
    };

    const handleDelete = (id) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="classroom">
            <AddStudentForm onAdd={handleAdd} classes={['11А', '11Б', '11В', '12А', '12Б']} />
            {students.map(s => (
                <StudentRow
                    key={s.id}
                    student={s}
                    onGrade={(id, score) => {handleGrade(id, score)}}
                    onDelete={(id) => {handleDelete(id)}}
                />
            ))}
            <ClassStats students={students} />
        </div>
    );
}