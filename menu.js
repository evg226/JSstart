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
        var currentHtml = `<div class="homework__sub">
       <h2 class="homework__sub-heading">1. Преобразование числа в объект</h2>
        <label class="homework__sub-label">Введите число от 1 до 999
            <input class="homework__sub-inout" type="number" id="input_hw${current}_1" value="538"></label>
        <a class="homework__sub-button" onclick="f${current}p1();">Найти</a>
        <div class="homework__sub-label"> Результат
            <div class="homework__sub-inout" id="output_hw${current}_1"></div>
        </div>
        </div>`;
        // activeBox.innerHTML = currentHtml;

        currentHtml += `<div class="homework__sub">
        <h2 class="homework__sub-heading">2. Игра быки и коровы</h2>
        <p class="homework__sub-text" id="output_hw${current}_2ext">Нажмите, чтобы начать</p>
        <a class="homework__sub-button" id="button_hw${current}_2" onclick="f${current}p2();">Старт</a>
        <label class="homework__sub-label">Число 4-знака
             <input class="homework__sub-inout" type="number" id="input_hw${current}_2"></label>
        <a class="homework__sub-button" onclick="f${current}p2ext();">Подтвердить</a> 
         <div class="homework__sub-label"> Результат
             <div class="homework__sub-inout" id="output_hw${current}_2"></div>
         </div>
         </div>`;
        
         currentHtml += `<div class="homework__sub">
         <h2 class="homework__sub-heading">3. Игра кто хочет стать миллионером</h2>
         <a class="homework__sub-button" id="button${current}p3Start" onclick="f${current}p3Start();">Старт</a> 
         <p class="homework__sub-text" id="output_hw${current}_3ext">Вопрос</p>
         <div class="homework__sub-check-box">
         <label class="homework__sub-check">
            <input class="homework__sub-check-radio" type="radio" checked name="question" value="1">
            <span class="question-text">Ответ</span>
            </label>
         <label class="homework__sub-check">
            <input class="homework__sub-check-radio" type="radio" name="question" value="2">
            <span class="question-text">Ответ</span>
         </label>
         </div>
         <div class="homework__sub-check-box">
         <label class="homework__sub-check">
            <input class="homework__sub-check-radio" type="radio" name="question" value="3">
            <span class="question-text">Ответ</span>
        </label>
         <label class="homework__sub-check">
            <input class="homework__sub-check-radio" type="radio" name="question" value="4">
            <span class="question-text">Ответ</span>
            </label>
         </div>
         <a class="homework__sub-button" id="button${current}p3" onclick="f${current}p3();">Ответить</a> 
          <div class="homework__sub-label"> Результат
              <div class="homework__sub-inout" id="output_hw${current}_3"></div>
          </div>
          </div>`;
         
        
        activeBox.innerHTML = currentHtml;

    }
}

