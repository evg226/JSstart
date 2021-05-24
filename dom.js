// Загрузка меню
var currentHW = "6"; //Текущий урок

var mainMenuItems = document.getElementById("mainMenuItems"); //список меню
var mainMenuLi = []; // пункты меню
var mainMenuLink = []; //ссылки пунтов меню
var breadcrumbActiveHW; // индикатор текущего урока
var headerHW = document.getElementById("headerHW"); //Заголовок страницы
var activeHW = document.getElementById("activeHW"); //изменяемый конкент 
var breadcrumbActiveJS; //Комментарий к текущему уроку

breadcrumbActiveHW = document.getElementById("breadcrumbActiveHW");
breadcrumbActiveHW.innerText = "HW" + currentHW;
breadcrumbActiveJS = document.getElementById("breadcrumbActiveJS");
headerHW.innerText = "Домашняя работа №" + currentHW;
activeHW.innerHTML = "";
loadHW(currentHW);

for (var i = 1; i <= 8; i++) {
    mainMenuLi[i] = document.createElement("li");
    mainMenuItems.append(mainMenuLi[i]);

    mainMenuLink[i] = document.createElement("a");
    mainMenuLink[i].href = "#";
    mainMenuLink[i].classList.add("header__menu-link");
    if (i == currentHW) {
        mainMenuLink[i].classList.toggle("header__menu-link_active");
    }
    mainMenuLink[i].id = "menuItemHW"+i;
    mainMenuLink[i].innerText = "hw"+i;
    mainMenuLi[i].append(mainMenuLink[i]);

    mainMenuLink[i].onclick = function () {
        mainMenuLink.forEach(function (item) { item.classList.remove("header__menu-link_active") });
        this.classList.toggle("header__menu-link_active");
        currentHW = this.id.slice(-1);
        breadcrumbActiveHW.innerText = "HW" + currentHW;
        headerHW.innerText = "Домашняя работа №" + currentHW;
        activeHW.innerHTML = "";
        loadHW(currentHW);
    }
}

function makeButton(func,innerHTML) {
    var button = document.createElement("button");
    button.classList.add("homework__sub-button");
    button.classList.add("homework__sub-button-5");
    button.onclick = func;
    button.innerHTML = innerHTML;
    return button;
}

