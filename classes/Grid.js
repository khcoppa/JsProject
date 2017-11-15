class Grid {
  constructor() {
    this.points = 0;
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
    const colorsArr = ["#e91e63", "#ff9800", "#00963e", "#00bcd4", "#9c27b0"];
    const randomIdx = Math.floor(Math.random() * 5);
    return colorsArr[randomIdx];
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
    const returnPts = this.points;
    this.points = 0;
    return returnPts;
  }

  checkForValidMove() {
    // check for sqaure
      // if square, add all dots of color to linkedDots
    if (this.linksArr.length >= 5) {
      this.checkForSquares();
    }

    // check if link has two or more dots
      // call addPoints
      // call repopulateGrid
    if (this.linkedDots.length >= 2) {
      this.addPoints();
      this.repopulateGrid();
      // this.moves -= 1;
      // console.log(this.moves);
    }

    // this.outOfMoves();
  }

  checkForSquares() {
    let square = false;

    this.linkedDots.forEach( (dot) => {
      if (square) {
        return;
      }
      let right = false;
      let dia = false;
      let bottom = false;

      const referencePos = dot.pos;

      for (let i = 0; i < this.linkedDots.length; i++) {
        const comparePos = this.linkedDots[i].pos;
        if (referencePos.col + 1 === comparePos.col &&
        referencePos.row === comparePos.row) {
          right = true;
        } else if (referencePos.col + 1 === comparePos.col &&
        referencePos.row + 1 === comparePos.row) {
          dia = true;
        } else if (referencePos.col === comparePos.col &&
        referencePos.row + 1 === comparePos.row) {
          bottom = true;
        }
      }

      if (right && dia && bottom) {
        square = true;
        this.collectSameColorDots(dot.color);
      }
    });
    return square;
  }

  collectSameColorDots(color) {
    this.linkedDots = [];
    for (let row = 0; row < this.numCols; row++) {
      for (let col = 0; col < this.numRows; col++) {
        const dot = this.gridArr[row][col]
        if (dot.color === color) {
          this.linkedDots.push(dot);
        }
      }
    }
  }


  addPoints() {
    // get length of this.linkedDots
    // add to total points
    this.points = this.linkedDots.length;
    // console.log(this.points);
  }

  repopulateGrid() {
    this.linkedDots.forEach( (dot, i) => {
      for (let row = dot.pos.row; row >= 0; row--) {
        const replacePos = { row: row, col: dot.pos.col };
        if (row === 0) {
          const newDot = new Dot({pos: replacePos, color: this.getRandomColor()});
          // replace in gridArr
          this.gridArr[row][dot.pos.col] = newDot;
        } else {
          // move down 1 row
          const dotToMove = this.gridArr[row-1][dot.pos.col];
          dotToMove.pos = replacePos;
          // replace in gridArr
          this.gridArr[row][dot.pos.col] = dotToMove;
        }
      }
    });
  }

  // outOfMoves() {
  //   if (this.moves === 0) {
  //     console.log('done!');
  //   }
  // }

}
