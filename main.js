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
        if (isSimple(index)){
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
function costCart(){
     var cart = [
        { nameItem: "Куртка", price: 130, quantity: 2 },
        { nameItem: "Брюки", price: 90, quantity: 3 },
        { nameItem: "Галстук",price: 30,quantity: 2}
     ]
    var resultISDiv = document.getElementById("resultIS");
    resultISDiv.innerHTML= countBasketPrice(cart);

    function countBasketPrice(cart) {
        // var result=0;
        // for (var index = 0; index < cart.length; index++){
        //     console.log(cart[index].price);
        //     result += cart[index].price;
        // }
        // console.log(result);
        
        // console.log("_________");
        // var result=0;
        // for (var item of cart){
        //     console.log(item.price);
        //     result += item.price;
        // }
        // console.log(result);
        
        // console.log("_________");
        // var result=0;
        // for (var index in cart){
        //     console.log(cart[index].price);
        //     result += cart[index].price;
        // }
        // console.log(result);
        
        // console.log("_________");
        var result = 0;
        cart.forEach(function (item,index) {
            console.log((index+1) +"-ая цена: "+item.price+ " или " +cart[index].price)
            result += item.price;
        });
        // console.log(result);
        return result;
    }
}

// п.4
// Вывод чисел от 0 до 9

function forNotBody(){
    forId = document.getElementById("forId");
    var index = 0,result=[];
    for (;;) {
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
    for (index = 0; index < 20; index++){
        console.log(result += "X");
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