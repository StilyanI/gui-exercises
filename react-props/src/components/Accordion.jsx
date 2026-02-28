import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import './Accordion.css';

export default function Accordion({ children }) {
    const [openIndex, setOpenIndex] = useState(null);

    const items = React.Children.toArray(children);

    return (
        <div className="accordion">
            {items.map((child, index) => (
                <AccordionItem
                    key={child.props.title}
                    title={child.props.title}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    {child.props.children}
                </AccordionItem>
            ))}
        </div>
    );
}