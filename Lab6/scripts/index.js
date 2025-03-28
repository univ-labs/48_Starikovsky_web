import {
    HeaderBlock,
    InfoBlock,
    SkillsBlock,
    EducationBlock,
    ExperienceBlock,
    AboutMeBlock,
    ContactBlock,
    TextBlock,
} from "./blocks.js";

// Функция для построения страницы
function buildPage(blocksContainer, blocks) {
    blocksContainer.innerHTML = "";

    blocks.forEach((block, index) => {
        blocksContainer.innerHTML += block.toHTML(index);
    });
}

// Функция для добавления кнопки удаления и редактирования
function setupEditMode(blocksContainer, blocks, isEditMode) {
    const cards = blocksContainer.querySelectorAll(".block");

    cards.forEach((card, index) => {
        const headers = card.querySelectorAll("h1, h2, h3, h4, h5, h6"); // Находим все заголовки

        headers.forEach((header) => {
            if (isEditMode) {
                // Создаем кнопку "×"
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "×";
                deleteButton.style.position = "absolute";
                deleteButton.style.right = "10px";
                deleteButton.style.background = "red";
                deleteButton.style.color = "white";
                deleteButton.style.border = "none";
                deleteButton.style.borderRadius = "50%";
                deleteButton.style.width = "24px";
                deleteButton.style.height = "24px";
                deleteButton.style.cursor = "pointer";

                deleteButton.addEventListener("click", () => {
                    const parentBlock = header.closest(".block");
                    if (parentBlock) {
                        let accept = confirm(
                            "Вы точно уверены что хотите удалить этот блок?"
                        );
                        if (accept) {
                            parentBlock.remove();
                            blocks.splice(index, 1); // Удаляем блок из массива
                            //   saveBlocksToLocalStorage(blocks); // Сохраняем изменения
                        }
                    }
                });

                // Добавляем кнопку "×" рядом с заголовком
                header.style.position = "relative"; // Делаем заголовок относительным для позиционирования кнопки
                header.appendChild(deleteButton);

                card.setAttribute("contenteditable", true);
                blocks[index].isEditing = true;
            } else {
                // Убираем кнопку "×" при выключении режима разработчика
                const deleteButton = header.querySelector("button");
                if (deleteButton) {
                    deleteButton.remove();
                }

                card.setAttribute("contenteditable", false);
                blocks[index].isEditing = false;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const blocksContainer = document.getElementById("block-container");

    const blocks = [
        new HeaderBlock({name: "Егор Стариковский", city: "Москва"}),
        new InfoBlock({speciality: "Python Backend разработчик (обучение)"}),
        new SkillsBlock({
            skills: [
                "Python",
                "FastAPI",
                "Git",
                "REST API",
                "PostgreSQL",
                "ООП",
                "Алгоритмы и структуры данных",
            ],
        }),
        new EducationBlock({
            content:
                "Российский химико-технологический университет имени Д. И. Менделеева, 2 курс",
        }),
        new ExperienceBlock({content: ""}),
        new AboutMeBlock({
            content:
                "Два года занимаюсь программированием на языке Python. <br><br> Регулярно решаю алгоритмические задачи с LeetCode и Codewars. Люблю изучать что-то новое и активно попробую себя в Backend разработке.",
        }),
        new ContactBlock({
            email: "starikovskyye4@gmail.com",
            phone: "+7",
            tg: "@mamaelyaaa",
        }),
    ];

    // Строим страницу
    buildPage(blocksContainer, blocks);

    // Кнопка для переключения режима разработчика
    const editToggle = document.createElement("button");
    editToggle.id = "edit-button";

    const svgIcon = document.createElement("img");
    svgIcon.src = "./public/switch-svgrepo-com.svg";
    svgIcon.style.width = "40px";
    svgIcon.style.height = "40px";

    editToggle.appendChild(svgIcon);
    document.body.appendChild(editToggle);

    let isEditMode = false;

    editToggle.addEventListener("click", () => {
        svgIcon.src = isEditMode
            ? "./public/switch-svgrepo-com.svg"
            : "./public/switch-v-svgrepo-com.svg";

        isEditMode = !isEditMode;

        svgIcon.onload = () => {
            // Настраиваем режим редактирования для всех блоков
            setupEditMode(blocksContainer, blocks, isEditMode);

            if (isEditMode) {
                // Создаем кнопку "Добавить блок"
                const addBlockButton = document.createElement("button");
                addBlockButton.textContent = "Добавить блок";
                addBlockButton.style.position = "fixed";
                addBlockButton.style.bottom = "20px";
                addBlockButton.style.right = "20px";
                addBlockButton.style.background = "green";
                addBlockButton.style.color = "white";
                addBlockButton.style.border = "none";
                addBlockButton.style.borderRadius = "20px";
                addBlockButton.style.padding = "10px 20px";
                addBlockButton.style.cursor = "pointer";
                addBlockButton.style.zIndex = "1000";

                // Обработчик для создания нового блока
                addBlockButton.addEventListener("click", () => {
                    let newBlock = new TextBlock({
                        title: "Заголовок",
                        content: "Информация",
                    });

                    // Добавляем HTML нового блока в контейнер
                    blocksContainer.innerHTML += newBlock.toHTML(blocks.length); // Передаем индекс нового блока

                    // Добавляем новый блок в массив blocks
                    blocks.push(newBlock);

                    // Сохраняем блоки в localStorage
                    //   saveBlocksToLocalStorage(blocks);

                    // Настраиваем режим редактирования для нового блока
                    setupEditMode(blocksContainer, blocks, isEditMode);
                });

                document.body.appendChild(addBlockButton);
            } else {
                // Убираем кнопку "Добавить блок" при выключении режима разработчика
                const addBlockButton = document.querySelector(
                    "button[style*='bottom: 20px']"
                );
                if (addBlockButton) {
                    addBlockButton.remove();
                }
            }
        };
    });
});
