// Домашння работа №2
// *************************

// п.1
// 1. Результаты выполнения операторов
function operatorsTest() {
    var result="";
    var a = 1, b = 1, c, d;
    c = ++a; result+=("Шаг1 c=" + c);           // 2. Сначала выполняется префиксный инкрменент ++a, a = 2, потом - присваивание с = 2.
    d = b++; result+=("/ Шаг2 d=" + d);           // 1. Инкремент - в постфиксе, поэтому сначала выполняется присвоение d = 1, а потом - инкремент b++, b = 2.
    c = (2+ ++a); result+=("/ Шаг3 c=" + c);      // 5. Сначала выполняется префиксный инкемент ++a, a = 3, как более приоритетный, чем сложение, затем сложение (2+3), затем присвоение c = 5.
    d = (2 + b++); result+=("/ Шаг4 d=" + d);     // 4. Сначала выполняется сложение (2 + b), (4), потом постфиксный инкремент b++, b = 3. d = 4.
    result+=("/ Шаг5 a=" + a);                    // 3. Выводится a, который на третьем шаге стал a = 3.
    result+=("/ Шаг6 b=" + b);                    // 3. Выводится a, который на четвертом шаге стал b = 3.
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
    var operation,result;
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


function viewRow(){
    var a = document.getElementById("varAforRow").value;
    a = parseInt(a);
    var resultRow = document.getElementById("resultRow");
    var resultRowRec = document.getElementById("resultRowRec");
    
    
    if ((a < 0) || (a > 15)) {
        var answer="Введите а от 0 до 15"
        resultRow.innerHTML = answer;
        resultRowRec.innerHTML = answer;
        return;
    }
    resultRowRec.innerHTML = viewRow_rec(a);
    
    var result = "";
    switch (a) {
        case 0: result += a++ + " ";
        case 1: result += a++ + " "; 
        case 2: result += a++ +" ";
        case 3: result += a++ +" ";
        case 4: result += a++ +" ";
        case 5: result += a++ +" ";
        case 6: result += a++ +" ";
        case 7: result += a++ +" ";
        case 8: result += a++ +" ";
        case 9: result += a++ +" ";
        case 10: result += a++ +" ";
        case 11: result += a++ +" ";
        case 12: result += a++ +" ";
        case 13: result += a++ +" ";
        case 14: result += a++ +" ";
        case 15: result += a++ +" ";
        
    }
    resultRow.innerHTML = result;
       
    
    function viewRow_rec(num) {
        if (num > 15) return "";
        return num+" "+viewRow_rec(++num);
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
    var resultMath= document.getElementById("resultMath");
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

    function mutliple1(a=0,b=0) {
        return a * b;
    }

    function divide(a = 0, b = 1) {
        return b==0? "деление на 0!" : (a / b).toFixed(3);
    }

    function mathOperation(a = 0, b = 0, operation) {
        switch (operation) {
            case "+":
                return sum(a,b);
                break;
            case "-":
                return subtract(a,b);
                break;
            case "*":
                return mutliple1(a,b);
                break;
            case "/":
                return divide(a,b);
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