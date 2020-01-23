var numOne = 0;

var numTwo = 0;

var operatorUsed = "";

var result = 0;

var displayText = "";

var numValue = "";

var equalsPressed = false;



// keyboard support for 0-9

var digitKeys = Array.from(document.querySelectorAll(".digit"));

document.addEventListener("keydown", e => {

    var keyPressed = "";

    if (e.keyCode > 47 && e.keyCode < 58) {

        keyPressed = Number(String.fromCharCode(e.keyCode));

    } else {

        return;

    }

    console.log(keyPressed);

    display(keyPressed);

})



// update display when press a number on screen

var digits = Array.from(document.querySelectorAll(".digit"));

digits.forEach(digit => digit.addEventListener("click", e => {

    display(e.target.value);

}))





// all clear event listener

var clearButton = document.querySelector(".all-clear");

clearButton.addEventListener("click", e => {

    allClear();

})



// equals event listener

var equalsButton = document.querySelector(".equals");

equalsButton.addEventListener("click", e => {

    equals();

})



// press return for equals

document.addEventListener("keydown", e => {

    if (e.keyCode === 13) {

        e.preventDefault();

        equals();

    }})



// operator keyboard support

document.addEventListener("keydown", e => {

    var operatorPressed = "";

    if (e.key === 'Shift') {

        e.preventDefault();

    }

    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {

        if (e.key === '*') {

            operatorPressed = '*';

            sliceEight();

        } else {

            operatorPressed = e.key;

        }

    } else {

            return;

    }

    useOperators(operatorPressed);

})



// operator buttons event listener

var operators = Array.from(document.querySelectorAll(".operator"));

operators.forEach(operator => operator.addEventListener("click", e => {

    useOperators(operator.value);

}))



// backspace button event listener

var backspaceButton = document.querySelector(".backspace");

backspaceButton.addEventListener("click", e => {

    backSpace();

})



//backspace key event listener

document.addEventListener("keydown", e => {

    if (e.key === "Backspace") {

        backSpace();

    }})



function useOperators(operatorChosen) { 

    // debugger;

if (equalsPressed === true) {

    chooseOperator(operatorChosen);

    numTwo = Number(displayText);

}

else if (numTwo === 0) {

    numOne = Number(displayText);

    numTwo = 1;

    chooseOperator(operatorChosen);

}

else {

    numTwo = Number(displayText);

    result = operate(operatorUsed, numOne, numTwo);

    displayText = "";

    numOne = result;

    chooseOperator(operatorChosen);

}

console.log(`result is: ${result}`);

console.log(`numOne is: ${numOne}`);

console.log(`numTwo is: ${numTwo}`);

console.log(`operatorUsed is: ${operatorUsed}`);

console.log(`displayText is: ${displayText}`);

console.log(`equalsPressed is: ${equalsPressed}`)

}



// function to store operator pressed

function chooseOperator(operator) {

    switch (operator) {

        case "+":

            displayText = "+";

            operatorUsed = "add";

            break;

        case "-":

            displayText = "-";

            operatorUsed = "subtract";

            break;

        case "*":

            displayText = "×";

            operatorUsed = "multiply";

            break;

        case "/":

            displayText = "÷";

            operatorUsed = "divide";

            break;

    }

    document.getElementById("calc-screen").value = displayText;

    displayText = "";

}



function equals() {

    if (operatorUsed === "") {

        return;

    }



    if (equalsPressed === false && numTwo === 0) {

        return;

    }

    numTwo = Number(displayText);

    result = operate(operatorUsed, numOne, numTwo);

    // if (result % 1 !== 0) {

    //     result = Number.parseFloat(result).toFixed(6);

    // }

    if (operatorUsed === "divide" && numTwo === 0) {

        allClear();

        alert("I don't think so");

        return;

    }

    // result = Number.parseFloat(operate(operatorUsed, numOne, numTwo)).toFixed(8);

    document.getElementById("calc-screen").value = result;

    numOne = result;

    operatorUsed = "";

    numTwo = "0";

    equalsPressed = true;

}



function backSpace() {

    if (displayText === "" && result === 0 && operatorUsed !== "") {

        displayText = numOne;

        numTwo = 0;

        document.getElementById("calc-screen").value = displayText;

        console.log(displayText);

    } else {

        displayText = displayText.toString().slice(0, -1);

        document.getElementById("calc-screen").value = displayText;

    }

}



// take off the 8 when Shift+8 is pressed for asterisk

function sliceEight() {

    displayText = Number(displayText.toString().slice(0, -1));

    console.log(`displayText is ${displayText}`)

}



// function add ([...args]) {

//     var added = 0;

//     args.forEach(arg => {

//         added = added + arg;

//     });

// 	return added;

// }





function add (a, b) {

    return (a + b);

}



// function subtract ([...args]) {

//     var subtracted = 0;

//     args.forEach(arg => {

//         subtracted = subtracted - arg;

//     });

// 	return subtracted;

// }



function subtract (a, b) {

    return a - b;

}



// function multiply ([...args]) {

// 	var multiplied = 1;

// 	args.forEach(arg => {

// 		multiplied = multiplied * arg;

// 	});

// 	return multiplied;

// }



function multiply (a, b) {

    return a * b;

}



function divide (a, b) {

    return a / b;

}



function operate (operator, numOne, numTwo) {

    switch (operator) {

        case "add":

            return add(numOne, numTwo);

        case "subtract":

            return subtract(numOne, numTwo);

        case "multiply":

            return multiply(numOne, numTwo);

        case "divide":

            return divide(numOne, numTwo);

    }

}



function display(buttonValue) {

    // if (equalsPressed === true && result !== 0 && numTwo !== 0) {

    //     allClear();

    // }

    displayText = displayText + buttonValue;

    document.getElementById("calc-screen").value = displayText;

    console.log(displayText);

    return displayText;

}



function allClear() {

    document.getElementById("calc-screen").value = 0;

    displayText = "";

    numOne = 0;

    numTwo = 0;

    result = 0;

    operatorUsed = "";

    equalsPressed = false;

    console.log(displayText, numOne, numTwo, result);

}