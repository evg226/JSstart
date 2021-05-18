// Домашння работа №4
// *************************

// п.1
// преобразование числа в объект
function f4p1() {
    var inputNumber = document.getElementById("input_hw4_1").value;
    var outputDiv = document.getElementById("output_hw4_1");

    var numberObj = DoNumberObj(inputNumber);
    console.log(numberObj);
    outputDiv.innerHTML = numberObj;

    function DoNumberObj(currentNumber) {
        if ((currentNumber > 0) && (currentNumber < 999)) {// Код по условиям задачи
            var resultObj = {};
            resultObj["Единицы"] = currentNumber % 10;
            currentNumber = (currentNumber - resultObj["Единицы"]) / 10;
            resultObj["Десятки"] = currentNumber % 10;
            currentNumber = (currentNumber - resultObj["Десятки"]) / 10;
            resultObj["Сотни"] = currentNumber % 10;
            resultObj.toString = function () {
                return `Object{ Сотни:${this["Сотни"]}, Десятки:${this["Десятки"]}, Единицы:${this["Единицы"]} }`;
            }
        }  else { // расширение кода для любого положительного целого значения (по 2 способу решения)
            resultObj = {};
            var toString = "Object{<br>";
            var digit = [ //Массив для названий стойств объекта
                "Единицы", "Десятки", "Сотни", "Тысячи", "Десятки тысяч", "Сотни тысяч", "Миллионы", "Десятки миллионов", "Сотни миллионов", "Миллиарды"
            ];
            // console.log(currentNumber.length);
            
            for (var i = currentNumber.length - 1; i >= 0; i--){
                
                var prop = typeof(digit[i]) == "undefined" ? "1"+doString('0',i+1) : digit[i]; //Формируем имя стойства 
                var val = currentNumber[currentNumber.length - i - 1];//значение свойства
                // console.log(i + ` ${prop}: ${val}`);
                resultObj[prop] = val;
                toString += `${prop}: ${resultObj[prop]},<br>`;
            }
            toString += " }";
            resultObj.toString = function () { return toString; };
        }

        return resultObj;
    }

    function doString( str, len) {
        var result = "";
        for (var i = 1; i < len; i++) {
            result += str;
        }
        return result;
    }

}

// п.2
// Игра Быки и Коровы
var currentNumber = false;//для загадываемого числа
var attemps = 0;//попытки
var steps = [];//ходы игрока;

function f4p2() { //пользователь начинает игру, ПК Загадывает число и помещает его в currentNumber

    var outputDiv = document.getElementById("output_hw4_2");
    var outputDivExt = document.getElementById("output_hw4_2ext");
    var buttonStartStop = document.getElementById("button_hw4_2");

    currentNumber = generateNumber();
    outputDiv.innerHTML = "";

    attemps = 0;
    steps = [];

    if (buttonStartStop.innerHTML == "Стоп") { //для принудильного завершения игры
        buttonStartStop.innerHTML = "Старт";
        outputDivExt.innerHTML = "Игра завершена пользователем!";
        currentNumber = false;
        // console.log(currentNumber == false);
        return;
    }
    console.log(currentNumber);
    outputDivExt.innerHTML = "Игра начата! Сгенерировано число: " + currentNumber.join(""); // число отображается в отладочном режиме
    buttonStartStop.innerHTML = "Стоп";


    function generateNumber() { //для гегерирования 4 значного числа, помещается в массив
        const min = 1, max = 9;
        var number = [];
        for (i = 0; i < 4; i++) {
            var part = Math.round(Math.random() * (max - min) + min);
            while (number.indexOf(part) != -1) {
                part = Math.round(Math.random() * (max - min) + min);
            }
            number[i] = part;
        }
        return number;
    }
}

