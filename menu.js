var currentLesson = 4;

var menuHWItem4 = document.getElementById("menu__hw4-item");
var menuHWItem5 = document.getElementById("menu__hw5-item");
var menuHWItem6 = document.getElementById("menu__hw6-item");
var menuHWItem7 = document.getElementById("menu__hw7-item");
var menuHWItem8 = document.getElementById("menu__hw8-item");

menuHWItem4.onclick = function () {
    pageClear();
    this.classList.add("header__menu-link_active");
    currentLesson = 4;
    switchToPage(currentLesson);

}
menuHWItem5.onclick = function () {
    pageClear();
    this.classList.add("header__menu-link_active");
    currentLesson = 5;
    switchToPage(currentLesson);
}
menuHWItem6.onclick = function () {
    pageClear();
    this.classList.add("header__menu-link_active");
    currentLesson = 6;
    switchToPage(currentLesson);
}
menuHWItem7.onclick = function () {
    pageClear();
    this.classList.add("header__menu-link_active");
    currentLesson = 7;
    switchToPage(currentLesson);
}
menuHWItem8.onclick = function () {
    pageClear();
    this.classList.add("header__menu-link_active");
    currentLesson = 8;
    switchToPage(currentLesson);
}

menuHWItem4.onclick();

function pageClear() {
    menuHWItem4.classList.remove("header__menu-link_active");
    menuHWItem5.classList.remove("header__menu-link_active");
    menuHWItem6.classList.remove("header__menu-link_active");
    menuHWItem7.classList.remove("header__menu-link_active");
    menuHWItem8.classList.remove("header__menu-link_active");
}

function switchToPage(current) {
    var breadcrumbActiveHW = document.getElementById("breadcrumbActiveHW");
    breadcrumbActiveHW.innerHTML = "HW" + current;
    var pageHeader = document.getElementById("pageHeader");
    pageHeader.innerHTML = "Домашняя работа №" + current;
    var activeBox = document.getElementById("activeBox");
    activeBox.innerHTML = "";

    if (current == 4) {
        f4p1();
    }
}

