class Dot {
  constructor(props) {
    this.pos = props.pos
    this.radius = 17;
    this.color = props.color;
    this.setStill();
  }

  setStill() {
    this.isAnchor = false;
  }

  setAnchor() {
    this.isAnchor = true;
  }

  drawDot(ctx, area, mousePos) {
    // cite code for making dots in grid on canvas
    this.gridPos = {
      x: this.pos.row * area + (area / 2),
      y: this.pos.col * area + (area / 2)
    }
    //
    ctx.beginPath();
    ctx.arc(this.gridPos.x, this.gridPos.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  isSelected(mousePos) {
    // cite formula for finding mousePos on top of circle
    const x = mousePos.x - this.gridPos.x;
    const y = mousePos.y - this.gridPos.y;
    return (x**2 + y**2) <= (this.radius**2)
    //
  }

  canLinkTo(dot) {
    const checkColor = dot.color === this.color;
    return (checkColor && this.isNextTo(dot.pos))
  }

  isNextTo (dotPos) {
    // check top
    if (this.pos.x === dotPos.x && (this.pos.y + 1) === dotPos.y) {
      return true;
    }
    // check bottom
    else if (this.pos.x === dotPos.x && (this.pos.y - 1) === dotPos.y) {
      return true;
    }
    // check right
    else if ((this.pos.x + 1) === dotPos.x && this.pos.y === dotPos.y) {
      return true;
    }
    // check left
    else if ((this.pos.x - 1) === dotPos.x && this.pos.y === dotPos.y) {
      return true;
    }
    return false;
  }

}
