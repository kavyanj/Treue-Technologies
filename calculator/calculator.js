const previousOText = document.getElementById("previous-operand");
const currentOText = document.getElementById("current-operand");
const allClearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

class Calculator {
    constructor(previousOText, currentOText) {
      this.previousOText = previousOText
      this.currentOText = currentOText
      this.clear()
    }

    clear() {
      this.cOperand = ''
      this.pOperand = ''
      this.operation = undefined
    }

    delete() {
      this.cOperand = this.cOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
      if (number === '.' && this.cOperand.includes('.')) return
      this.cOperand = this.cOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
      if (this.cOperand === '') return
      if (this.pOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.pOperand = this.cOperand
      this.cOperand = ''
    }

    compute() {
      let computation
      const prev = parseFloat(this.pOperand)
      const current = parseFloat(this.cOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
        }
      this.cOperand = computation
      this.operation = undefined
      this.pOperand = ''
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    };

    updateDisplay() {
        this.currentOText.innerText =
        this.getDisplayNumber(this.cOperand)
        if (this.operation != null) {
            this.previousOText.innerText =
          `${this.getDisplayNumber(this.pOperand)} ${this.operation}`
        } else {
            this.previousOText.innerText = ''
        }
    };
};

const calculator = new Calculator(previousOText, currentOText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});