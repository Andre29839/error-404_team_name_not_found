const LightSwitcher = document.querySelector(".switcher")
let isLight = localStorage.getItem("isLight") === "true"

document.body.classList.toggle("light", isLight)

LightSwitcher.onclick = function () {
    isLight = !isLight
    document.body.classList.toggle("light", isLight)
    localStorage.setItem("isLight", isLight)
}

// Navigation menu

const currentUrl = window.location.pathname
const navLink = document.querySelectorAll(".menu-list, .nav-list")


if (currentUrl.includes('index')) {
    navLink[0].children[0].classList.add("is-active")
    navLink[1].children[0].classList.add("is-active")
}
else if (currentUrl.includes('catalog')) {
    navLink[0].children[0].classList.remove("is-active")
    navLink[1].children[0].classList.remove("is-active")
    navLink[0].children[1].classList.add("is-active")
    navLink[1].children[1].classList.add("is-active")
    // navLink[0].children[2].classList.remove("is-active")
    // navLink[1].children[2].classList.remove("is-active")
} else if (currentUrl.includes('library')) {
    navLink[0].children[0].classList.remove("is-active")
    navLink[1].children[0].classList.remove("is-active")
    // navLink[0].children[1].classList.remove("is-active")
    // navLink[1].children[1].classList.remove("is-active")
    navLink[0].children[2].classList.add("is-active")
    navLink[1].children[2].classList.add("is-active")
}


// const currentUrl = window.location.pathname;
// const navLink = document.querySelectorAll(".menu-list, .nav-list");

// console.log(navLink);

// // Создаем массив с возможными значениями currentUrl
// const paths = ["index", "catalog", "library"];

// // Перебираем все элементы navLink и их детей
// navLink.forEach(link => {
//     console.log(link);
//   link.children.forEach((child, index) => {
//     // Проверяем, заканчивается ли currentUrl одним из значений из массива paths
//     if (currentUrl.endsWith(paths[index])) {
//       // Если да, то добавляем класс is-active
//       child.classList.toggle("is-active", true);
//     } else {
//       // Если нет, то удаляем класс is-active
//       child.classList.toggle("is-active", false);
//     }
//   });
// });