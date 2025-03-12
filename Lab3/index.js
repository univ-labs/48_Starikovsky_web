let token = "92aaedc4281accc186a8150be7fd8d7143fcc5b4";

async function startGame() {
  let firstWord;

  while (true) {
    firstWord = prompt("Введите первый город для начала игры:").trim();

    if (!firstWord) {
      alert("Введите название города!");
      continue;
    }

    let checkFirstWord = await checkCity(firstWord, token);

    if (!checkFirstWord) {
      alert("Нет такого города( Попробуйте снова");
      continue;
    }

    let cityParts = checkFirstWord.split(" ");
    let firstCityName = cityParts.slice(1).join(" ");

    if (firstCityName.toLowerCase() !== firstWord.toLowerCase()) {
      alert("Нет такого города( Попробуйте снова");
      continue;
    }

    break;
  }

  let lastLet = getLastValidLetter(firstWord);
  alert(`Играем в города! Первое слово: ${firstWord}`);

  while (true) {
    let clientWord = prompt(`Тебе на ${lastLet.toUpperCase()})`).trim();

    if (!clientWord) {
      alert("Ты не ввёл город!");
      continue;
    }

    let checkWord = await checkCity(clientWord, token);

    if (!checkWord) {
      alert("Нет такого города(");
      continue;
    }

    let cityParts = checkWord.split(" ");
    let cityName = cityParts.slice(1).join(" "); 

    if (cityName.toLowerCase() !== clientWord.toLowerCase()) {
      alert("Нет такого города(");
      continue;
    }

    let lastClientLet = getLastValidLetter(clientWord);
    lastLet = lastClientLet; 

    console.log(`Супер! Следующий ход на "${lastLet}"`);
  }
}

async function checkCity(query, token) {
  let url =
    "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

  let options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      query: query,
      from_bound: { value: "city" },
      to_bound: { value: "city" },
    }),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((currCity) => {
      if (currCity.suggestions && currCity.suggestions.length > 0) {
        return currCity.suggestions[0].value;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      return null;
    });
}

function getLastValidLetter(word) {
  let lastLet = word[word.length - 1].toLowerCase();

  if ("ъьый".includes(lastLet)) {
    lastLet = word[word.length - 2].toLowerCase();
  }

  return lastLet;
}