async function getComments() {
    const url = new URL('https://dummyjson.com/comments');

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

async function getLeetcodeStatus(username) {
    const url = new URL(`https://alfa-leetcode-api.onrender.com/${username}`);
    let attempts = 3;

    while (attempts > 0) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

            const data = await response.json();
            showPopup(data);
            return data;
        } catch (error) {
            console.error(error);
            attempts--;
            if (attempts > 0) await new Promise(res => setTimeout(res, 1000));
        }
    }
}

async function searchVacancies(keyword) {
    const url = new URL('https://api.hh.ru/vacancies');
    url.searchParams.append('text', keyword);
    url.searchParams.append('area', "1");

    try {
        const response = await fetch(url);
        const data = await response.json();

        showVacanciesPopup(data.items);
        return data.items;
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        return [];
    }
}

function showPopup(data) {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "white";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = "1000";
    popup.style.maxWidth = "300px";
    popup.style.textAlign = "center";

    const closeButton = document.createElement("button");
    closeButton.innerText = "Закрыть";
    closeButton.style.marginTop = "10px";
    closeButton.onclick = () => document.body.removeChild(popup);

    const content = document.createElement("div");
    content.innerHTML = `
        <h1>LeetCode Статус</h1>
        <img src="${data.avatar}" alt="Аватар" style="width: 50px; height: 50px; border-radius: 50%;">
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Юзернейм:</strong> ${data.username}</p>
        <p><strong>Репутация:</strong> ${data.reputation}</p>
        <p><strong>Рейтинг:</strong> ${data.ranking}</p>
        <p><a href="${data.gitHub}" target="_blank">GitHub</a></p>
    `;

    popup.appendChild(content);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

function showVacanciesPopup(vacancies) {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "white";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = "1000";
    popup.style.maxWidth = "400px";
    popup.style.textAlign = "center";

    const closeButton = document.createElement("button");
    closeButton.innerText = "Закрыть";
    closeButton.style.marginTop = "10px";
    closeButton.onclick = () => document.body.removeChild(popup);

    const content = document.createElement("div");
    content.innerHTML = `<h1>Найденные вакансии</h1>`;
    vacancies.slice(0, 5).forEach(vacancy => {
        content.innerHTML += `
            <p><strong>${vacancy.name}</strong></p>
            <p><a href="${vacancy.alternate_url}" target="_blank">Подробнее</a></p>
            <hr>
        `;
    });

    popup.appendChild(content);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}
