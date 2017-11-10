export default class Dot {
  constructor(props) {
    this.color = props.color;
    this.posX = props.pos.x;
    this.posY = props.pos.y;
    // this.radius = 50;
    // this.selected = false;
  }

  setCanvasPos(sizeOfSpace) {
   this.canvasPos = {
     cx: this.pos.x * sizeOfSpace + (sizeOfSpace / 2),
     cy: this.pos.y * sizeOfSpace + (sizeOfSpace / 2),
     radius: sizeOfSpace * this.radiusPct,
   };


  draw(ctx, spaceAround) {
    ctx.beginPath();
    ctx.arc(this.posX, this.)
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
