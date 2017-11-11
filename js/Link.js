class Link {
  constructor(dot) {
    this.startDot = dot;
  }

  connectDots(dot) {
    this.endDot = dot;
  }

  drawLink(ctx, mousePos) {
    ctx.lineWidth = 10;
    ctx.strokeStyle = this.startDot.color;
    ctx.beginPath();
    ctx.moveTo(this.startDot.gridPos.x, this.startDot.gridPos.y);
    if (this.endDot) {
      ctx.lineTo(this.endDot.gridPos.x, this.endDot.gridPos.y);
    } else {
      ctx.lineTo(mousePos.x, mousePos.y);
    }
    ctx.stroke();
  }


  breakLink() {
    this.endDot = undefined;
  }

}
