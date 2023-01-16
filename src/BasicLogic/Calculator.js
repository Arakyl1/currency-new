export default class Calculator {
  static getSum (one, two, operator) {
    switch (operator) {
      case '*':
        return two * one
      case '/':
        return two / one
      case '-':
        return two - one
      case '+':
        return two + one
      case '%':
        return (two / 100) * one
    }
  }

  static getOpetator (value) {
    switch (value) {
      case 'xmark':
        return '*'
      case 'divide':
        return '/'
      case 'minus':
        return '-'
      case 'plus':
        return '+'
      case 'percent':
        return '%'
    }
  }

  static getAdditionalFunction (value, number) {
    switch (value) {
      case 'plus-minus':
        return number < 0 ? Math.abs(number) : -number
    }
  }
}