function f4p2ext() { // пользователь делает ходы (кнопка Подтвердить в верстке)
    var inputNumber = parseInt(document.getElementById("input_hw4_2").value); // число введенное пользователем
    var outputDiv = document.getElementById("output_hw4_2");// для вывода результатов игры
    var outputDivExt = document.getElementById("output_hw4_2ext");//табло состояния игры
    var buttonStartStop = document.getElementById("button_hw4_2");

    var gameResult = [0, 0, 0]; // 1- быки, 2-коровы,2- значение хода

    if (currentNumber) { // проверка было ли начата игра

        if (inputNumber > 1000 && inputNumber < 9999) {//проверка числа введеого
            var inputArr = String(inputNumber).split("");

            inputArr.forEach(function (item, i) {
                if (parseInt(item) == currentNumber[i]) {//счетчик быков
                    gameResult[0]++;
                }
                else if (currentNumber.indexOf(parseInt(item))!=-1){//счетчик коров
                    gameResult[1]++;
                }
                // console.log(currentNumber.indexOf(parseInt(item))+" "+item);
            });
            gameResult[2] = inputNumber;
            attemps++;
            steps.push(gameResult); //запись шагов
            outputDiv.innerHTML = `Быки:${gameResult[0]} Коровы:${gameResult[1]} Попыток:${attemps}`;

            if (gameResult[0] == 4) {
                buttonStartStop.innerHTML = "Старт";
                outputDivExt.innerHTML = "Игра завершена!";
                currentNumber = false;
                
                // Вывод шагов (или выбранного шага)
                var res = "";
                var outputStep = +prompt(`Шагов было:${attemps}. Какой шаг хотите посмотреть? (0 или несущ. шаг выводит все шаги)`);
               if (outputStep > 0 && outputStep <= attemps) {
                    res += `Шаг-${outputStep}: Быки:${steps[outputStep-1][0]} Коровы:${steps[outputStep-1][1]} Ваш ход:${steps[outputStep-1][2]}<br>`;
               } else  {
                    steps.forEach(function (item, i) {
                    res += `Шаг-${i + 1}: Быки:${item[0]} Коровы:${item[1]} Ваш ход:${item[2]}<br>`;
                    console.log(res);
                });
                }
            
                outputDiv.innerHTML = res;
                
                return;

            }
            

        } else {
            outputDiv.innerHTML = "Введите четырехзначное число";
        }
    } else {
        outputDiv.innerHTML = "Запустите игру!";
    }
}

// п.3. Игра Кто хочет стать миллионером
var question; //Вопросы
var currentQuestion; // текущий вопрос
// Элементы на верстке
var buttonStartStop;
var questionElement;
var answerElement;
var answerCheckElement;
var outputDiv;


function f4p3Start() {
     buttonStartStop = document.getElementById("button4p3Start");
     questionElement = document.getElementById("output_hw4_3ext");
    answerElement = document.getElementsByClassName("question-text");
    outputDiv = document.getElementById("output_hw4_3");

    if (buttonStartStop.innerHTML == "Старт") { //запуск игры
        question = [
            {
                ask: "У кого длиннее хвост",
                answer: ["Лиса", "Заяц", "Волк", "Медведь"],
                trueAnswer: 0,
                prize:1000
            },
            {
                ask: "У кого длиннее уши",
                answer: ["Лиса1", "Заяц1", "Волк1", "Медведь1"],
                trueAnswer: 1,
                prize:10000
            },
            {
                ask: "Кто санитар леса",
                answer: ["Лиса2", "Заяц2", "Волк2", "Медведь2"],
                trueAnswer: 2,
                prize:100000
            }
        ];
        buttonStartStop.innerHTML = "Стоп";
        currentQuestion = 0; // текущий вопрос
        writeQuestion(currentQuestion);
        outputDiv.innerHTML = "";
 
    } else { // остановка игры
        question = [];
        buttonStartStop.innerHTML = "Старт";
        //запись информации о завершении игры на верстку
        currentQuestion = false;
        writeQuestion(currentQuestion);
    }

}

function writeQuestion(numb) { //записк текущего вопроса и вариантов ответа на верстку
    if (numb!==false){
        questionElement.innerHTML = question[numb].ask;
        for (var i in answerElement) {
            answerElement[i].innerHTML = question[numb].answer[i];
        }
    } else {
        questionElement.innerHTML = "Игра закончена!";
        for (var i in answerElement) {
            answerElement[i].innerHTML ="";
        }
    }
}