function loadHW(indexHW) {
    //для создания тела уроков 1-4 использовалась верстка, для 5-8 будет использоваться DOM
  
    if ((indexHW == "1") || (indexHW == "2") || (indexHW == "3") || (indexHW == "4")) {
        activeHW.innerHTML = getHW1234HTML(indexHW);
    } else {
        breadcrumbActiveJS.innerHTML = `JS-код находится в файле hw${indexHW}.js`;

        //Формируем задания к уроку 5
        if (indexHW == "5") {
            
            var mainButton = makeButton(makeChessboard, "1. Cформировать доску");
            mainButton.setAttribute("id", "mainButton");
            activeHW.insertAdjacentElement("afterbegin", mainButton);
            
        }

         //Формируем задания к уроку 6
         if (indexHW == "6") {
          
             makeGallery();
            
        }

    }


    
    function getHW1234HTML(current) { //получение кода для тела уроков 1-4
        
        var currentHtml;
        breadcrumbActiveJS.innerHTML = "JS-код находится в файле main.js";
        if (current == "3") {
            currentHtml = `
            <div class="homework__box">
            <div id="i3_1" class="homework__sub">
                <h2 class="homework__sub-heading">
                    1. Простые числа от 0 до 100
                </h2>
                <label class="homework__sub-label" for="simpleMax">От 0 до :
                    <input class="homework__sub-inout" type="number" name="simpleMax" id="simpleMax"
                        value="100"></label>
                <a href="#i3_1" class="homework__sub-button" onclick="simpleNumbers();">Найти</a>
                <div class="homework__sub-label"> Результат
                    <div class="homework__sub-inout" id="resultSimpleId"></div>
                </div>
            </div>
            <div id="i3_2" class="homework__sub">
                <h2 class="homework__sub-heading">
                    2-3. Интернет-магазин - корзина и стоимость
                </h2>
                <!-- <label class="homework__sub-label" for="simpleMax">От 0 до :
                    <input class="homework__sub-inout" type="number" name="simpleMax" id="simpleMax" value="100"></label> -->
                <p class="homework__sub-text"> Дана корзина: var cart = [</p>
                <p class="homework__sub-text">{ nameItem: "Куртка", price: 130, quantity: 2 },</p>
                <p class="homework__sub-text">{ nameItem: "Брюки", price: 90, quantity: 3 },</p>
                <p class="homework__sub-text">{ nameItem: "Галстук",price: 30,quantity: 2}]</p>

                <a href="#i3_2" class="homework__sub-button" onclick="costCart();">Стоимость</a>

                <div class="homework__sub-label"> Корзина, руб
                    <div class="homework__sub-inout" id="resultIS"></div>
                </div>
            </div>



            <div id="3_4" class="homework__sub">
                <h2 class="homework__sub-heading">
                    4. Вывод чисел от 0 до 9
                </h2>
                <!-- <label class="homework__sub-label" for="simpleMax">От 0 до :
                    <input class="homework__sub-inout" type="number" name="simpleMax" id="simpleMax" value="100"></label> -->
                <p class="homework__sub-text"> Вывод чисел от 0 до 9 в цикле for без тела цикла</p>

                <a href="#3_4" class="homework__sub-button" onclick="forNotBody();">Вывести</a>

                <div class="homework__sub-label"> Результат
                    <div class="homework__sub-inout" id="forId"></div>
                </div>
            </div>

            <div id="3_5" class="homework__sub">
                <h2 class="homework__sub-heading">
                    5. Нарисовать пирамиду с помощью console.log
                </h2>
                <!-- <label class="homework__sub-label" for="simpleMax">От 0 до :
                    <input class="homework__sub-inout" type="number" name="simpleMax" id="simpleMax" value="100"></label> -->
                <p class="homework__sub-text"> Вывод 20 строк будет осуществлен в консоли браузера</p>

                <a href="#3_5" class="homework__sub-button" onclick="pyramid();">Вывести</a>

                <div class="homework__sub-label"> Результат - см. в console
                    <div class="homework__sub-inout" id="pydamidId"></div>
                </div>
            </div>
            `;
        }

        if (current == "2") {
            
            currentHtml = `<div id="i2_1" class="homework__sub">
                <h2 class="homework__sub-heading">
                    1. Результаты выполнения операторов
                </h2>
                <div class="homework__sub-table">
                    <p>Шаг 0</p>
                    <p>
                        var a = 1, b = 1, c, d;</p>
                    <p></p>
                    <p>Шаг 1</p>
                    <p>
                        c = ++a; alert("c=" + c);
                    </p>
                    <p>
                        // 2. Сначала выполняется префиксный инкрменент ++a, a = 2, потом - присваивание с = 2.
                    </p>
                    <p>Шаг 2</p>
                    <p>
                        d = b++; alert("d=" + d);
                    </p>
                    <p>
                        // 1. Инкремент - в постфиксе, поэтому сначала выполняется присвоение d = 1, а потом -
                        инкремент b++, b = 2.
                    </p>
                    <p>Шаг 3</p>
                    <p>
                        c = (2+ ++a); alert("c=" + c);
                    </p>
                    <p>
                        // 5. Сначала выполняется префиксный инкемент ++a, a = 3, как более приоритетный, чем
                        сложение, затем сложение (2+3), затем присвоение c = 5.
                    </p>
                    <p>Шаг 4</p>
                    <p>
                        d = (2 + b++); alert("d=" + d);
                    </p>
                    <p>
                        // 4. Сначала выполняется сложение (2 + b), (4), потом постфиксный инкремент b++, b = 3.
                        d = 4.
                    </p>
                    <p>Шаг 5</p>
                    <p>
                        alert("a=" + a);
                    </p>
                    <p>
                        // 3. Выводится a, который на третьем шаге стал a = 3.
                    </p>
                    <p>Шаг 6</p>
                    <p>
                        alert("b=" + b);
                    </p>
                    <p>
                        // 3. Выводится a, который на четвертом шаге стал b = 3.
                    </p>
                </div>

                <a href="#i2_1" class="homework__sub-button" id="b2_1" onclick="operatorsTest();">Проверить</a>
                <div class="homework__sub-label"> Ответ JS
                    <div class="homework__sub-inout wide" id="operatorsId"></div>
                </div>
            </div>

            <div id="2_2" class="homework__sub">
                <h2 class="homework__sub-heading">
                    2. Вычисление значения
                </h2>
                <p class="homework__sub-text">var a = 2;</p>
                <p class="homework__sub-text">var x = 1 + (a *= 2);</p>
                <div class="homework__sub-label">Мой ответ
                    <div class="homework__sub-inout">5</div>
                </div>
                <a href="#2_2" class="homework__sub-button" onclick="checkFunc2();">Проверить</a>
                <div class="homework__sub-label">Ответ JS
                    <div class="homework__sub-inout" id="checkId2"></div>
                </div>
            </div>

            <div id="2_3" class="homework__sub">
                <h2 class="homework__sub-heading">
                    3. Операция с условием
                </h2>
                <label class="homework__sub-label" for="varA">Переменная а
                    <input class="homework__sub-inout" type="number" onclick="clearCondition();" name="varA"
                        id="varA" value="5">
                </label>
                <label class="homework__sub-label" for="varB">Переменная b
                    <input class="homework__sub-inout" type="number" onclick="clearCondition();" name="varB"
                        id="varB" value="10">
                </label>
                <a href="#2_3" class="homework__sub-button" onclick="operCondition();">Выполнить</a>
                <div class="homework__sub-label">Результат
                    <div class="homework__sub-inout" id="resultCondition"></div>
                </div>
            </div>

            <div id="2_4" class="homework__sub">
                <h2 class="homework__sub-heading">
                    4. Вывод чисел от a до 15
                </h2>
                <label class="homework__sub-label" for="varAforRow">Переменная а
                    <input class="homework__sub-inout" type="number" onclick="clearRow();" name="varAforRow"
                        id="varAforRow" value="5">
                </label>
                <a href="#2_4" class="homework__sub-button" onclick="viewRow();">Выполнить</a>
                <div class="homework__sub-label">Результат switch
                    <div class="homework__sub-inout wide" id="resultRow"></div>
                </div>
                <div class="homework__sub-label">Результат рекурсия
                    <div class="homework__sub-inout wide" id="resultRowRec"></div>
                </div>
            </div>

            <div id="2_5" class="homework__sub">
                <h2 class="homework__sub-heading">
                    5-6. Функции осн. ариф. операций
                </h2>
                <label class="homework__sub-label" for="varAmath">Переменная а
                    <input class="homework__sub-inout" type="number" onclick="clearMath();" name="varAmath"
                        id="varAmath" value="1">
                </label>
                <label class="homework__sub-label" for="varOperMath">+, -, * или /
                    <input class="homework__sub-inout" type="text" onclick="clearMath();" name="varOperMath"
                        id="varOperMath" value="+">
                </label>
                <label class="homework__sub-label" for="varAmath">Переменная b
                    <input class="homework__sub-inout" type="number" onclick="clearMath();" name="varBmath"
                        id="varBmath" value="6">
                </label>
                <a href="#2_5" class="homework__sub-button" onclick="operationMath();">Выполнить</a>
                <div class="homework__sub-label">Результат
                    <div class="homework__sub-inout wide" id="resultMath"></div>
                </div>

            </div>

            <div id="2_7" class="homework__sub">
                <h2 class="homework__sub-heading">
                    7. Сравнение null и 0
                </h2>
                <p class="homework__sub-text">Сравнить null и 0</p>

                <p class="homework__sub-text">Мой ответ - Согласно спецификации JS null!=0. null==0 только при
                    ручном приведении</p>

                <a href="#2_7" class="homework__sub-button wide" onclick="checkNull();">Проверить</a>
                <div class="homework__sub-label">Ответ JS
                    <div class="homework__sub-inout" id="checkNullId"></div>
                </div>
            </div>
            <div id="2_8" class="homework__sub">
                <h2 class="homework__sub-heading">
                    8. Рекурсивная функция возведения в степень
                </h2>
                <label class="homework__sub-label" for="val">Основание степени
                    <input class="homework__sub-inout" type="number" name="val" id="val" value="5">
                </label>
                <label class="homework__sub-label" for="pow">Переменная а
                    <input class="homework__sub-inout" type="number" onclick="clearMath();" name="pow" id="pow"
                        value="3">
                </label>
                <a href="#2_8" class="homework__sub-button" onclick="powerFunc();">Запустить</a>
                <div class="homework__sub-label">Результат
                    <div class="homework__sub-inout" id="powerId"></div>
                </div>
            </div>
            `;
        }
        
        if (current == "1") {
            
            currentHtml=`<div class="homework__box">
                    <div id="1_1" class="homework__sub">
                        <h2 class="homework__sub-heading">
                            1. Перевод температуры из&nbsp;C&nbsp;в&nbsp;F
                        </h2>
                        <label class="homework__sub-label" for="celsium">Температура,С
                            <input class="homework__sub-inout" onchange="tempClear();" type="number" name="celsium"
                                id="celsiumId" value="100">
                        </label>
                        <a href="#1" class="homework__sub-button" onclick="tempFunc();">Перевести</a>
                        <div class="homework__sub-label"> Температура,F
                            <div class="homework__sub-inout" id="farengateId"></div>
                        </div>
                    </div>

                    <div id="1_2" class="homework__sub">
                        <h2 class="homework__sub-heading">
                            2. Обмен значений между переменными
                        </h2>
                        <label class="homework__sub-label" for="var1">Переменная 1
                            <input class="homework__sub-inout" type="number" name="var1" id="var1" value="1"></label>
                        <label class="homework__sub-label" for="var2">Переменная 2
                            <input class="homework__sub-inout" type="number" name="var1" id="var2" value="222"></label>
                        <a href="#1_2" class="homework__sub-button" onclick="varChange();">Обменять</a>
                    </div>

                    <div id="1_3" class="homework__sub">
                        <h2 class="homework__sub-heading">
                            3. Копирование значений переменных
                        </h2>
                        <label class="homework__sub-label" for="name">Name
                            <input class="homework__sub-inout" type="text" onclick="adminClear();" name="name"
                                id="nameId" value="Василий">
                        </label>
                        <a href="#1_3" class="homework__sub-button" onclick="varCopy();">Скопировать</a>
                        <div class="homework__sub-label">Admin
                            <div class="homework__sub-inout" id="adminId"></div>
                        </div>
                    </div>

                    <div id="1_4" class="homework__sub">
                        <h2 class="homework__sub-heading">
                            4. Вычисление значения выражения 1000+"108"
                        </h2>
                        <div class="homework__sub-label">Мой ответ
                            <div class="homework__sub-inout">1000108</div>
                        </div>
                        <a href="#1_4" class="homework__sub-button" onclick="checkFunc();">Проверить &gt;</a>
                        <div class="homework__sub-label">Ответ JS
                            <div class="homework__sub-inout" id="checkId"></div>
                        </div>
                    </div>

                    <div id="i1_5" class="homework__sub ">
                        <h2 class="homework__sub-heading">
                            5. Атрибуты <b>defer</b> и <b>async</b> тега
                            <b>script</b>
                        </h2>
                        <p class="homework__sub-text">По умолчанию загрузка скрипта выполняется в соответствии с
                            расположением в HTML-файле</p>
                        <p class="homework__sub-text">С defer скрипт грузится параллельно (в фоне) c другими HTML
                            элементами, но выполняеnся до
                            события
                            DOMContentLoaded. Если есть несколько скриптов c defer, то они грузятся последовательно
                        </p>

                        <p class="homework__sub-text">C async скрипт грузится также в фоновом режиме, но
                            DOMContentLoaded не ждет выполнения
                            скрипта.
                            Если есть несколько async-скриптов, то они выполняются параллельно.
                        </p>
                    </div>`;
                
                
        }

        if (current == "4") {
            currentHtml = `<div class="homework__sub">
           <h2 class="homework__sub-heading">1. Преобразование числа в объект</h2>
            <label class="homework__sub-label">Введите число от 1 до 999
                <input class="homework__sub-inout" type="number" id="input_hw${current}_1" value="538"></label>
            <a class="homework__sub-button" onclick="f${current}p1();">Найти</a>
            <div class="homework__sub-label"> Результат
                <div class="homework__sub-inout wide" id="output_hw${current}_1"></div>
            </div>
            </div>`
            
                 + `<div class="homework__sub">
            <h2 class="homework__sub-heading">2. Игра быки и коровы</h2>
            <p class="homework__sub-text" id="output_hw${current}_2ext">Нажмите, чтобы начать</p>
            <a class="homework__sub-button" id="button_hw${current}_2" onclick="f${current}p2();">Старт</a>
            <label class="homework__sub-label">Число 4-знака
                 <input class="homework__sub-inout" type="number" id="input_hw${current}_2"></label>
            <a class="homework__sub-button" onclick="f${current}p2ext();">Подтвердить</a> 
             <div class="homework__sub-label"> Результат
                 <div class="homework__sub-inout wide" id="output_hw${current}_2"></div>
             </div>
             </div>`
             
             + `<div class="homework__sub">
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
                  <div class="homework__sub-inout wide" id="output_hw${current}_3"></div>
              </div>
              </div>`;
        }

        return currentHtml;


    }
}


