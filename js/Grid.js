class Grid {
  constructor() {
    this.numRows = 6;
    this.numCols = 6;
    this.makeGrid();
    this.linkedDots = [];
    this.linksArr = [];
  }

  makeGrid() {
    this.gridArr = [];
    for (let col = 0; col < this.numCols; col++) {
      let rowDots = [];
      for (let row = 0; row < this.numRows; row++) {
        let dot = new Dot({ pos: { row, col }, color: this.getRandomColor() });
        rowDots.push(dot);
      }
      this.gridArr.push(rowDots);
    }
  }

  getRandomColor() {
    return 'gray';
  }

  drawGrid(ctx, mousePos) {
    this.dotArea = ctx.canvas.offsetWidth / this.gridArr.length;
    if (this.activeMove) {
      this.continueLink(mousePos);
    }
    this.gridArr.forEach(rowDots => (
      rowDots.forEach( dot => { dot.drawDot(ctx, this.dotArea, mousePos) })
    ));
    this.linksArr.forEach(link => { link.drawLink(ctx, mousePos) });
  }

  continueLink(mousePos) {
    const selectedDot = this.checkForDot(mousePos);
    const lastDot = this.linkedDots[this.linkedDots.length - 1];

    if (selectedDot && selectedDot !== lastDot  && lastDot.canLinkTo(selectedDot)) {
      const isMadeLink = this.linksArr.find( ({start, end}) => {
        return ( (start === lastDot && end === selectedDot)
              || (start ==== selectedDot && end === lastDot) )
      });
      const thirdDot = this.linkedDots.length < 2 ?
        null : this.linkedDots[this.linkedDots.length - 2];
      if (thirdDot && thirdDot === selectedDot) {
        this.breakLastLink();
      } else if (!isMadeLink) {
        this.addLink(selectedDot);
      }
  }

  checkForDot(mousePos) {
    for (let col = 0; col < this.numCols; col++) {
      for (let row = 0; row < this.numRows; row++) {
        let dot = this.gridArr[row][col];
        if (dot.isSelected(mousePos)) {
          return dot;
        }
      }
    }
    return false;
  }

  breakLastLink() {
    this.linkedDots.pop();
    this.linksArr.pop();
    // check
    const lastLink = this.linksArr[this.linksArr.length - 1];
    if (lastLink.endSpot) {
      lastLink.breakLink();
    }
  }

  addLink(dot) {
    dot.setAnchor();
    const link = new Link(dot);
    if (this.linkedDots.length > 0) {
      this.linkedDots[this.linkedDots.length - 1].setStill();
      this.linksArr[this.linksArr.length - 1].connectDots(dot);
    }
    this.linkedDots.push(dot);
    this.linksArr.push(link);
  }

  startLink(mousePos) {
    this.activeMove = true;
    const clickedDot = this.checkForDot(mousePos);
    if (clickedDot) {
      this.addLink(clickedDot);
      }
    } else {
      this.endLink();
    }
  }


  endLink() {
    this.activeMove = false;
    this.linkedDots.forEach((dot) => { dot.setStill() });
    this.linksArr = [];
    this.linkedDots = [];
  }

}