function f4p3() {
    buttonStartStop = document.getElementById("button4p3Start");
    questionElement = document.getElementById("output_hw4_3ext");
    answerElement = document.getElementsByClassName("question-text");
    answerCheckElement = document.getElementsByName("question");
    outputDiv = document.getElementById("output_hw4_3");

    if (buttonStartStop.innerHTML == "Стоп") { //Если игра  запущена
        
        var userAnswerNumber; //Для получения ответа пользователя с верстки
        for (var i = 0; i < answerCheckElement.length;i++) {
            if (answerCheckElement[i].checked) {
                userAnswerNumber = i;
                break;
            }
        }
        // console.log(userAnswerNumber);
        // console.log(question[currentQuestion].trueAnswer);
        if (userAnswerNumber != question[currentQuestion].trueAnswer) { //Если  ответ пользователя не совпадает с правильным ответом из БД,  игра прекращается
            outputDiv.innerHTML = "Неверный ответ!<br>"+"Вы выиграли: 0"; 
            f4p3Start();                                                              
            return;
        } 
        outputDiv.innerHTML = "Правильно!<br>"+"Ваш выигрыш: "+question[currentQuestion].prize; // выдача информации о текущем выигрыше
        
        if (currentQuestion<question.length-1){ // если текущий вопрос не последний - переход к следующему вопросу, иначе - игра завершается
            writeQuestion(++currentQuestion);   
        } else {
            f4p3Start();
        }
    } else {
        outputDiv.innerHTML = "Запустите игру";
    }
}



// Домашння работа №3
// *************************

// п.1
// Вывод простых чисел от 0 до 100
function simpleNumbers() {

    var resultSumpleDiv = document.getElementById("resultSimpleId");
    var simpleMax = +document.getElementById("simpleMax").value;

    var result = [];
    var index = 2;
    while (index < simpleMax) {
        if (isSimple(index)) {
            result.push(index);
        }
        index++;
    }
    console.log(result);
    resultSumpleDiv.innerHTML = result.join(" ");

    function isSimple(number) {
        var index = 2;
        while (index <= (number / 2)) {
            if ((number % index) == 0) {
                return false;
            }
            index++;
        }
        return true;
    }
}

// п.2-3
// Корзина Интернет магазина
function costCart() {
    var cart = [
        { nameItem: "Куртка", price: 130, quantity: 2 },
        { nameItem: "Брюки", price: 90, quantity: 3 },
        { nameItem: "Галстук", price: 30, quantity: 2 }
    ]
    var resultISDiv = document.getElementById("resultIS");
    resultISDiv.innerHTML = countBasketPrice(cart);

    function countBasketPrice(cart) {
        // var result=0;
        // for (var index = 0; index < cart.length; index++){
        //     console.log(cart[index].price);
        //     result += cart[index].price*cart[index].quantity;
        // }
        // console.log(result);

        // console.log("_________");
        // var result=0;
        // for (var item of cart){
        //     console.log(item.price);
        //     result += item.price*item.quantity;
        // }
        // console.log(result);

        // console.log("_________");
        // var result=0;
        // for (var index in cart){
        //     console.log(cart[index].price);
        //     result += cart[index].price*cart[index].quantity;
        // }
        // console.log(result);

        // console.log("_________");
        var result = 0;
        cart.forEach(function (item, index) {
            result += item.price * item.quantity; //К стоимости корзины прибавляется произведение цены текущего товра к стоимости
        });
        // console.log("result="+result);
        return result;
    }
}

// п.4
// Вывод чисел от 0 до 9

function forNotBody() {
    forId = document.getElementById("forId");
    var index = 0, result = [];
    for (; ;) {
        result.push(index++);
        if (index > 9) {
            break;
        }
    }
    forId.innerHTML = result.join(" ");
}

// п.5
// Нарисовать пирамиду с помощью console.log

function pyramid() {
    var result = "";
    for (index = 0; index < 20; index++) {
        console.log(result += "X");
    }
}

// Домашння работа №2
// *************************

