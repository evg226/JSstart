// Домашняя работа №5

// п.1 шахматная доска

function makeChessboard() {
    
    var chessBox;
    var chessCell;
    
    chessBox = document.createElement("div");;
    chessBox.classList.add("chess__box");
    activeHW.insertAdjacentElement("beforeend", chessBox);

    var column = "*hgfedcba*";
    for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 10; i++) {
            chessCell = document.createElement("div");
            chessCell.classList.add("chess__cell");
            
            if (j == 0 || j == 9) {
                chessCell.innerText = ((i != 0) && (i != 9)) ? column[i] : "";
                
            } else if (i == 0 || i == 9) {
                chessCell.innerText = j;
                
            } else {
                if (j % 2 == 0) {
                        if (i % 2 != 0) {
                            chessCell.classList.add("chess__cell_black");
                        }  
                    } else {
                        if (i % 2 == 0) {
                            chessCell.classList.add("chess__cell_black");
                        }  
                    }
                
                var figure = makeColor(j, i)+makeFigure(j, i);
                if (figure !== "") {
                    chessCell.classList.add(figure);
                }

                chessCell.innerHTML = "j=" + j + " i=" + i;
                
            }
            if ((j == 0 || (i == 9))) {
                chessCell.classList.add("chess__cell_rotated");
            }
            chessBox.insertAdjacentElement("beforeend", chessCell);
        }
        
    }

    buttons[1] = document.createElement("button");
    buttons[1].classList.add("homework__sub-button");
    buttons[1].onclick = fillLettersChess;
    buttons[1].innerHTML = "2. Заполнить буквами";
    activeHW.insertBefore(buttons[1], activeHW.children[1]);
    buttons[2] = document.createElement("button");
    buttons[2].classList.add("homework__sub-button");
    buttons[2].onclick = fillPictureChess;
    buttons[2].innerHTML = "3. Заполнить фугурами";
            
    activeHW.insertBefore(buttons[2], activeHW.children[2]);
}

// п.2.Заполнение шахматной доски буквами
function fillLettersChess() {
    
        

    var chessCell = document.getElementsByClassName("WL");
    for (var i = 0; i < chessCell.length;i++){
        // chessCell[i].innerHTML = ;
    }
    console.log(chessCell);
}

// п.3.Заполнение шахматной доски Фигурами
function fillPictureChess() {
    
}

// function makeFurureID(j, i) {
//     var result = "";
//     result = makeColor(j, i) + makeFigure(j, i);
//     return result;

    function makeColor(j,i) {
        if (j == 1 || j == 2) {
            return "W";
        } else if (j == 7 || j == 7) {
            return "B";
        } else {
            return "";
        }

    }

    function makeFigure(j,i){
        if (j==1||j==8){
            if (i == 1 || i == 8) return "L";
            if (i == 2 || i == 7) return "K";
            if (i == 3 || i == 6) return "S";
            if (i == 4) return "C";
            if (i == 5) return "F";
        } if (j == 2 || j == 7) {
            return "P";
        } else {
            return "";
        }
    }

// }