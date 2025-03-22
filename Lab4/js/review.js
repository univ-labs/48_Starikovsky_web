// Функция для отрисовки отзывов
function renderReviews(reviews) {
  let reviewBox = document.getElementById("reviews-box");
  reviewBox.innerHTML = "";

  reviews.forEach(function (review) {
    let reviewElement = document.createElement("div");
    reviewElement.className = "user-review";

    let reviewHeader = document.createElement("div");
    reviewHeader.className = "user-review-header";

    let userInfo = document.createElement("div");
    userInfo.className = "user-info";

    let reviewName = document.createElement("h3");
    reviewName.className = "username";
    reviewName.textContent = review.username;

    let reviewRating = document.createElement("div");
    reviewRating.className = "star-rating";

    let starsBackground = document.createElement("div");
    starsBackground.className = "stars-background";
    starsBackground.textContent = "★★★★★";

    let starsOverlay = document.createElement("div");
    starsOverlay.className = "stars-overlay";
    starsOverlay.textContent = "★★★★★";

    let ratingPercentage = (review.rating / 5) * 100;
    starsOverlay.style.width = ratingPercentage + "%";

    reviewRating.appendChild(starsBackground);
    reviewRating.appendChild(starsOverlay);

    userInfo.appendChild(reviewName);
    userInfo.appendChild(reviewRating);

    let reviewDate = document.createElement("h4");
    reviewDate.className = "review-date";
    reviewDate.textContent = review.date;

    reviewHeader.appendChild(userInfo);
    reviewHeader.appendChild(reviewDate);

    let reviewDescription = document.createElement("p");
    reviewDescription.textContent = review.description;

    reviewElement.appendChild(reviewHeader);
    reviewElement.appendChild(reviewDescription);

    reviewBox.appendChild(reviewElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Отображаем отзывы
  renderReviews(reviews);

  // Сортировка
  document.getElementById("sort-high").addEventListener("click", function () {
    let sortedReviews = reviews.slice().sort((a, b) => b.rating - a.rating);
    renderReviews(sortedReviews);
  });

  document.getElementById("sort-low").addEventListener("click", function () {
    let sortedReviews = reviews.slice().sort((a, b) => a.rating - b.rating);
    renderReviews(sortedReviews);
  });

  let popup = document.getElementById("feedbackPopup");
  let closeBtn = document.querySelector(".close");

  function openPopup() {
    popup.style.display = "flex";
  }

  function closePopup() {
    popup.style.display = "none";
  }
  let openPopupButton = document.getElementById("openPopupButton");

  openPopupButton.addEventListener("click", function () {
    openPopup();
  });
  closeBtn.addEventListener("click", closePopup);

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  let stars = document.querySelectorAll(".rating span");
  let selectedRating = document.getElementById("selectedRating");

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      let value = this.getAttribute("data-value");

      selectedRating.value = value;

      stars.forEach(function (s) {
        s.classList.remove("selected");
      });

      for (let i = 0; i < value; i++) {
        stars[i].classList.add("selected");
      }
    });

    star.addEventListener("mouseover", function () {
      let value = this.getAttribute("data-value");

      stars.forEach(function (s, index) {
        if (index < value) {
          s.classList.add("selected");
        } else {
          s.classList.remove("selected");
        }
      });
    });

    star.addEventListener("mouseout", function () {
      let value = selectedRating.value;

      stars.forEach(function (s, index) {
        if (index < value) {
          s.classList.add("selected");
        } else {
          s.classList.remove("selected");
        }
      });
    });
  });
});