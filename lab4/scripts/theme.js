const btnThm = document.getElementById("theme-button");
const link = document.getElementById("theme-link");

const lightTheme = "css/light_theme.css";
const darkTheme = "css/dark_theme.css";

btnThm.addEventListener("click", function () { ChangeTheme(); });

function ChangeTheme()
{
    

    let currentTheme = link.getAttribute("href");
    let theme = "";

    if (currentTheme === darkTheme){
        currentTheme = lightTheme;
        theme = "light";
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
    else{
        currentTheme = darkTheme;
   	    theme = "dark";
           document.body.classList.remove('light-theme');
           document.body.classList.add('dark-theme');
    }

    link.setAttribute("href", currentTheme);
    localStorage.setItem("theme", theme);
    // Save(theme);
}

// Проверка темы при загрузке страницы
window.addEventListener("load", function () {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        link.setAttribute("href", lightTheme);
        document.body.classList.add('light-theme');
    } else {
        link.setAttribute("href", darkTheme);
        document.body.classList.add('dark-theme');
    }
});