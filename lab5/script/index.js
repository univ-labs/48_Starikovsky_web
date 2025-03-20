class Block {
    constructor(data, type) {
        this.data = data;
        this.type = type;
    }

    toHTML() {
        throw new Error("Method 'toHTML()' must be implemented.");
    }
}


// dont touch, son, it doesn't work
class SubBlock {                // Если вы видите этот класс незакомменченным, то автор либо умер, либо чёт в жизни у него не то 
    constructor(params, id) {
        this.id = id || Date.now() + Math.random(); // Учитываем переданный ID
        this.params = params.map(p => ({ 
            ...p,
            id: p.id || Date.now() + Math.random() // Генерируем ID для параметра, если его нет
        }));
    }

    toHTML() {
        return `
            <div class="subblock" data-subblock-id="${this.id}">
                <!-- <h4>${this.title}</h4> --!>
                <ul>
                    ${this.params.map(param => `
                        <li data-param-id="${param.id}">
                            ${param.name}: ${param.value}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

class TextBlock extends Block{
    constructor(data){
        super(data, 'TextBlock');
        // this.data.subblocks = this.data.subblocks || [];
        this.data = {
            title: data.title || '', // Добавляем заголовок
            subblocks: (data.subblocks || []).map(sub => 
                new SubBlock((sub.params || []).map(p => ({...p})))
            )
        };
    }

    toHTML(index) {
        const subblocksHTML = this.data.subblocks.map((subblock, subIndex) => `
            <div class = "subblock">
                ${subblock.toHTML()}
                <button class = "remove-subblock-btn" data-block-index="${index}" data-sub-index="${subIndex}">Удалить подблок</button>
            </div>
        `).join('');

        return `
            <div class="card" contenteditable="false" data-block-index="${index}">
                <h2>${this.data.title || 'Впишите ваше'}</h2>
                <!-- <p>${this.data.content}</p> --!>
                ${subblocksHTML}
                <!-- Кнопка для добавления подблоков -->
                <button class="add-subblock-btn">Добавить подблок</button>
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

function addSubblock(buttonElement, blocks){
    const blockElement = buttonElement.closest('.card');
    // const blockIndex = Array.from(blockElement.parentElement.children).indexOf(blockElement);
    const blockIndex = parseInt(blockElement.dataset.blockIndex);

    // Проверяем, что blockIndex корректен
    if (isNaN(blockIndex)) {
        console.error('Некорректный индекс блока:', blockIndex);
        return;
    }
    if (blockIndex < 0 || blockIndex >= blocks.length) {
        console.error('Индекс блока выходит за пределы массива:', blockIndex);
        return;
    }

    const block = blocks[blockIndex];

    // Проверяем, что блок является TextBlock
    if (block.type !== 'TextBlock') {
        console.error('Подблоки можно добавлять только в TextBlock');
        return;
    }

    // Инициализируем subblocks, если они не существуют
    if (!block.data.subblocks) {
        block.data.subblocks = [];
    }

    // Очищаем subblocks перед добавлением новых
    // block.data.subblocks = []; // Очистка subblocks

    // const hasDuplicate = block.data.subblocks.some(sub => 
    //     sub.params[0]?.name === 'Параметр 1' && sub.params[0]?.value === 'Какой-то'
    // );
    
    // if (!hasDuplicate) {
    //     block.data.subblocks.push(new SubBlock([{ name: 'Параметр 1', value: 'Какой-то' }]));
    // }
    block.data.subblocks.push(new SubBlock(
        [{
            name: `Параметр ${block.data.subblocks.length + 1}`,
            value: '',
            id: Date.now() + Math.random()
        }],
        Date.now() + Math.random() // Генерируем уникальный ID для подблока
    ));
    console.log('Added subblock to block:', blockIndex, block);
    console.log('Current subblocks:', block.data.subblocks);
    buildPage(blocks);
}

function removeSubblock(buttonElement, blocks){
    const blockElement = buttonElement.closest('.card');
    const blockIndex = parseInt(blockElement.dataset.blockIndex);
    const subblockIndex = parseInt(buttonElement.dataset.index);

    const block = blocks[blockIndex];

    //Удаление
    block.data.subblocks.splice(subblockIndex, 1);

    buildPage(blocks);
}

function buildPage(blocks) {
    const blocksContainer = document.getElementById('blocks-container');
    blocksContainer.innerHTML = ''; // Очищаем только контейнер с блоками
    blocks.forEach((block, index) => {
        blocksContainer.innerHTML += block.toHTML(index);
    });
}

function restoreBlocks(savedBlocks) {
    const restoredBlocks = savedBlocks.map(block => {
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
                return new TextBlock({
                    title: block.data.title || '',
                    subblocks: (block.data.subblocks || []).map(sub => ({
                        id: sub.id, // Передаем сохраненный ID
                        params: sub.params.map(p => ({
                            ...p,
                            id: p.id // Сохраняем ID параметра
                        }))
                    }))
                });
            default:
                throw new Error(`Unknown block type: ${block.type}`);
        }
    }).filter(block => block !== null); // Удалить пропущенные блоки

    console.log('After restoring:', restoredBlocks);
    return restoredBlocks;
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
                    // block.data.content = blockElement.querySelector('p').innerText;
                    const subblocksInDOM = Array.from(blockElement.querySelectorAll('.subblock'));
                    subblocksInDOM.forEach(subblockElement => {
                        const subId = subblockElement.dataset.subblockId;
                        const existingSub = block.data.subblocks.find(s => s.id === subId);
                        
                        if (existingSub) {
                            existingSub.params = Array.from(subblockElement.querySelectorAll('li'))
                                .map(li => {
                                    const paramId = li.dataset.paramId;
                                    const [name, value] = li.innerText.split(':').map(s => s.trim());
                                    return {
                                        id: paramId || Date.now() + Math.random(),
                                        name: name || "Параметр",
                                        value: value || ""
                                    };
                                });
                        }
                    });
                    console.log(`Block ${index} subblocks after update:`, block.data.subblocks);
                    break;
            }
        });
        localStorage.setItem('blocks', JSON.stringify(blocks.map(block => ({
            type: block.type,
            data: {
                ...block.data,
                // subblocks: block.data.subblocks ? 
                //     // Удаляем дубликаты по уникальному ключу (например, name)
                //     block.data.subblocks.filter((sub, index, self) => 
                //         self.findIndex(s => s.params[0]?.name === sub.params[0]?.name) === index
                //     ).map(sub => ({ params: sub.params })) 
                //     : []
                // subblocks: block.data.subblocks.map(sub => ({ params: sub.params }))
                subblocks: (block.data.subblocks || []).map(sub => ({
                    id: sub.id, // Сохраняем ID подблока
                    params: sub.params.map(p => ({
                        id: p.id, // Сохраняем ID параметра
                        name: p.name,
                        value: p.value
                    }))
                }))
            }
        }))));
        console.log('After saving:', JSON.parse(localStorage.getItem('blocks')));

        alert('Изменения сохранены!');
    });

    console.log('Before saving:', blocks);

    // Добавление нового текстового блока
    const addTextBlockButton = document.createElement('button');
    addTextBlockButton.textContent = 'Добавить блок';
    controlsContainer.append(addTextBlockButton);

    addTextBlockButton.addEventListener('click', () => {
        // blocks.push(new TextBlock({ content: 'Новый текстовый блок' }));
        const newBlock = new TextBlock({ 
            content: 'Новый текстовый блок', 
            subblocks: [] // Явно передаём пустой массив subblocks
        });
        blocks.push(newBlock);
        console.log('New block added:', newBlock);
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

    // Назначаем обработчик на родительский элемент
    document.getElementById('blocks-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-subblock-btn')) {
            addSubblock(e.target, blocks);
        }
        if (e.target.classList.contains('remove-subblock-btn')) {
            removeSubblock(e.target, blocks);
        }
    });
    // document.querySelector('.add-subblock-btn').onclick = (e) => addSubblock(e.target, blocks);
    // document.querySelector('.remove-subblock-btn').onclick = (e) => removeSubblock(e.target, subblockIndex, blocks);
});

// localStorage.removeItem('blocks');