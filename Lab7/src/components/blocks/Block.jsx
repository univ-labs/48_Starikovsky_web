import React from 'react';

const Block = ({ title, content, className = '' }) => {
    return (
        <section className={`mb-5 ${className}`}>
            <div className="text-xl font-bold mb-2 dark:text-white">{title}</div>
            <div className="text-gray-700 dark:text-teal-50">{content}</div>
        </section>
    );
};

export default Block;