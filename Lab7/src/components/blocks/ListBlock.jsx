import React from 'react';
import Block from './Block';

const ListBlock = ({title, items, className = ''}) => {
    return (
        <Block
            title={title}
            content={
                <ul className="flex flex-wrap gap-2">
                    {items.map((item) => (
                        <li
                            className="bg-gray-200 text-black px-3 py-1 rounded-full"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            }
            className={className}
        />
    );
};

export default ListBlock;