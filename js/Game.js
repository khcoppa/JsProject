class Game {
  constructor(canvas) {
    this.grid = new Grid();
    this.ctx = canvas.getContext('2d');
    this.canvasX = canvas.offsetWidth;
    this.canvasY = canvas.offsetHeight;
    this.mousePos = {};
    this.findMousePos();
    this.gameOver = false;
    this.begin = this.begin.bind(this);
    this.activeMove = false;
  }


  render() {
    this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
    this.grid.drawGrid(this.ctx, this.mousePos);
  }

  begin() {
    this.render();
    this.makeLinks();
    window.requestAnimationFrame(this.begin)
  }

  findMousePos() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      this.mousePos = { mouseX, mouseY };
    })
  }

  endMove() {
    this.activeMove = false;
  }

  makeLinks() {
    this.ctx.canvas.addEventListener('mousedown', (e) => {
      this.grid.startLink(this.mousePos);
      this.activeMove = true;
    });
    this.grid.continueLink(this.mousePos);
    window.addEventListener('mouseup', () => {
      this.endMove();
      this.grid.endLink();
    });
  }

}
