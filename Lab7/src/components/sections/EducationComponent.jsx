import React from 'react';
import Block from "../blocks/Block.jsx";

const EducationComponent = () => {
    return (
        <Block
            title={<h2>Образование</h2>}
            content={
                <div>
                    <h3>
                        Российский химико-технологический университет имени Д. И. Менделеева
                    </h3>
                    <p>2 курс, 2023-настоящее время</p>
                </div>
            }
        />
    );
};

export default EducationComponent;