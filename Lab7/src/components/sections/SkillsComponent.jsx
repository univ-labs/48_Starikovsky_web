import React from 'react';
import ListBlock from "../blocks/ListBlock.jsx";

const SkillsComponent = () => {
    const skills = [
        "Python", "FastAPI", "Git", "REST API", "PostgreSQL", "pytest", "aiohttp"
    ];

    return (
        <ListBlock
            title={<h2>Навыки</h2>}
            items={skills}
        />
    );
};

export default SkillsComponent;