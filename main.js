// Домашння работа №2
// *************************

// п.1
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
// Проверка моего ответа
function checkFunc2() {
    var outpt = document.getElementById("checkId2");
    var a = 2;
    var x = 1 + (a *= 2);//Сначала выполняется умножение в скобках, затем - сложение
    console.log(x);
    outpt.innerHTML = x;
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