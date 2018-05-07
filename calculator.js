// Konstansok

const STATUS_ADDNUM = 'addnum';
const STATUS_DECIMAL = 'decimal';
const STATUS_OPERAND = 'operand';
const STATUS_DONE = 'done';

// Általános változók

let numberResult = null;
let numberFormula = null;
let decimalResult = [];
let operand = null;
let status = STATUS_ADDNUM;
let formular = [];
let result = 0;
let lastNumber = 0;
let decimals = 1;
let power = 0;
let decimal = 0;

// Elemek összegyűjtése

// Kijelzők
let displayNumberFormula = document.getElementById('displayNumberFormula');
let displayNumberResult = document.getElementById('displayNumberResult');

// Szám gombok
let button0 = document.getElementById('button0');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let button5 = document.getElementById('button5');
let button6 = document.getElementById('button6');
let button7 = document.getElementById('button7');
let button8 = document.getElementById('button8');
let button9 = document.getElementById('button9');


// Művelet gombok
let buttonAdd = document.getElementById('buttonAdd');
let buttonMinus = document.getElementById('buttonMinus');
let buttonTimes = document.getElementById('buttonTimes');
let buttonDivide = document.getElementById('buttonDivide');

// Funkció gombok
let buttonEquals = document.getElementById('buttonEquals');
let buttonC = document.getElementById('buttonC');
let buttonDecimal = document.getElementById('buttonDecimal');

// Eseményre feliratkozások

button0.addEventListener('click', OnNumberClick);
button1.addEventListener('click', OnNumberClick);
button2.addEventListener('click', OnNumberClick);
button3.addEventListener('click', OnNumberClick);
button4.addEventListener('click', OnNumberClick);
button5.addEventListener('click', OnNumberClick);
button6.addEventListener('click', OnNumberClick);
button7.addEventListener('click', OnNumberClick);
button8.addEventListener('click', OnNumberClick);
button9.addEventListener('click', OnNumberClick);

buttonAdd.addEventListener('click', OnOperandClick);
buttonMinus.addEventListener('click', OnOperandClick);
buttonTimes.addEventListener('click', OnOperandClick);
buttonDivide.addEventListener('click', OnOperandClick);

buttonEquals.addEventListener('click', OnEqualClick);

buttonC.addEventListener('click', OnCClick);

buttonDecimal.addEventListener('click', OnDecimalClick);

// Reagálás szám gombokra
function OnNumberClick() {
    // Értékek összegyűjtése
    let currentButton = this;
    let currentNumber = +currentButton.innerText;
    let currentDecimal = currentButton.innerText;

    // Állapot elágazás
    switch (status) {

        case STATUS_ADDNUM:
            SetNumberResult(numberResult * 10 + currentNumber);
            break;

        case STATUS_DECIMAL:
            decimalResult.push(currentDecimal);
            displayNumberResult.innerText = numberResult + '.' + (decimalResult.join(''));
            decimal = (decimalResult.join(''));
            power = (decimalResult.join('')).length;
            power = -power;
            decimal = decimal * Math.pow(10, power);
            break;

        case STATUS_OPERAND:
            numberResult = null;
            SetNumberResult(numberResult * 10 + currentNumber);
            status = STATUS_ADDNUM;
            break;

        case STATUS_DONE:
            numberResult = null;
            SetOperand(null);
            SetNumberFormula(null);
            SetNumberResult(numberResult * 10 + currentNumber);
            status = STATUS_ADDNUM;
            break;
    }
}

// Reagálás művelet gombokra
function OnOperandClick() {
    // Értékek összegyűjtése
    let currentButton = this;
    let currentOperand = currentButton.innerText;

    // Állapot elágazás
    switch (status) {
        case STATUS_ADDNUM:
            formular.push(numberResult);
            formular.push(currentOperand);
            displayNumberFormula.innerText = formular.join(' ');
            result = eval(numberFormula + operand + numberResult);
            SetNumberResult(result);
            SetNumberFormula(numberResult);
            SetOperand(currentOperand);
            status = STATUS_OPERAND;
            break;

        case STATUS_DECIMAL:
            decimals = 1;
            numberResult = numberResult + decimal;
            formular.push(numberResult);
            formular.push(currentOperand);
            displayNumberFormula.innerText = formular.join(' ');
            result = eval(numberFormula + operand + numberResult);
            SetNumberResult(result);
            SetNumberFormula(numberResult);
            SetOperand(currentOperand);
            status = STATUS_OPERAND;
            decimal = 0;
            power = 0;
            decimalResult = [];
            
            break;

        case STATUS_OPERAND:
            decimals = 1;
            formular.pop();
            formular.push(currentOperand);
            displayNumberFormula.innerText = formular.join(' ');
            SetOperand(currentOperand);
            break;

        case STATUS_DONE:
            decimals = 1;
            formular.push(numberResult);
            formular.push(currentOperand);
            displayNumberFormula.innerText = formular.join(' ');
            SetNumberResult(numberResult);
            SetNumberFormula(numberResult);
            SetOperand(currentOperand);
            status = STATUS_OPERAND;
            break;
    }
}

// Reagálás C gombra
function OnCClick() {
    formular = [];
    SetNumberResult(0);
    SetOperand(null);
    SetNumberFormula(null);
    displayNumberFormula.innerText = null;
    decimal = 0;
    power = 0;
    decimalResult = [];
    status = STATUS_ADDNUM;
    decimals = 1;
}

// Reagálás = gombra
function OnEqualClick() {
    if (status == STATUS_DONE) {
        result = eval(numberResult + operand + lastNumber);
    } else {
        numberResult = numberResult + decimal;
        result = eval(numberFormula + operand + numberResult);
        lastNumber = numberResult;
        status = STATUS_DONE;
    }
    SetNumberResult(result);
    displayNumberFormula.innerText = null;
    formular = [];
    decimals = 1;
}

// Reagálás , gombra
function OnDecimalClick() {
    let currentButton = this;
    let currentDecimal = currentButton.innerText;
    switch (status) {
        case STATUS_ADDNUM:
            if (numberResult == null) { numberResult = 0 }
            displayNumberResult.innerText = numberResult + '.';
            status = STATUS_DECIMAL;
            break;

        case STATUS_DONE:
            SetNumberResult(0);
            SetOperand(null);
            SetNumberFormula(null);
            status = STATUS_DECIMAL;
            break;

        case STATUS_OPERAND:
            SetNumberResult(0);
            status = STATUS_DECIMAL;
            break;
    }
}

// Értékbeállító függvények
function SetNumberResult(value) {
    numberResult = value;
    displayNumberResult.innerText = value;
}

function SetNumberFormula(value) {
    numberFormula = value;
}

function SetOperand(value) {
    operand = value;
}
