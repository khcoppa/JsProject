class Dot {
  constructor(props) {
    this.posX = props.posX;
    this.posY = props.posY;
    this.color = undefined;
    this.canvasPos = {};
    // this.radius = 50;
    // this.selected = false;
    this.setRandomColor();
  }

  setRandomColor() {
    this.color = 'purple'
  }

  drawDot(ctx, area) {
    this.canvasPos = {
      canvasX: this.posX * area + (area / 2),
      canvasY: this.posY * area + (area / 2)
    }
    ctx.beginPath();
    ctx.arc(this.canvasPos.canvasX, this.canvasPos.canvasY, area*.25, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  collapse() {

  }

  glow() {

  }

  drop() {

  }

  shake() {

  }

  hovered() {
    // check mouse position

  }

  isNextTo() {
    // must be above, below, left, right
  }

  connectible() {
    // must be next to and same color
  }
}
