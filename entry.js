document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const game = new Game(canvas);
  game.begin();
  document.querySelector('.new-game').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });

});
