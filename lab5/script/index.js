class Block {
    constructor(data, type) {
        this.data = data;
        this.type = type;
    }

    toHTML() {
        throw new Error("Method 'toHTML()' must be implemented.");
    }
}

class SubBlock {
    constructor(title, params) {
        this.title = title;
        this.params = params; // Параметры подблока
    }

    toHTML() {
        return `
            <div class="subblock">
                <h3>${this.title}</h3>
                <ul>
                    ${this.params.map(param => `<li>${param.name}: ${param.value}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

class TextBlock extends Block{
    constructor(data){
        super(data, 'TextBlock');
    }

    toHTML() {
        // const subblocksHTML = this.data.subblocks.map(subblock => subblock.toHTML()).join('');
        return `
            <div class="card" contenteditable="false">
                <h2>${this.data.title || 'Впишите ваше'}</h2>
                <p>${this.data.content}</p>
                <!-- Кнопка для добавления подблоков -->
                <button class="add-subblock-btn" onclick="addSubblock(this)">Добавить подблок</button>
            </div>
        `;
    }
}


class HeaderBlock extends Block {
    constructor(data) {
        super(data, 'HeaderBlock');
    }

    toHTML() {
        return `
            <div class="card">
                <h1>${this.data.content}</h1>
            </div>
        `;
    }
}

class StatsBlock extends Block {
    constructor(data) {
        super(data, 'StatsBlock');
    }

    toHTML() {
        return `
            <div class="card">
                <h2>${this.data.title || 'Характеристики'}</h2>
                <ul>
                    ${this.data.stats.map(stat => `<li><strong>${stat.name}:</strong> ${stat.value}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

class SkillsBlock extends Block {
    constructor(data) {
        super(data, 'SkillsBlock');
    }

    toHTML() {
        return `
            <div class="card">
                <h2>${this.data.title || 'Навыки'}</h2>
                <ul>
                    ${this.data.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

class InventoryBlock extends Block {
    constructor(data) {
        super(data, 'InventoryBlock');
    }

    toHTML() {
        return `
            <div class="card">
                <h2>${this.data.title || 'Инвентарь'}</h2>
                <ul>
                    ${this.data.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function buildPage(blocks) {
    const blocksContainer = document.getElementById('blocks-container');
    blocksContainer.innerHTML = ''; // Очищаем только контейнер с блоками
    blocks.forEach(block => {
        blocksContainer.innerHTML += block.toHTML();
    });
}

function restoreBlocks(savedBlocks) {
    return savedBlocks.map(block => {
        if (!block.type) {
            console.error('Block type is missing:', block);
            return null; // Пропустить блок без типа
        }
        switch (block.type) {
            case 'HeaderBlock':
                return new HeaderBlock(block.data);
            case 'StatsBlock':
                return new StatsBlock(block.data);
            case 'SkillsBlock':
                return new SkillsBlock(block.data);
            case 'InventoryBlock':
                return new InventoryBlock(block.data);
            case 'TextBlock':
                return new TextBlock(block.data);
            default:
                throw new Error(`Unknown block type: ${block.type}`);
        }
    }).filter(block => block !== null); // Удалить пропущенные блоки
}

document.addEventListener('DOMContentLoaded', () => {
    let savedBlocks = JSON.parse(localStorage.getItem('blocks')) || [
        { type: 'HeaderBlock', data: { content: 'Эльф-лучник' } },
        // { type: 'StatsBlock', data: {
        //     stats: [
        //         { name: 'Сила', value: 12 },
        //         { name: 'Ловкость', value: 18 },
        //         { name: 'Интеллект', value: 14 }
        //     ],
        //     subblocks: [
        //         new SubBlock('Дополнительные характеристики', [
        //             { name: 'Выносливость', value: 'Высокая' },
        //             { name: 'Магия', value: 'Средняя' }
        //         ]),
        //         new SubBlock('Опыт', [
        //             { name: 'Очки опыта', value: '1200' }
        //         ])
        //     ]
        // }},
        { type: 'StatsBlock', data: { 
            title: 'Характеристики',
            stats: [
            { name: 'Сила', value: 12 },
            { name: 'Ловкость', value: 18 },
            { name: 'Интеллект', value: 14 }
        ] } },
        { type: 'SkillsBlock', data: { 
            title: 'Навыки',
            skills: ['Стрельба из лука', 'Скрытность', 'Выживание'] 
        } },
        { type: 'InventoryBlock', data: { 
            title: 'Инвентарь',
            items: ['Лук', 'Стрелы', 'Палатка'],
        } }
    ];

    let blocks = restoreBlocks(savedBlocks);

    buildPage(blocks);

    // Контейнер для кнопок
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controls';
    document.body.prepend(controlsContainer);

    // Режим редактирования
    const editToggle = document.createElement('button');
    editToggle.textContent = 'Редактировать';
    controlsContainer.append(editToggle);

    editToggle.addEventListener('click', () => {
        const blocksContainer = document.getElementById('blocks-container');
        Array.from(blocksContainer.children).forEach((blockElement, index) => {
            blockElement.contentEditable = true;
        });
    });

    // Сохранение изменений
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    controlsContainer.append(saveButton);

    saveButton.addEventListener('click', () => {
        const blocksContainer = document.getElementById('blocks-container');
        blocks.forEach((block, index) => {
            const blockElement = blocksContainer.children[index];
            switch (block.type) {
                case 'HeaderBlock':
                    block.data.content = blockElement.querySelector('h1').innerText;
                    break;
                case 'StatsBlock':
                    block.data.title = blockElement.querySelector('h2').innerText;
                    block.data.stats = Array.from(blockElement.querySelectorAll('li')).map(li => {
                        const [name, value] = li.innerText.split(':').map(s => s.trim());
                        return { name, value: parseInt(value, 10) };
                    });
                    break;
                case 'SkillsBlock':
                    block.data.skills = Array.from(blockElement.querySelectorAll('li')).map(li => li.innerText);
                    break;
                case 'InventoryBlock':
                    block.data.items = Array.from(blockElement.querySelectorAll('li')).map(li => li.innerText);
                    break;
                case 'TextBlock':
                    block.data.title = blockElement.querySelector('h2').innerText;
                    block.data.content = blockElement.querySelector('p').innerText;
                    break;
            }
        });
        localStorage.setItem('blocks', JSON.stringify(blocks.map(block => ({
            type: block.type,
            data: block.data,
        }))));
        alert('Изменения сохранены!');
    });

    // Добавление нового текстового блока
    const addTextBlockButton = document.createElement('button');
    addTextBlockButton.textContent = 'Добавить блок';
    controlsContainer.append(addTextBlockButton);

    addTextBlockButton.addEventListener('click', () => {
        blocks.push(new TextBlock({ content: 'Новый текстовый блок' }));
        buildPage(blocks);
    });

    // Удаление последнего блока
    const removeBlockButton = document.createElement('button');
    removeBlockButton.textContent = 'Удалить последний блок';
    controlsContainer.append(removeBlockButton);

    removeBlockButton.addEventListener('click', () => {
        if (blocks.length > 1) {
            blocks.pop();
            buildPage(blocks);
        }
    });
});

// localStorage.removeItem('blocks');