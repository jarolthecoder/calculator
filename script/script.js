const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.calculator-buttons');
const display = document.querySelector('.calculator-screen');
let result = ''

// Operate function
const operate = (n1, operator, n2)=> {
    const firstNumb = parseFloat(n1);
    const secondNumb = parseFloat(n2);

    if(operator === 'add') {
        result = firstNumb + secondNumb;
    } else if (operator === 'subtract') {
        result = firstNumb - secondNumb;
    } else if (operator === 'multiply') {
        result = firstNumb * secondNumb;
    } else if (operator === 'divide') {
        result = firstNumb / secondNumb;
    }

    return result.toFixed(4);
};

// Calculator behavior for each key input
buttons.addEventListener('click', (k) => {

    if(k.target.matches('button')) {
        const key = k.target;
        const keyValue = key.textContent;
        const keyType =  key.dataset.type;
        const previousKeyType = calculator.dataset.previousKeyType;
        const keyAction = key.dataset.action;
        const displayValue = display.textContent;
    
        if(keyType === 'number') {
            if(displayValue === '0') { 
                display.textContent = keyValue; 
            } else if (previousKeyType === 'operator') { 
                display.textContent = keyValue;
            } else if (previousKeyType === 'equals') { 
                display.textContent = keyValue;
            } else {
                display.textContent = displayValue + keyValue;
            }  
        }

        let firstNumber = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondNumber = displayValue;
     
        if(keyType === 'operator') {
            if (firstNumber && operator && previousKeyType !== 'operator' && previousKeyType !== 'equal') {
                const calcValue = operate(firstNumber, operator, displayValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue; 
            }  else {
                calculator.dataset.firstValue = displayValue;
            }
            calculator.dataset.operator = keyAction;  
        }
        
        if (keyType === 'decimal') {
            if(!displayValue.includes('.')) {
                display.textContent = displayValue + '.'; 
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.';
            }
        }
        
        if(keyType === 'equal') {
            if(firstNumber) { 
                if (previousKeyType === 'equal') {
                    firstNumber = displayValue;
                    secondNumber = calculator.dataset.modifierValue;
                }
                display.textContent = operate(firstNumber, operator, secondNumber)
            }

            calculator.dataset.modifierValue = secondNumber; 
            console.log(firstNumber, operator, secondNumber);
            console.log( 'Total = ' + result);
        }

    
        if(keyType !== 'clear') {
            const clearButton = calculator.querySelector('[data-type=clear]');
            clearButton.textContent = 'CE';
        }

        if (keyType === 'clear') {
                if (key.textContent === 'AC') {
                    calculator.dataset.firstValue = '';
                    calculator.dataset.modValue = '';
                    calculator.dataset.operator = '';
                    calculator.dataset.previousKeyType = '';
                    calculator.dataset.modifierValue = '';
                } else {
                    key.textContent = 'AC';
                } 
                display.textContent = 0;   
        } 
    
       calculator.dataset.previousKeyType = keyType;
    }
});
