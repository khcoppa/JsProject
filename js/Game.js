class Game {
  constructor(canvas) {
    this.grid = new Grid();
    this.ctx = canvas.getContext('2d');
    this.canvasX = canvas.offsetWidth;
    this.canvasY = canvas.offsetHeight;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
    this.grid.drawGrid(this.ctx);
  }

  begin() {
    this.render();
    this.makeLinks();
  }

  findMousePos(canvas, e) {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    return { mouseX, mouseY };
  }

  makeLinks() {
    this.ctx.canvas.addEventListener('mousedown', (e) => {
      this.grid.startLink(this.findMousePos(this.ctx.canvas, e));
    });
    window.addEventListener('mouseup', () => {
      this.grid.endLink();
    });
  }

}
