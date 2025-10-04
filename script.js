const calculator = document.querySelector('.main');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display'); 

// The display value begins with 0.
display.value = '0';

keys.addEventListener('click', e => {
    // Get the element of clicked button.
    const key = e.target;
    // Get the data-action type.
    const action = key.dataset.action;
    // Get the value of the button.
    const keyContent = key.textContent;
    // Get the present displayed number.
    const displayedNum = display.value;
    // Get the data-previousKeyType.    
    const previousKeyType = calculator.dataset.previousKeyType;

    // Assign Calculate function to variable.
    const calculate = (n1, operator, n2) => {
            let result = '';
            // Convert from string to float
            if(operator == "add") result = parseFloat(n1) + parseFloat(n2);
            if(operator == "subtract") result = parseFloat(n1) - parseFloat(n2);
            if(operator == "multiply") result = parseFloat(n1) * parseFloat(n2);
            if(operator == "divide") result = parseFloat(n1) / parseFloat(n2);

            return result;
        };

    if(e.target.matches("button")) {
        // Display Number
        if(!action) {
            if(displayedNum == '0' || previousKeyType == "operator") {
                display.value = keyContent;
            } else {
                display.value = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }
        // Display Decimal && Edge case: When we hit the decimal key continously.
        if(action == "decimal" && !displayedNum.includes('.')) {
            display.value = displayedNum + '.';
            if(calculator.dataset.previousKeyType == "operator") {
                display.value = '0.'
            }
            calculator.dataset.previousKeyType = "decimal";
        }
        // Display Operator
        if(action == "add" || action == "subtract" || action == "multiply" || action == "divide" || action == "clear") {
            /* Animation css for Operator Button
            // key.parentNode = div<class="key"> => key.parentNode.children = <button> */
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
            key.classList.add('is-depressed');

            // Edge Case when click an Operator after secondValue.
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            if (firstValue && operator) {
                display.value = calculate(firstValue, operator, secondValue);
            }

            
            /* Just notice that this is an Operator
            // Add custom attribute: <div class="calculator" data-previous-key-type="operator"> */
            calculator.dataset.previousKeyType = "operator";

            // Store the firstValue before click Operator Button
            calculator.dataset.firstValue = displayedNum;
            // Store the Operator's action 
            calculator.dataset.operator = action;
        }

        // Clear Button
        if (action == 'clear') {
            display.value = '0';
            calculator.dataset.previousKeyType = 'clear'
        }

        // Display Result
        if(action == "calculate") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            
            display.value = calculate(firstValue, operator, secondValue);
        }
    }
});