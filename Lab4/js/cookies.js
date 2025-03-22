let initReviews = [
  new Review("Евдокентий", 5, "Да круто, че говорить", "21.02.24"),
  new Review("Егор", 5, "Булька булька барабулька", "1.04.25"),
  new Review(
    "Валерий",
    4,
    "Наконец-то я могу мыть руки и заряжать телефон одновременно! Теперь я чувствую себя настоящим изобретателем будущего. Правда, мыло иногда путает, куда лить воду — в рот или на руки, но это мелочи!",
    "20.01.20"
  ),
  new Review(
    "Игорь",
    1,
    "Купил USB-мыло, чтобы сэкономить место в ванной. Теперь у меня вместо мыла — кирпич с проводами. Заряжает телефон, но руки мыть неудобно. 1 из 5.",
    "5.02.12"
  ),
];

function Review(username, rating, description, date) {
  this.username = username;
  this.rating = rating;
  this.description = description;
  this.date = date;
}

// Функция для сохранения отзывов в куки
function saveReviewsToCookies(reviews) {
  document.cookie = `reviews=${JSON.stringify(reviews)}; path=/; max-age=31536`; // Сохраняем на 1 год
}

// Функция для загрузки отзывов из куки
function loadReviewsFromCookies() {
  let cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("reviews="));
  if (cookie) {
    let reviewsFromCookies = JSON.parse(cookie.split("=")[1]);
    // Преобразуем объекты из куки в экземпляры Review
    return reviewsFromCookies.map(
      (review) =>
        new Review(
          review.username,
          review.rating,
          review.description,
          review.date
        )
    );
  }
  return [];
}

let reviews = [...initReviews, ...loadReviewsFromCookies()];

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем данные из формы
    let username = document.getElementById("username").value;
    let impression = document.getElementById("impression").value;
    let rating = document.getElementById("selectedRating").value;

    // Создаем новый отзыв
    let newReview = new Review(
      username,
      parseInt(rating),
      impression,
      new Date().toLocaleDateString()
    );

    // Добавляем отзыв в список
    let reviews = loadReviewsFromCookies();
    reviews.push(newReview);

    // Сохраняем обновленный список в куки
    saveReviewsToCookies(reviews);

<<<<<<< HEAD
=======
    function closePopup() {
      popup.style.display = "none";
    }
    
>>>>>>> 77dc2bc9510bca8ab9a69ab826efc5716aed9ee7
    // Очищаем форму и закрываем popup
    document.getElementById("feedbackForm").reset();
    closePopup();

    // Обновляем отображение отзывов
    renderReviews(reviews);

    // Обновляем страницу
    location.reload();
  });
