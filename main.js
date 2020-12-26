const calculator = document.querySelector('.calculator');
const equal = document.querySelector('key--equal');
const keys = calculator.querySelector('.calculator__keys');
const numberKeys = calculator.querySelectorAll('.number');
const display = document.querySelector('.calculator__display')
const allButtons = document.querySelectorAll('button');


keys.addEventListener('mousedown', e => {

        if (e.target.matches('button')) {
            display.style.fontSize = "4em";
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType;
            if (action === 'clear') {
                console.log('clear');
            }
            operateCalculator(e, key, keyContent, displayedNum, action, previousKeyType);
            
            Array.from(key.parentNode.children)
                .forEach(k => {
                    k.classList.remove('is-depressed');
                }
                    );
                    //key.style.backgroundColor = "white";
            }
        
        });

document.onkeydown = function (e) {

    allButtons.forEach(function(button) {
        if (button.dataset.key === e.key) {
            display.style.fontSize = "4em";
            const key = button;
            const action = button.dataset.action;
            const keyContent = button.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType;

            operateCalculator(e, key, keyContent, displayedNum, action, previousKeyType);

            Array.from(key.parentNode.children)
                .forEach(k => {
                    k.classList.remove('is-depressed');
                }
                    );
                    //key.style.backgroundColor = "white";
            }
            
    });
};

function operateCalculator (e, key, keyContent, displayedNum, action, previousKeyType) {
    if (action === 'clear') {
        clearDisplay();
    }
    if (!action) {
        displayNumber(keyContent, displayedNum, previousKeyType);
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'divide' ||
        action === 'multiply'
        )
        {
        evalOperation(displayedNum, key, previousKeyType, action);
        }
    if (action === 'decimal') {
        addDecimal(displayedNum, previousKeyType)
    }

    if (action === 'calculate') {
        invokeCalculation(displayedNum, previousKeyType);
    }


    refactorDigitSize();
}


function displayNumber (keyContent, displayedNum, previousKeyType) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
        if (previousKeyType === 'calculate') {
            calculator.dataset.previousOperatorType = 'calculate';
        }
};

function evalOperation (displayedNum, key, previousKeyType, action) {
        const previousOperatorType = calculator.dataset.previousOperatorType;
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                
            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;

            calculator.dataset.firstValue = calcValue;
        }  else {

            calculator.dataset.firstValue = displayedNum;
        }


        key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;

};

function addDecimal (displayedNum, previousKeyType) {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        } if (previousKeyType === 'operator') {
            display.textContent = '0.';
        }
        calculator.dataset.previousKeyType = 'decimal';
};

function toggleNegative(displayedNum){
    if (!displayedNum.includes('-')) {
        display.textContent = '-' + displayedNum;
    } else {
        display.textContent = displayedNum.substring(1)
    }
    calculator.dataset.previousKeyType = 'negative';
}

function clearDisplay () {
        display.textContent = '0';
        calculator.dataset.previousKeyType = 'clear';
        calculator.dataset.firstValue = '';
};

function invokeCalculation (displayedNum, previousKeyType) {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;
    
    if (firstValue) {
        if (previousKeyType === 'calculate') {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
        }
            display.textContent = Math.round((calculate(firstValue, operator, secondValue) + Number.EPSILON) * 10000000) / 10000000;
        }
    calculator.dataset.modValue = secondValue;
    calculator.dataset.previousKeyType = 'calculate';
    

}

function refactorDigitSize () {
    if (display.textContent.length > 10 && display.textContent.length < 16) {
        display.style.fontSize = "3em";
    } else if (display.textContent.length >= 16 && display.textContent.length < 24) {
        display.style.fontSize = "2em";
    } else if (display.textContent.length >= 24) {
        display.textContent = parseFloat(display.textContent);
    }
}

const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    }
    if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    }
    if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    }
    if (operator === 'divide') {
        if (n1 == 0 || n2 == 0) {
            alert("Please don't do that.\nDividing by zero is very traumatic for a calculator.")
        } else {
        result = parseFloat(n1) / parseFloat(n2);
        }
    }
    return result;
}

