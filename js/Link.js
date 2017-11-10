class Link {
  constructor(dot) {
    this.startDot = dot;
    this.endDot = undefined;
  }

  drawLink(ctx, mousePos) {
    ctx.lineWidth = 12 * (ctx.canvas.width / 1200);
    ctx.strokeStyle = this.startDot.color;
    ctx.beginPath();
    ctx.moveTo(this.startDot.canvasPos.canvasX, this.startDot.canvasPos.canvasY);
    ctx.lineTo(mousePos.mouseX, mousePos.mouseY);
    ctx.stroke();
  }


}
