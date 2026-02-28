import React, { useState } from 'react';
import './Tabs.css';

export function Tab({ label, children }) {
    return <></>;
}

export default function Tabs({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = React.Children.toArray(children);

    return (
        <div className="tabs-container">
            <div className="tabs-nav">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        className={`tab-btn ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="tabs-panel">
                {tabs[activeIndex]?.props.children}
            </div>
        </div>
    );
}