import './Accordion.css';

export default function AccordionItem({ title, children, isOpen, onToggle }) {
    return (
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button className="accordion-header" onClick={onToggle}>
                <span>{title}</span>
                <span className={`accordion-icon ${isOpen ? 'rotated' : ''}`}>▾</span>
            </button>
            <div className="accordion-body" style={{ maxHeight: isOpen ? '300px' : '0' }}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
}