// п.1
// 1. Результаты выполнения операторов
function operatorsTest() {
    var result = "";
    var a = 1, b = 1, c, d;
    c = ++a; result += ("Шаг1 c=" + c);           // 2. Сначала выполняется префиксный инкрменент ++a, a = 2, потом - присваивание с = 2.
    d = b++; result += ("/ Шаг2 d=" + d);           // 1. Инкремент - в постфиксе, поэтому сначала выполняется присвоение d = 1, а потом - инкремент b++, b = 2.
    c = (2 + ++a); result += ("/ Шаг3 c=" + c);      // 5. Сначала выполняется префиксный инкемент ++a, a = 3, как более приоритетный, чем сложение, затем сложение (2+3), затем присвоение c = 5.
    d = (2 + b++); result += ("/ Шаг4 d=" + d);     // 4. Сначала выполняется сложение (2 + b), (4), потом постфиксный инкремент b++, b = 3. d = 4.
    result += ("/ Шаг5 a=" + a);                    // 3. Выводится a, который на третьем шаге стал a = 3.
    result += ("/ Шаг6 b=" + b);                    // 3. Выводится a, который на четвертом шаге стал b = 3.
    resultOutput = document.getElementById("operatorsId");
    resultOutput.innerHTML = result;
}

// п.2
// 2. Вычисление значения
// Проверка моего ответа

function checkFunc2() {
    var outpt = document.getElementById("checkId2");
    var a = 2;
    var x = 1 + (a *= 2);//Сначала выполняется умножение в скобках, затем - сложение
    console.log(x);
    outpt.innerHTML = x;
}


// п.3
// 3. Операция с условием
// Проверка моего ответа

function operCondition() {
    var a = document.getElementById("varA").value;
    var b = document.getElementById("varB").value;
    var resultDiv = document.getElementById("resultCondition");
    var operation, result;
    if (a >= 0) {
        if (b >= 0) {
            operation = "a-b";
            result = a - b;
        } else if (b < 0) {
            operation = "a+b";
            result = parseInt(a) + parseInt(b);
        }
    } else if (a < 0) {
        if (b >= 0) {
            operation = "a+b";
            result = parseInt(a) + parseInt(b);
        } else if (b < 0) {
            operation = "a*b";
            result = a * b;
        }
    }

    resultDiv.innerHTML = result + " (" + operation + ")";
}

function clearCondition() {
    var resultDiv = document.getElementById("resultCondition");
    resultDiv.innerHTML = "";
}

// п.4
// 4. 
// Вывод чисел от a до 15


function viewRow() {
    var a = document.getElementById("varAforRow").value;
    a = parseInt(a);
    var resultRow = document.getElementById("resultRow");
    var resultRowRec = document.getElementById("resultRowRec");


    if ((a < 0) || (a > 15)) {
        var answer = "Введите а от 0 до 15"
        resultRow.innerHTML = answer;
        resultRowRec.innerHTML = answer;
        return;
    }
    resultRowRec.innerHTML = viewRow_rec(a);

    var result = "";
    switch (a) {
        case 0: result += a++ + " ";
        case 1: result += a++ + " ";
        case 2: result += a++ + " ";
        case 3: result += a++ + " ";
        case 4: result += a++ + " ";
        case 5: result += a++ + " ";
        case 6: result += a++ + " ";
        case 7: result += a++ + " ";
        case 8: result += a++ + " ";
        case 9: result += a++ + " ";
        case 10: result += a++ + " ";
        case 11: result += a++ + " ";
        case 12: result += a++ + " ";
        case 13: result += a++ + " ";
        case 14: result += a++ + " ";
        case 15: result += a++ + " ";

    }
    resultRow.innerHTML = result;


    function viewRow_rec(num) {
        if (num > 15) return "";
        return num + " " + viewRow_rec(++num);
    }

}

function clearRow() {
    var resultDiv = document.getElementById("resultRow");
    resultDiv.innerHTML = "";
    var resultRowRec = document.getElementById("resultRowRec");
    resultRowRec.innerHTML = "";
}


// п.5-6
// 5-6 
// Функции с арифметическими операциями

