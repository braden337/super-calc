class Calculator {
  x = 0;
  x = 0;
  history = [];

  constructor(form) {
    this.form = form;
    this.output = form.querySelector('pre');
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', this.calculate.bind(this));
  }

  add() {
    return this.x + this.y;
  }

  multiply() {
    return this.x * this.y;
  }

  power() {
    return new Array(this.y).fill(this.x).reduce((product, n) => product * n, 1);
  }

  render() {
    this.output.innerText = this.history.join('\n');
    this.output.scrollTop = this.output.scrollHeight;
  }

  calculate() {
    const data = new FormData(this.form);

    const operation = data.get('operation');
    const x = data.get('x');
    const y = data.get('y');

    if ([x, y].filter(Boolean).length == 2) {
      this.x = Number(x);
      this.y = Number(y);

      let result = this[operation]();
      const notation = result.toString().length > 16 ? 'scientific' : 'standard';

      result = new Intl.NumberFormat('en-US', {
        notation,
      }).format(result);

      this.history.push(result);
      this.render();
    }
  }
}

new Calculator(document.querySelector('form#calculator'));
