import './StatusBadge.css';

export default function StatusBadge({ status, label }) {
    const status_config = {
        online: { color: 'green', label: 'На линия' },
        away: { color: 'yellow', label: 'Отсъства' },
        offline: { color: 'gray', label: 'Офлайн' },
    };

    const config = status_config[status];

    return (
        <div className="status-badge">
            <span className={`status-dot ${config.color}`}></span>
            <span className="status-text">{`${label} - ${config.label}`}</span>
        </div>
    );
}