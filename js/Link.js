class Link {
  constructor(dot) {
    debugger
    this.startDot = dot;
    this.endDot = undefined;
  }

  drawLink(ctx, mousePos) {
    ctx.beginPath();
    ctx.moveTo(this.startDot.canvasPos.canvasX, this.startDot.canvasPos.canvasY);
    ctx.lineWidth = 10;
    ctx.lineTo(mousePos.x, mousePos.y);

  }


}
