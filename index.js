const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let signIdentify = zeroOrCross();
const fields = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let fieldsCounter = 0;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    const fieldsCount = dimension ** 2;
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j, fieldsCount));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function zeroOrCross() {
    let name = 'O';
    return function changeSign() {
        name = name === 'O'?  'X': 'O';
        return name; 
    }   
}

function cellClickHandler (row, col, fieldsCount) {
    // Пиши код тут
    let field = fields[row][col];
    if(field === ' '){
        let sign = signIdentify();
        renderSymbolInCell(sign, row, col);
        fields[row][col] = sign;
        fieldsCounter += 1
        isWinner();

        if (fieldsCounter === fieldsCount){
            alert('Победила дружба');
        }

    }
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function changeColor(j, i, mode){
    const trList = container.querySelectorAll('tr');

    switch(mode){
        case 'horizontal':
            trList[j].querySelectorAll('td')[i].style.color = 'red';
            trList[j].querySelectorAll('td')[i + 1].style.color = 'red';
            trList[j].querySelectorAll('td')[i + 2].style.color = 'red';
            break;

        case 'vertical':
            trList[j].querySelectorAll('td')[i].style.color = 'red';
            trList[j + 1].querySelectorAll('td')[i].style.color = 'red';
            trList[j + 2].querySelectorAll('td')[i].style.color = 'red';
            break;

        case 'downDiagonal':
            trList[j].querySelectorAll('td')[i].style.color = 'red';
            trList[j + 1].querySelectorAll('td')[i + 1].style.color = 'red';
            trList[j + 2].querySelectorAll('td')[i + 2].style.color = 'red';
            break;

        case 'uppDiagonal':
            trList[j + 2].querySelectorAll('td')[i].style.color = 'red';
            trList[j + 1].querySelectorAll('td')[i + 1].style.color = 'red';
            trList[j].querySelectorAll('td')[i + 2].style.color = 'red';
            break;
    }
    
}

function isWinner(){
    for (let j = 0; j < fields.length; j++){
        for(let i = 0; i < fields.length; i++){
            if (i < fields.length - 2 && fields[j][i] === fields[j][i + 1] && fields[j][i] === fields[j][i + 2] && fields[j][i] !== ' ') changeColor(j, i, 'horizontal');
            if (j < fields.length - 2 && fields[j][i] === fields[j + 1][i] && fields[j][i] === fields[j + 2][i] && fields[j][i] !== ' ') changeColor(j, i, 'vertical');
            if ( i < fields.length - 2 && j < fields.length - 2 && fields[j][i] === fields[j + 1][i + 1] && fields[j][i] === fields[j + 2][i + 2] && fields[j][i] !== ' ') changeColor(j, i, 'downDiagonal');
            if (i < fields.length - 2 && j < fields.length - 2 && fields[j + 2][i] === fields[j + 1][i + 1] && fields[j + 2][i] === fields[j][i + 2] && fields[j + 2][i] !== ' ') changeColor(j, i, 'uppDiagonal');
        }
    }
    
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