function operationMath() {
    var a = document.getElementById("varAmath").value;
    var b = document.getElementById("varBmath").value;
    var operation = document.getElementById("varOperMath").value;
    var resultMath = document.getElementById("resultMath");
    a = parseInt(a);
    b = parseInt(b);
    // console.log(a, operation, b);
    resultMath.innerHTML = mathOperation(a, b, operation);

    function sum(a = 0, b = 0) {
        return a + b;
    }

    function subtract(a = 0, b = 0) {
        return a - b;
    }

    function mutliple1(a = 0, b = 0) {
        return a * b;
    }

    function divide(a = 0, b = 1) {
        return b == 0 ? "деление на 0!" : (a / b).toFixed(3);
    }

    function mathOperation(a = 0, b = 0, operation) {
        switch (operation) {
            case "+":
                return sum(a, b);
                break;
            case "-":
                return subtract(a, b);
                break;
            case "*":
                return mutliple1(a, b);
                break;
            case "/":
                return divide(a, b);
                break;
            default:
                return "Неверный оператор!";
                break;
        }
    }


}

function clearMath() {
    var resultMath = document.getElementById("resultMath");
    resultMath.innerHTML = "";
    // var resultOper = document.getElementById("varOperMath");
    // resultOper.innerHTML = "+";

}


// п.7
// 7
//Сравнение null и 0

function checkNull() {

    // Согласно спецификации JS null!=0. null==0 только при ручном пользовательском приведении
    var resultDiv = document.getElementById("checkNullId");
    var result = "(null == 0?) - " + (null == 0)
        + " // (Number(null) == 0?) - " + (Number(null) == 0);
    resultDiv.innerHTML = result;
}

// п.8
// 8
//рекурсивная функция возведения в степень

function powerFunc() {
    var val = document.getElementById("val").value;
    var pow = document.getElementById("pow").value;
    var powerDiv = document.getElementById("powerId");
    // alert("5^3=" + power(5, 3));
    powerDiv.innerHTML = power(val, pow);
    function power(val, pow) {

        if (pow < 0) {
            return "Степень меньше 0!";
        }
        if (pow == 0) {
            return 1;
        }
        if (pow == 1) {
            return val;
        }
        return val * power(val, pow - 1);

    }
}


// Домашння работа №1
// *************************

// п.1
function tempFunc() {
    var celsiumTemp = document.getElementById("celsiumId").value;
    var farengateDiv = document.getElementById("farengateId");
    var farengateTemp = Math.round((9 / 5) * celsiumTemp + 32);
    console.log("C=" + celsiumTemp + " F=" + farengateTemp);
    farengateDiv.innerHTML = farengateTemp;

}

function tempClear() {
    var farengateDiv = document.getElementById("farengateId");
    farengateDiv.innerHTML = '';
}

// п.2
function varChange() {
    var var1 = document.getElementById("var1");
    var var2 = document.getElementById("var2");
    var a = +var1.value;
    var b = +var2.value;
    console.log("до: a=" + a + " b=" + b);
    a = a + b - (b = a);
    console.log("после: a=" + a + " b=" + b);
    var1.value = a;
    var2.value = b;

}

// п.3
function varCopy() {
    var adminEl = document.getElementById("adminId");
    var nameEl = document.getElementById("nameId");
    var admin, name;
    name = nameEl.value;
    console.log("name=" + name);
    admin = name;
    console.log("admin=" + admin);
    adminEl.innerHTML = admin;
}

function adminClear() {
    var farengateDiv = document.getElementById("adminId");
    farengateDiv.innerHTML = '';
}

// п.4
// Проверка моего ответа
function checkFunc() {
    var outpt = document.getElementById("checkId");
    var result = 1000 + "108";//число преобразуется в строку, а сложение - в конкатенацию
    console.log(result);
    outpt.innerHTML = result;
}

// п.5
// async и defer тега script изучены. Краткое описание в index.html




// Работа меню для мобильной версии
var buttonHamb = document.getElementById("hamburger");
buttonHamb.onclick = function () {
    var menu = document.getElementById("mainMenu");
    menu.classList.toggle("mainMenuOpen");
    buttonHamb.classList.toggle("open");
}







