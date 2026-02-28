import './StudentCard.css';

export default function StudentCard({ name, grade, averageScore }) {
    const initials = name.split(" ").map(n => n[0]).join("");

    return (
        <div className="student-card">
            <div className="student-avatar">{initials}</div>
            <div className="student-info">
                <h3 className="student-name">{name}</h3>
                <div className="student-meta">
                    <span className="meta-badge grade">Клас: {grade}</span>
                    <span className="meta-badge score">Успех: {averageScore}</span>
                </div>
            </div>
        </div>
    );
}