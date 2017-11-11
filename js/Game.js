class Game {
  constructor(canvas) {
    this.grid = new Grid();
    this.ctx = canvas.getContext('2d');
    this.canvasX = canvas.offsetWidth;
    this.canvasY = canvas.offsetHeight;
    this.findMousePos();
  }

  begin() {
    const run = () => {
      this.render();
      window.requestAnimationFrame(run);
    }
    run();
    this.checkForLinks();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
    this.grid.drawGrid(this.ctx, this.mousePos);
  }

  checkForLinks() {
    this.ctx.canvas.addEventListener('mousedown', () => {
      this.activeMove = true;
      this.grid.startLink(this.mousePos);
    });
    window.addEventListener('mouseup', () => {
      this.activeMove = false;
      this.grid.endLink();
    });
  }

  findMousePos() {
    this.mousePos = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const x = e.clientX - this.ctx.canvas.offsetLeft;
      const y = e.clientY - this.ctx.canvas.offsetTop;
      this.mousePos = { x, y };
    });
  }

}
