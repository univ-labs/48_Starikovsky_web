import React from 'react';
import Block from "../blocks/Block.jsx";

const AboutMeComponent = () => {
    return (
        <Block
            title={<h2>О себе</h2>}
            content={
                <div>
                    Python-разработчик с опытом работы с FastAPI, PostgreSQL. Учусь на 2 курсе РХТУ им. Д.И. Менделеева.
                    Ищу возможности для профессионального роста в backend-разработке.
                </div>
            }
        />
    );
};

export default AboutMeComponent;