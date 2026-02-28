import './Classroom.css';

export default function ClassStats({ students }) {
    const allScores = students.flatMap(s => s.scores);
    const count = students.length;
    const avg = allScores.length
        ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
        : '-';
    const max = allScores.length ? Math.max(...allScores) : '-';
    const min = allScores.length ? Math.min(...allScores) : '-';

    return (
        <div className="class-stats">
            <div className="stat-card">
                <div className="stat-value">{count}</div>
                <div className="stat-label">Ученици</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{avg}</div>
                <div className="stat-label">Среден успех</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{max}</div>
                <div className="stat-label">Най-висока</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{min}</div>
                <div className="stat-label">Най-ниска</div>
            </div>
        </div>
    );
}