class Grid {
  constructor() {
    this.gridArr = [];
    this.makeGrid();
  }

  makeGrid() {
    for (let posY = 0; posY < 6; posY++) {
      let rowDots = [];
      for (let posX = 0; posX < 6; posX++) {
        let dot = new Dot({ posX, posY });
        rowDots.push(dot);
      }
      this.gridArr.push(rowDots);
    }
  }

  drawGrid(ctx) {
    this.dotArea = ctx.canvas.offsetWidth / this.gridArr.length;
    this.gridArr.forEach(rowDots => (
      rowDots.forEach( dot => dot.drawDot( ctx, this.dotArea ))
    ));
  }

}
