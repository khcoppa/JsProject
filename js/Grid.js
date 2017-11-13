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
      // const replacementPos = { col: dot.pos.col, row: dot.pos.row };
      // const replacementDot = new Dot({ pos: replacementPos, color: this.getRandomColor() });
      // this.gridArr[replacementPos.row][replacementPos.col] = replacementDot;

      // new dots are [col][row] 0 / 3 gone - new 0 / 0 ... 1 / 3 gone - new 1 / 0
      // dots at gone spots are the ones above and so on till col = 1
      // move down
        // 0 / 3 gone : 0 / 2 down - 0 / 1 down - 0 / 0 new
        // 1 / 3 gone : 1 / 2 down - 1 / 1 down - 1 / 0 new
        // 2 / 3 gone : 2 / 2 down - 2 / 1 down - 2 / 0 new
      const dotToRemove = this.gridArr[dot.pos.row][dot.pos.col];
      const dotToRemovePos = dotToRemove.pos;
      // console.log(dotToRemove);
      // console.log(dotToRemovePos);
      for (let r = dot.pos.row; r >= 0; r--) {
        if (r > 0) {
          const dotToMoveDown = this.gridArr[r][dotToRemovePos.col];
          console.log(dotToMoveDown);
          // console.log(this.gridArr[r+1][dotToRemovePos.col]);
          // this.gridArr[r+1][dotToRemovePos.col] = dotToMoveDown;
        } else {
          const newDotPos = { col: dot.pos.col, row: r}
          const newDot = new Dot({ pos: newDotPos, color: this.getRandomColor()});
          this.gridArr[r][newDotPos.col] = newDot;
        }

      }
    });
  }



}
