const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const numberKeys = calculator.querySelectorAll('.number');
const display = document.querySelector('.calculator__display')
const allButtons = document.querySelectorAll('button');


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
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}

document.onkeydown = function (e) {
    allButtons.forEach(function(button) {
        if (button.textContent === e.key) {
            console.log(e.key);
            console.log(button);
            
            const action = button.dataset.action;
            const keyContent = button.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType;
            
        }
    })
    
    }
/*
    function checkIfAction (action) {
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
    }
    */

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        display.style.fontSize = "4em";
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'divide' ||
            action === 'multiply'
            )
            {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
                
            if (firstValue && operator && previousKeyType !== 'operator') {
                    
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
                }

            key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action;
                    
            }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } if (previousKeyType === 'operator') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'clear') {
            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear';
            calculator.dataset.firstValue = '';
            
        }
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                if (firstValue == 0 || secondValue == 0 && operator === 'divide') {
                    alert("Please don't do that.\nDividing by zero is very traumatic for a calculator.")
                } else {
                    display.textContent = Math.round((calculate(firstValue, operator, secondValue) + Number.EPSILON) * 10000000) / 10000000;
                    }
                }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
        if (display.textContent.length > 10 && display.textContent.length < 17) {
            display.style.fontSize = "3em";
        } else if (display.textContent.length >= 17 && display.textContent.length < 25) {
            display.style.fontSize = "2em";
        } else if (display.textContent.length >= 25) {
            display.textContent = parseFloat(display.textContent);
        }

        Array.from(key.parentNode.children)
            .forEach(k => {
                k.classList.remove('is-depressed');
            }
                );
                //key.style.backgroundColor = "white";
        }
    });

