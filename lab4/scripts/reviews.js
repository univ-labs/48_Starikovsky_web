import {getCookie, setCookie, deleteCookie} from './cookie.js';


const reviewForm = document.getElementById('review-form');
const nameInput = document.getElementById('name');
const textInput = document.getElementById('text');
const ratingInput = document.getElementById('rating');
const reviewContainer = document.getElementById('review-container');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');
const imageInput = document.getElementById('image');

const constReviews = [
    {name: "Абу", text: "Весь Двач лег под этот камень, а я в нем - дырка.", rating: 5, date: "2024-03-01T10:00:00Z"},
    {name: "Стрыкало", text: "Мама, прости. Папа, прости. Я не купил...", rating: 2, date: "2024-03-02T10:00:00Z"},
    {name: "Чья-то мать из Доты", text: "Помогите🙈. Сын больше не слушает меня 😬. Заблокируйте этот сайт моему сынуле 💩✔️", rating: 1, date: "2024-03-02T10:00:00Z"},
    {name: "Михаил", text: "Воистину великий камень. Просвящает систему венозную наряду с кагором церковным. Амень.", rating: 5, date: "2024-03-03T10:00:00Z"},
    {name: "Slipknot", text: "У-а-а-а-а-а", rating: 5, date: "2024-03-04T10:00:00Z"},
    {name: "Нервы", text: "Этим камнем мы восстановили себе Нервыы-ы-ы-ыы", rating: 4, date: "2024-02-05T10:00:00Z"},
    {name: "Грязная грязь", text: "Скинула на лечение самой себе", rating: 1, date: "2024-02-05T10:15:00Z"},
    {name: "Пошлая Молли", text: "Люблю ловить снежинки дыркой камня.", rating: 5, date: "2024-02-05T11:00:00Z"},
    {name: "Артас", text: "Человечки оценят. Дырка не подходит никуда - 2 из 5. Камень долго нагревается в руке 1 из 5. Ляг спать - 5 из 5. Согласен с Поднебесным", rating: 1, date: "2024-02-05T11:00:00Z"},
    {name: "Поднебесный", text: "Кроманьонка не отреагировала. Видимо, была слишком старой.", rating: 5, date: "2024-02-05T09:00:00Z"},
];

// let reviews = JSON.parse(getCookie('reviews')) || [];
let reviews = getCookie('reviews') ? JSON.parse(getCookie('reviews')) : [];

function loadReviews() {
    // const savedReviews = getCookie('reviews');
    // if (savedReviews) {
    //     reviews = JSON.parse(savedReviews);
    // }
    displayReviews();
}

const reviewsPerPage = 5;
let currentReviewIndex = 0;

function displayReviews() {
    console.log("currentReviewIndex:", currentReviewIndex);

    const filterValue = filterSelect.value;
    const sortValue = sortSelect.value;

    const allReviews = [...constReviews, ...reviews];

    const sortedReviews = allReviews.filter(review => {
        return filterValue === 'all' || review.rating === parseInt(filterValue);
    });

    if (sortValue === 'rating_high') {
        sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === 'rating_low') {
        sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === 'date_new') {
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === 'date_old') {
        sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // if (reset) {
    //     currentReviewIndex = 0;
    //     reviewContainer.innerHTML = '';
    // }
    reviewContainer.innerHTML = '';
    const nextReviews = sortedReviews.slice(currentReviewIndex, currentReviewIndex + reviewsPerPage);

    nextReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        
        reviewElement.innerHTML = `
            <h3 id="name-review">${review.name}</h3>
            <p>${review.text}</p>
            <p class="rating">${'💎'.repeat(review.rating)}</p>
            ${review.imageUrl ? `<img src="${review.imageUrl}" alt="" class="review-image">` : ''}
        `;
        
        reviewContainer.append(reviewElement);
    });

    // currentReviewIndex += reviewsPerPage;
}

// Обработчик добавления отзывов
reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const rating = parseInt(ratingInput.value);
    const image = imageInput.files[0];

    // Проверка, что все введено нормуль
    if (name && text && rating >= 1 && rating <= 5) {
        const newReview = {
            name,
            text,
            rating,
            date: new Date().toISOString(),
            imageUrl: image ? URL.createObjectURL(image) : null,
        };

        if(newReview.rating >= 3){
            reviews.unshift(newReview);
            setCookie('reviews', JSON.stringify(reviews), 3); // Летит в куки на 3 дня
        }
        else{
            alert("Ты немного промахнулся в циферке, но не волнуйся, он будет в ленте до поры до времени.");
            constReviews.push(newReview);
        }
        displayReviews(); // Обновляем ленту отзывов
    } else {
        alert('Будь послушным кроманьонцем. Напиши хороший отзыв, чтобы мы знали твое имя, твои намерения и твою красивую оценку нашего камня. Мы не найдем тебя по IP. ' + 
            '\n\t\t\tПотому что я не умею');
    }

    // Очищаем форму
    reviewForm.reset();
});

// Обработчик фильтрации и сортировки
filterSelect.addEventListener('change', displayReviews);
sortSelect.addEventListener('change', displayReviews);

// window.addEventListener('scroll', () => {
//     if (reviewContainer.scrollTop + reviewContainer.clientHeight >= reviewContainer.scrollHeight) {
//         displayReviews();
//     }
// });

// Прокрутка вперёд
document.getElementById('next-btn').addEventListener('click', () => {
    const allReviews = [...constReviews, ...reviews];

    // Если достигнут конец, возвращаемся в начало
    if (currentReviewIndex + reviewsPerPage < allReviews.length) {
        currentReviewIndex += reviewsPerPage;
    } else {
        currentReviewIndex = 0; // Возвращаемся к началу
    }
    
    displayReviews();
});

// Прокрутка назад
document.getElementById('prev-btn').addEventListener('click', () => {
    const allReviews = [...constReviews, ...reviews];
    if (currentReviewIndex - reviewsPerPage >= 0) {
        currentReviewIndex -= reviewsPerPage;
    } 
    // else {
    //     currentReviewIndex = 0;
    // }
    
    displayReviews();
});

// превьюшка изображения
const imagePreviewContainer = document.getElementById('image-preview');


window.addEventListener('load', function() {
    imagePreviewContainer.innerHTML = 'Выбери картиночку-малышечку';
});

imageInput.addEventListener('change', function(event){
    
    const file = event.target.files[0];
    console.log('Файл выбран:', file);

    if (!file) {
        imagePreviewContainer.innerHTML = 'Выбери картиночку-малышечку еще раз';
        return;
    }

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/svg'];
    if(!allowedFormats.includes(file.type)){
        alert("Засунь картиночку или гифку.");
        imageInput.value = '';
        imagePreviewContainer.innerHTML = '';
        return;
    }

    const reader = new FileReader();

        reader.onload = function(e){
            const img = document.createElement('img');
            img.src = e.target.result;

            imagePreviewContainer.innerHTML = '';
            imagePreviewContainer.appendChild(img);
        };

    reader.readAsDataURL(file);    
});


loadReviews();
// deleteCookie('reviews');


