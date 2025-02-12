const character = document.getElementById('character');
const characterImg = character.querySelector('img');
let x = 0;
let y = 0;
let dx = 1;
let dy = 1;

function moveCharacter() {
  x += dx;
  y += dy;

  if (x + characterImg.width > window.innerWidth || x < 0) {
    dx = -dx;
  }
  if (y + characterImg.height > window.innerHeight || y < 0) {
    dy = -dy;
  }

  character.style.left = x + 'px';
  character.style.top = y + 'px';


  setTimeout(moveCharacter, 1);
}

moveCharacter();
