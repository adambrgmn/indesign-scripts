class Loadbar {
  constructor(total, title) {
    this.window = new Window('window', title || 'Processing...', undefined, {
      independent: true,
    });

    this.window.frameLocation = [600, 500];
    this.window.label = this.window.add(
      'statictext',
      [15, 15, 250, 35],
      'Processing',
    );
    this.window.tracker = this.window.add(
      'statictext',
      [15, 15, 250, 35],
      '0 of 0',
    );
    this.window.prog = this.window.add(
      'progressbar',
      [15, 15, 250, 35],
      0,
      total,
    );
    this.total = total;
  }

  show = () => this.window.show();
  hide = () => this.window.hide();
  close = () => this.window.close();

  update = value => {
    this.window.prog.value = value;
    this.window.tracker.text = `${value} of ${this.total}`;
  };

  label = label => {
    this.window.label.text = label;
  };
}

export { Loadbar as default };
