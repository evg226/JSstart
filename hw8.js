// Домашняя работа №8   

//п.2
function hw8() {

//конструкция выведет "1", т.к. ("а" in window) - false
// if (!("a" in window)) {
//     var a = 1;
// }
// alert(a);

//конструкция выведет ошибку, перед выводом идет функциональное выражение без запуска, а - не определена
// var b = function a(x) {
//     x && a(--x);
// };
// alert(a);

// конструкция выведет функцию a , перед выводом идет описание фукнции без запуска,Затем привыполнении кода идет определение переменной a без присвоения
// function a(x) {
//     return x * 2;
// }
// var a;
// alert(a);

//конструкция выведет "10", т.к. при запуске функции a - принимает значение 2, но в теле функции этот параметр функции изменяется на 10 через псеводмассив arguments[]
// function b(x, y, a) {
//     arguments[2] = 10;
//         alert(a);
// }
// b(1, 2, 3);

// при запуске функции не передается объект, поэтому функция выведет текущий объект, которым является "Window"
// function a() {
//     alert(this);
//     }
// a.call(null);

    
doSnake2();
    
}

//п.1 игра с урока 7. Вносим исправления в игру с использованием функции с замыканием
// замыкание используем для функций, которые используют глобальные переменные (для игры Snake - строки 65-69,73,75 )
// на примере переменной score - пп. 76 - 82
function doSnake2() {  
    // вставляем верстку
    activeHW.innerHTML = `
        <div class="wrap">
        <h1 class="snake__heading">Игра "Змейка"</h1>
        <div id="snake-field"></div>
        <div class="snake-score"><b>Старт</b>, чтобы начать</div>           
        <div class="buttons">
            <div id="snake-start">Старт</div>
            <div id="snake-renew">Новая игра</div>
        </div>
        
    </div>   
    `;

        // Глобальные переменные:                            
    var FIELD_SIZE_X = 20;//строки
    var FIELD_SIZE_Y = 20;//столбцы
    var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
    var snake = []; // Сама змейка
    var direction = 'y+'; // Направление движения змейки
    var gameIsRunning = false; // Запущена ли игра
    var snake_timer; // Таймер змейки
    var food_timer; // Таймер для еды
    
    var bomb_timer; //Таймер для препятствий
    var startButton;    // РЕШЕНИЕ  п.1. Кнопка старт - она же поле для счета
    var snakeScore // состояние игры 
                                                        // РЕШЕНИЕ п.1
    // var score = 0;                                 замыкаем глобальную переменную score (используется в функции haveFood() - строка 299
    var scoreIncrement = createScore();         // создаем функцию для замыкания
    function createScore() {
        var score = 0;
        return function () {
            return ++score;
        }
    }

    
    function init() {
        prepareGameField(); // Генерация поля

        var wrap = document.getElementsByClassName('wrap')[0];
        // Подгоняем размер контейнера под игровое поле
        
        /*
        if (16 * (FIELD_SIZE_X + 1) < 380) {
            wrap.style.width = '380px';
        }
        else {
            wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
        }
        */
        // wrap.style.width = '400px';
        // События кнопок Старт и Новая игра
        startButton = document.getElementById('snake-start');
        startButton.addEventListener('click', startGame);
        document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
        addEventListener('keydown', changeDirection);
    }

    /**
     * Функция генерации игрового поля
     */
    function prepareGameField() {
        // Создаём таблицу
        var game_table = document.createElement('table');
        game_table.setAttribute('class', 'game-table');

        // Генерация ячеек игровой таблицы
        for (var i = 0; i < FIELD_SIZE_X; i++) {
            // Создание строки
            var row = document.createElement('tr');
            row.className = 'game-table-row row-' + i;

            for (var j = 0; j < FIELD_SIZE_Y; j++) {
                // Создание ячейки
                var cell = document.createElement('td');
                cell.className = 'game-table-cell cell-' + i + '-' + j;

                row.appendChild(cell); // Добавление ячейки
            }
            game_table.appendChild(row); // Добавление строки
        }

        var snakeField = document.getElementById('snake-field');
        snakeField.innerHTML = "";
        snakeField.appendChild(game_table); // Добавление таблицы
    }

    /**
     * Старт игры
     */
    function startGame() {
        gameIsRunning = true;
        respawn();//создали змейку

        snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
        food_timer=setTimeout(createFood, 5000);
        startButton.removeEventListener('click',startGame);
        startButton.innerHTML = `Счет: 0`;                         //РЕШЕНИЕ п.1 - кнопка рпевращается в поле для счета
        bomb_timer = setInterval(createBomb, 6000);                       //РЕШЕНИЕ п.2 - создаение препятствий
        snakeScore = document.querySelector(".snake-score");
        snakeScore.innerHTML = "Игра начата";
    }

    /**
     * Функция расположения змейки на игровом поле
     */
    function respawn() {
        // Змейка - массив td
        // Стартовая длина змейки = 2

        // Respawn змейки из центра
        var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
        var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

        // Хвост змейки
        var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
        snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
        // Голова змейки
        var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
        snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

        snake.push(snake_tail);
        snake.push(snake_head);
    }

    /**
     * Движение змейки
     */
    function move() {
        //console.log('move',direction);
        // Сборка классов
        var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');
        
        // Сдвиг головы
        var new_unit;
        var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
        var coord_y = parseInt(snake_coords[1]);
        var coord_x = parseInt(snake_coords[2]);
        
        // ********************************************************************************************
        //Убираем границы                                                РЕШЕНИЕ п.3
        var nextCoord_x = coord_x;
        var nextCoord_y = coord_y;
        // Определяем новую точку
        switch (direction) {
            case 'x-': 
                nextCoord_x = coord_x - 1;
                break;
        
            case 'x+':
                nextCoord_x = coord_x + 1;
                break;
            case 'y+':
                nextCoord_y = coord_y - 1;
                break;
            case 'y-':
                nextCoord_y = coord_y + 1;
                break;
        }
        if (nextCoord_x<0) {
            nextCoord_x = FIELD_SIZE_X - 1;
        } else if (nextCoord_x >= FIELD_SIZE_X) {
            nextCoord_x = 0;
        }
        if (nextCoord_y<0) {
            nextCoord_y = FIELD_SIZE_Y - 1;
        } else if (nextCoord_y >= FIELD_SIZE_Y) {
            nextCoord_y = 0;
        }
        new_unit = document.getElementsByClassName('cell-' + (nextCoord_y) + '-' + (nextCoord_x))[0];
        // ***********************************************************************************************

        // Проверки
        // 1) new_unit не часть змейки
        // 2) Змейка не ушла за границу поля
        //console.log(new_unit);
        if (new_unit !== undefined) {
            
        }
        if (!isSnakeUnit(new_unit) && new_unit !== undefined && !isBombUnit(new_unit)) {        //РЕШЕНИЕ п.2 - добавлено в условие (п.3-проверку на undefined можно убрать)
            // Добавление новой части змейки
            new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
            snake.push(new_unit);

            // Проверяем, надо ли убрать хвост
            if (!haveFood(new_unit)) {
                // Находим хвост
                var removed = snake.splice(0, 1)[0];
                var classes = removed.getAttribute('class').split(' ');

                // удаляем хвост
                removed.setAttribute('class', classes[0] + ' ' + classes[1]);
            }
        }
        else {
            finishTheGame();
        }
    }

    /**
     * Проверка на змейку
     * @param unit
     * @returns {boolean}
     */
    function isSnakeUnit(unit) {
        var check = false;

        if (snake.includes(unit)) {
            check = true;
        }
        return check;
    }

    /**
    * Проверка на препятствие                              п.2 РЕШЕНИЕ
     */
    function isBombUnit(unit) {
        var check = false;
        for (var item of unit.classList){
            if (item == "bomb-unit") {
                check = true;
                snake.forEach(function (item) {
                    item.classList.add("bombed-snake");
                });
                break;
            }
        }
        return check;
        
    }



    /**
     * проверка на еду
     * @param unit
     * @returns {boolean}
     */
    function haveFood(unit) {
        var check = false;

        var unit_classes = unit.getAttribute('class').split(' ');

        // Если еда
        if (unit_classes.includes('food-unit')) {
            check = true;
            createFood();
            
            startButton.innerHTML = `Счет: ${scoreIncrement()}`;                     // РЕШЕНИЕ п.1 - обновлется счет
        }
        return check;
    }

    /**
     * Создание еды
     */
    function createFood() {
        var foodCreated = false;

        while (!foodCreated) { //пока еду не создали
            // рандом
            var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
            var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

            var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
            var food_cell_classes = food_cell.getAttribute('class').split(' ');

            // проверка на змейку
            if (!food_cell_classes.includes('snake-unit')) {
                var classes = '';
                for (var i = 0; i < food_cell_classes.length; i++) {
                    classes += food_cell_classes[i] + ' ';
                }

                food_cell.setAttribute('class', classes + 'food-unit');
                foodCreated = true;
            }
        }
    }

    /**
     * Создание препятствий                                                     РЕШЕНИЕ п.2 
     */
    function createBomb() {
        var bombInField = document.querySelector(".bomb-unit"); //Поиск существ. препятствия
        // console.log(bombInField);
        if (bombInField) {                                      //если препятствие есть, то оно удаляется перед созданием нового
            bombInField.classList.remove("bomb-unit");
        } 
        var bombCreated = false;
        while (!bombCreated) { //пока препятствие не создали
            // рандом
            var bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
            var bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

            var bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];
            var bomb_cell_classes = bomb_cell.getAttribute('class').split(' ');
            // проверка на змейку
            if (!bomb_cell_classes.includes('snake-unit')) {
                bomb_cell.classList.add("bomb-unit");
                bombCreated = true;
            }
        }
    }




    /**
     * Изменение направления движения змейки
     * @param e - событие
     */
    function changeDirection(e) {
        // console.log(e);
        switch (e.keyCode) {
            case 37: // Клавиша влево
                if (direction != 'x+') {
                    direction = 'x-'
                }
                break;
            case 38: // Клавиша вверх
                if (direction != 'y-') {
                    direction = 'y+'
                }
                break;
            case 39: // Клавиша вправо
                if (direction != 'x-') {
                    direction = 'x+'
                }
                break;
            case 40: // Клавиша вниз
                if (direction != 'y+') {
                    direction = 'y-'
                }
                break;
        }
    }

    /**
     * Функция завершения игры
     */
    function finishTheGame() {
        gameIsRunning = false;
        clearInterval(snake_timer);
        clearTimeout(food_timer);
        clearTimeout(bomb_timer);
        // alert('Вы проиграли! Ваш результат: ' + score.toString());
        snakeScore.innerHTML = `Игра окончена!`;
        
    }

    /**
     * Новая игра
     */
    function refreshGame() {
        // location.reload();
        if (gameIsRunning) {
            finishTheGame();
        }
        loadHW(currentHW);
    }

    // Инициализация
    init();     

}