import React from 'react';
import Block from "../blocks/Block.jsx";

const HeaderComponent = () => {
    return (
        <Block
            title={
                <h1>Стариковский Егор</h1>
            }
            content={
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span>Москва</span>
                    <span className="hidden sm:block">•</span>
                    <span className="text-blue-400">Python-Backend разработчик</span>
                </div>
            }
        />
    );
};

export default HeaderComponent;