// ContactComponent.jsx
import React from 'react';
import Block from "../blocks/Block.jsx";

const ContactComponent = () => {
    return (
        <Block
            title={<h2>Контакты</h2>}
            content={
                <ul className="space-y-2">
                    <li>Email: starikovskyye4@gmail.com</li>
                    <li>GitHub: <a href="https://github.com/mamaelyaaa">mamaelyaaa</a></li>
                    <li>Telegram: <a href="https://t.me/mamaelyaaa">@mamaelyaaa</a></li>
                </ul>
            }
        />
    );
};

export default ContactComponent;