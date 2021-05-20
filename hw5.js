// Домашняя работа №5

// п.1 шахматная доска

function makeChessboard() {
    
    var chessBox; //блок для доски 
    var chessCell; // блок для ячейки доски
    chessBox = document.createElement("div");;
    chessBox.classList.add("chess__box");
    activeHW.insertAdjacentElement("beforeend", chessBox);//размещаем доску на странице
    var column = "*hgfedcba*";//массив с названиями столбцов
    for (var j = 0; j < 10; j++) { //j-строки
        for (var i = 0; i < 10; i++) {// i-столбцы
            chessCell = document.createElement("div");
            chessCell.classList.add("chess__cell");
            if (i == 0 || i == 9) {
                chessCell.innerText = (j == 0 || j == 9) ? "" : j; //размещаем номера строк в крайние стоблцы 
            } else if (j == 0 || j == 9) { //размещаем имена столбцов в крайние строки
                chessCell.innerText = column[i]; //имена берем из массива строк
            } else { // размещаем оставшиеся ячейки (столбцы и строки которых не являются крайними)
                if (j % 2 == 0) { //четные строки j и нечетные столбцы i - делаем черными
                    if (i % 2 != 0) {
                        chessCell.classList.add("chess__cell_black");
                    }
                } else { //нечетные строки j и четные столбцы i - также делаем черными
                    if (i % 2 == 0) {
                        chessCell.classList.add("chess__cell_black");
                    }
                }
                var figureColor = makeColor(j);
                var figureLetter = figureColor + makeFigure(j, i)[0];// в переменную размещаем название фигуры /(цвет)+(название)
                var figure = (figureColor == "Бел<br>") ? makeFigure(j, i)[1] : makeFigure(j, i)[2];// в переменную размещаем html-код фигуры 
                if (figureLetter !== "") {
                    chessCell.setAttribute("chessFigureLetter", figureLetter);//создаем атрибут для ячейки имеющей фигуру
                    chessCell.setAttribute("chessFigure", figure);//создаем атрибут для ячейки имеющей фигуру
                }
                // chessCell.innerHTML = "j=" + j + " i=" + i;
            }
            if ((j == 0 || (i == 9))) { //выполняем переворот названия стоблца и номера строки
                chessCell.classList.add("chess__cell_rotated");
            }
            chessBox.insertAdjacentElement("beforeend", chessCell);//размещаем ячейку
        }
        
    }
    //создаем кнопки для заданий п.2. и п.3.
    
    var mainButton = document.getElementById("mainButton");
    mainButton.disabled = true;
    mainButton.innerHTML = "1. Доска сформирована!";
    activeHW.insertBefore(makeButton(fillLettersChess, "2. Заполнить буквами"), activeHW.children[1]);
    activeHW.insertBefore(makeButton(fillFigureChess, "3. Заполнить фугурами"), activeHW.children[2]);
}

function makeButton(func,innerHTML) {
    var button = document.createElement("button");
    button.classList.add("homework__sub-button");
    button.classList.add("homework__sub-button-5");
    button.onclick = func;
    button.innerHTML = innerHTML;
    return button;
}

// п.2.Заполнение шахматной доски буквами
function fillLettersChess() {
    var chessCellFigure = document.querySelectorAll("[chessfigureLetter]");//Выбираем блоки с атрибутом, обозначающим наличие фигуры
    for (var i = 0; i < chessCellFigure.length; i++){
        chessCellFigure[i].classList.remove("chess__cell_figure-font");
        chessCellFigure[i].innerHTML = chessCellFigure[i].getAttribute("chessFigureLetter");// помещаем этот атрибут в текст блока
    }
    
}

// п.3.Заполнение шахматной доски Фигурами
function fillFigureChess() {
    var chessCellFigure = document.querySelectorAll("[chessfigure]");//Выбираем блоки с атрибутом, обозначающим наличие фигуры
    
    for (var i = 0; i < chessCellFigure.length; i++){
        chessCellFigure[i].classList.add("chess__cell_figure-font");
        chessCellFigure[i].innerHTML = chessCellFigure[i].getAttribute("chessFigure");// помещаем этот атрибут в текст блока
    }    
}

function makeColor(row) { //цвет фигуры в зависимости от строки
    if (row == 1 || row == 2) { 
        return "Бел<br>"; 
    } else if (row == 7 || row == 8) {
        return "Чер<br>";
    } else {
        return "";
    }
}

function makeFigure(row, column) { //вид фигуры в зависимости от столбца и строки
    if (row == 2 || row == 7) {
        return ["Пешка","&#9817;","&#9823;"];
    } else if (row == 1 || row == 8) {
        if (column == 1 || column == 8) return ["Ладья","&#9814;","&#9820;"];
        if (column == 2 || column == 7) return ["Конь", "&#9816;","&#9822;"];
        if (column == 3 || column == 6) return ["Слон", "&#9815;","&#9821;"];
        if (column == 4) return ["Король","&#9812;","&#9818;"];
        if (column == 5) return ["Ферзь","&#9813;","&#9819;"];
    } else {
        return ["","",""]; //ячейка без фигуры
    }
}

