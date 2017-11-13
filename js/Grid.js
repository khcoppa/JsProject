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
    for (let row = 0; row < this.numCols; row++) {
      let rowDots = [];
      for (let col = 0; col < this.numRows; col++) {
        let dot = new Dot({ pos: { row, col }, color: this.getRandomColor() });
        rowDots.push(dot);
      }
      this.gridArr.push(rowDots);
    }
  }

  getRandomColor() {
    // red/pink , orange/yellow, green, blue, purple
    const colorsArr = ["#e91e63", "#ff9800", "#00963e", "#00bcd4", "#9c27b0"]
    return colorsArr[Math.floor(Math.random() * 5)];
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
              || (start === selectedDot && end === lastDot) )
      });
      const thirdDot = this.linkedDots.length < 2 ?
        null : this.linkedDots[this.linkedDots.length - 2];
      if (thirdDot && thirdDot === selectedDot) {
        this.breakLastLink();
      } else if (!isMadeLink) {
        this.addLink(selectedDot);
      }
    }
  }

  checkForDot(mousePos) {
    for (let row = 0; row < this.numCols; row++) {
      for (let col = 0; col < this.numRows; col++) {
        let dot = this.gridArr[col][row];
        if (dot.isSelected(mousePos)) {
          return dot;
        }
      }
    }
    return null;
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
    // check if dot already added.
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
    } else {
      this.endLink();
    }
  }


  endLink() {
    this.activeMove = false;
    this.checkForValidMove();
    this.linksArr = [];
    this.linkedDots = [];
  }

  checkForValidMove() {
    // check for sqaure
      // if square, add all dots of color to linkedDots
      // call addPointsToScore
      // call repopulateGrid

    // check if link has two or more dots

    if (this.linkedDots.length >= 2) {
      this.addPointsToScore();
      this.repopulateGrid();
    }
  }

  addPointsToScore() {
    return true;
    // get length of this.linkedDots
    // add to total score
  }

  repopulateGrid() {
    this.linkedDots.forEach( (dot) => {
      // console.log(dot);
      // console.log('col : ', dot.pos.col);
      // console.log('row : ', dot.pos.row);
      // const removePos = {col: dot.pos.col, col: dot.pos.col};

      // this.grid[dot.col][dot.row] = null;
      // for (let y = pos.row; y > 0; y--) {
      //   // this swaps out the positions of the spots so that it shifts them "down" (higher index)
      //   this.grid[y][pos.col] = this.grid[y - 1][pos.col];
      //   this.grid[y - 1][pos.col] = null;
      //   this.grid[y][pos.col].pos.y = y;
      // }
      const replacementPos = { col: dot.pos.col, row: dot.pos.row };
      const replacementDot = new Dot({ pos: replacementPos, color: this.getRandomColor() });
      console.log(replacementPos.col, replacementPos.row);
      this.gridArr[replacementPos.row][replacementPos.col] = replacementDot;
    });
  }



}
