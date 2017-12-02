class Game {
  constructor(canvas) {
    this.grid = new Grid();
    this.ctx = canvas.getContext('2d');
    this.canvasX = canvas.offsetWidth;
    this.canvasY = canvas.offsetHeight;
    this.findMousePos();
    this.moves = 30;
    this.score = 0;
    this.endGame = false;
  }

  begin() {
    const animate = (time) => {
      const timeChange = time - this.lastTime;
      this.lastTime = time;

      this.render(timeChange);

      if (this.endGame) {
        this.finalScore();

        this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
        this.finalScore.gameOver.classList.add('display-score');
        this.finalScore.finalScoreText.textContent = this.score;
        this.finalScore.highscoreText.textContent = localStorage.getItem('highscore');
      } else {
        window.requestAnimationFrame(animate);
      }

    };
    animate(0);
    this.checkForLinks();
  }

  render(timeChange) {
    // document.body.style.backgroundColor = this.grid.randColor;
    this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
    this.grid.drawGrid(this.ctx, this.mousePos, timeChange);
    document.querySelector('.moves-span').textContent = 'Moves: ' + this.moves;
    document.querySelector('.score-span').textContent = 'Score: ' + this.score;
  }

  checkForLinks() {
    this.ctx.canvas.addEventListener('mousedown', () => {
      this.activeMove = true;
      this.grid.startLink(this.mousePos);
    });
    window.addEventListener('mouseup', () => {
      this.activeMove = false;
      // this.grid.endLink();

      this.endLink();
    });
  }

  endLink() {
    // this.grid.endLink returns points for move
    const points = this.grid.endLink();
    if (points > 0) {
      this.moves -= 1;
      this.score += points;
    }
    if (this.moves === 0) {
      this.endGame = true;
    }
  }

  findMousePos() {
    this.mousePos = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const x = e.clientX - this.ctx.canvas.offsetLeft;
      const y = e.clientY - this.ctx.canvas.offsetTop;
      this.mousePos = { x, y };
    });
  }

  finalScore() {
    this.finalScore = {
      gameOver: document.querySelector('#final-score'),
      finalScoreText: document.querySelector('#final-score-span'),
      highscoreText: document.querySelector('#high-score-span'),
    };
    if (localStorage.getItem('highscore')) {
      if (localStorage.getItem('highscore') <= this.score) {
        localStorage.setItem('highscore', this.score);
      }
    } else {
      localStorage.setItem('highscore', this.score);
    }
  }

}
