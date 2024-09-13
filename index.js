const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let signIdentify = zeroOrCross();
let fields = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let fieldsCounter = 0;
let isGameFinished = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    const fieldsCount = dimension ** 2;
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j, fieldsCount, dimension));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function zeroOrCross() {
    let name = 'O';
    return function changeSign() {
        return name === 'O'? name = 'X': name = 'O';
    }
}

function cellClickHandler(row, col, fieldsCount, dimension) {
    let field = findCell(row, col).textContent;

    if(isGameFinished) return;
  
    if (field === ' ') {
        let sign = signIdentify();
        renderSymbolInCell(sign, row, col);
        fields[row][col] = sign;
        fieldsCounter += 1;
        isWinner(dimension);
    }

    if (fieldsCounter === fieldsCount && !isGameFinished) setTimeout(() => {
        alert('Победила дружба');
      }, "100");
}

function changeColor(j, i, mode) {
    switch (mode) {
        case 'horizontal':
            findCell(j, i).style.color = 'red';
            findCell(j, i + 1).style.color = 'red';
            findCell(j, i + 2).style.color = 'red';
            break;

        case 'vertical':
            findCell(j, i).style.color = 'red';
            findCell(j + 1, i).style.color = 'red';
            findCell(j + 2, i).style.color = 'red';
            break;

        case 'downDiagonal':
            findCell(j, i).style.color = 'red';
            findCell(j + 1, i + 1).style.color = 'red';
            findCell(j + 2, i + 2).style.color = 'red';
            break;

        case 'uppDiagonal':
            findCell(j + 2, i).style.color = 'red';
            findCell(j + 1, i + 1).style.color = 'red';
            findCell(j, i + 2).style.color = 'red';
            break;
    }

    isGameFinished = true;
}

function isWinner(dimension) {
    for (let j = 0; j < dimension; j++) {
        for (let i = 0; i < dimension; i++) {
            if (i < dimension - 2 && fields[j][i] === fields[j][i + 1] && fields[j][i] === fields[j][i + 2] && fields[j][i] !== ' ') changeColor(j, i, 'horizontal');
            if (j < dimension - 2 && fields[j][i] === fields[j + 1][i] && fields[j][i] === fields[j + 2][i] && fields[j][i] !== ' ') changeColor(j, i, 'vertical');
            if ( i < dimension - 2 && j < dimension - 2 && fields[j][i] === fields[j + 1][i + 1] && fields[j][i] === fields[j + 2][i + 2] && fields[j][i] !== ' ') changeColor(j, i, 'downDiagonal');
            if (i < dimension - 2 && j < dimension - 2 && fields[j + 2][i] === fields[j + 1][i + 1] && fields[j + 2][i] === fields[j][i + 2] && fields[j + 2][i] !== ' ') changeColor(j, i, 'uppDiagonal');
            }
        }
    }

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    fields = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    fieldsCounter = 0;
    isGameFinished = false;
    renderGrid(3);
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
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

function clickOnCell(row, col) {
    findCell(row, col).click();
}
