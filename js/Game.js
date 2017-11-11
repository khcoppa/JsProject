class Game {
  constructor(canvas) {
    this.grid = new Grid();
    this.ctx = canvas.getContext('2d');
    this.canvasX = canvas.offsetWidth;
    this.canvasY = canvas.offsetHeight;
    this.findMousePos();
  }


  render() {
    this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
    this.grid.drawGrid(this.ctx, this.mousePos);
  }

  begin() {
    this.render();
    this.checkLinks();
    window.requestAnimationFrame(this.begin)
  }

  findMousePos() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      this.mousePos = { mouseX, mouseY };
    })
  }

  endLink() {
    this.activeMove = false;
    this.grid.endLink();
  }

  startMove() {
    this.activeMove = true;
    this.grid.startLink(this.cursorPos);
  }

  checkLinks() {
    this.ctx.canvas.addEventListener('mousedown', () => {
      this.startMove();
    });
    window.addEventListener('mouseup', () => {
      this.endLink();
    });
  }

}
