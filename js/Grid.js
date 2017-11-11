class Grid {
  constructor() {
    this.gridArr = [];
    this.numRows = 6;
    this.numCols = 6;
    this.makeGrid();
    this.linksArr = [];
    this.linkedDots = [];
    this.activeMove = false;
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

    if (this.activeMove) {
      this.continueLink(mousePos);
    }

    this.gridArr.forEach(rowDots => (
      rowDots.forEach( dot => dot.drawDot( ctx, this.dotArea ))
    ));

    this.linksArr.forEach(link => {
      link.drawLink(ctx, mousePos)
    });
  }

  checkForDot(mousePos) {
    for (let posY = 0; posY < this.numRows; posY++) {
      for (let posX = 0; posX < this.numCols; posX++) {
        let dot = this.gridArr[posX][posY];
        // change code
        const x = mousePos.mouseX - dot.canvasPos.canvasX;
        const y = mousePos.mouseY - dot.canvasPos.canvasY;
        if ((x * x + y * y) <= (dot.radius * dot.radius)) {
          return dot;
        }
        //
      }
    }
    return false;
  }

  startLink(mousePos) {
    this.activeMove = true;
    const clickedDot = this.checkForDot(mousePos);
    if (clickedDot) {
      const link = new Link(clickedDot);
      this.links.push(link);
      if (!this.linkedDots.includes(clickedDot)) {
        this.linkedDots.push(clickedDot);
      }
    } else {
      this.endLink();
    }
  }

  continueLink(mousePos) {
    const nextDot = this.checkForDot(mousePos);
    const prevDot = this.linkedDots[this.linkedDots.length - 1];
    // check if connection is possible v
    if (nextDot && nextDot !== prevDot  ) {
      const link = new Link(nextDot);
      this.links.push(link);
      if (!this.linkedDots.includes(clickedDot)) {
        this.linkedDots.push(clickedDot);
      }
      const prevLink = this.links[this.links.length - 1];
      prevLink.connectDots(nextDot);
    }
  }

  endLink() {
    this.linksArr = [];
    this.linkedDots = [];
    this.activeMove = false;
  }

}
