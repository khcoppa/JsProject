class Grid {
  constructor() {
    this.gridArr = [];
    this.numRows = 6;
    this.numCols = 6;
    this.makeGrid();
    this.links = [];
  }

  makeGrid() {
    for (let posY = 0; posY < this.numRows; posY++) {
      let rowDots = [];
      for (let posX = 0; posX < this.numCols; posX++) {
        let dot = new Dot({ posX, posY });
        rowDots.push(dot);
      }
      this.gridArr.push(rowDots);
    }
  }

  drawGrid(ctx, mousePos) {
    this.dotArea = ctx.canvas.offsetWidth / this.gridArr.length;
    this.gridArr.forEach(rowDots => (
      rowDots.forEach( dot => dot.drawDot( ctx, this.dotArea ))
    ));

    this.links.forEach(link => {
      link.drawLink(ctx, mousePos)
    });
  }

  checkForDot(mousePos) {
    for (let posY = 0; posY < this.numRows; posY++) {
      for (let posX = 0; posX < this.numCols; posX++) {
        let dot = this.gridArr[posX][posY];
        const dx = mousePos.mouseX - dot.canvasPos.canvasX;
        const dy = mousePos.mouseY - dot.canvasPos.canvasY;
        if ((dx * dx + dy * dy) <= (dot.radius * dot.radius)) {
          return dot;
        }
      }
    }
    return false;
  }

  startLink(mousePos) {
    const clickedDot = this.checkForDot(mousePos);
    if (clickedDot) {
      const link = new Link(clickedDot);
      this.links.push(link);
    }
  }

  endLink() {

  }

}
