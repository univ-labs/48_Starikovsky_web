import React from 'react';
import Block from "../blocks/Block.jsx";

const ExperienceComponent = () => {
    return (
        <Block
            title={<h2>Опыт работы</h2>}
            content={
                <div>
                    <h3>
                        Участвовал в хакатоне RLT.Hack "Автоматизированная база знаний"
                    </h3>
                    <div>
                        <ul>Обязанности и достижения:</ul>
                        <li>
                            С помощью API запросов связал нейросеть ChatPDF с
                            необходимой базой данных для обработки запросов
                            пользователей
                        </li>
                    </div>
                </div>
            }
        />
    );
};

export default ExperienceComponent;