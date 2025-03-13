/**
 * Получает значение куки по имени.
 * @param {string} name - Имя куки, которое нужно получить.
 * @returns {string|null} Значение куки или null, если куки не найдено.
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Устанавливает куки с указанным именем, значением и сроком хранения.
 * @param {string} name - Имя куки.
 * @param {string} value - Значение куки.
 * @param {number} days - Количество дней, на которое устанавливается куки.
 */
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));      // Устанавливаем срок истечения куки в днях
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Удаляет куки по имени.
 * @param {string} name - Имя куки, которое нужно удалить.
 */
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Экспорт функций
export {getCookie, setCookie, deleteCookie};
