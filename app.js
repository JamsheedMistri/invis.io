// Variables
var width = document.body.clientWidth;
var height = document.body.clientHeight;

// Create a canvas that fits the screen
var canvas = document.createElement("canvas");
var illuminati = document.createElement("img");
var timer = 20;
var illuminatiSize = 20;
var size = 5;
var x = Math.random() * width;
var y = Math.random() * height;
var illuminati = document.createElement("img");
var found = false;
var gameOver = false;
var gameOverSize = 10;

illuminati.setAttribute("src", "illuminati.png");
canvas.setAttribute("width", "" + width);
canvas.setAttribute("height", "" + height);
document.body.appendChild(canvas);

// Graphics context
var context = canvas.getContext('2d');

// Get the mouse motion and upate the two variables that stored
var mouseX = 0;
var mouseY = 0;

document.onmousemove = function(m) {
  mouseX = m.clientX;
  mouseY = m.clientY;
}

document.onclick = function() {
  if (mouseX > x && mouseX < x + 10 && mouseY > y && mouseY < y + 10) {
    found = true;
  }
}

// Call this every frame
function frame() {
  // Clear background
  context.clearRect(0, 0, width, height);

  if (timer == 0) {
    found = true;
    gameOver = true;
  }

  if (found) {
    if (gameOver) {
      context.fillStyle = "red";
      context.fill();
      context.font = "50px Open Sans";
      context.fillText("GAME OVER", width / 2 - 140, height / 2);
    } else {
      context.font = "50px Open Sans";
      context.fillText("YOU WIN!", width / 2 - 130, height / 2);
    }

    if (gameOverSize <= 200) {
      gameOverSize += 3;
    }
    context.drawImage(illuminati, x - (gameOverSize / 2), y - (gameOverSize / 2), gameOverSize, gameOverSize);
  }

  // Set mouse size
  size = Math.abs((mouseX - x) / 10) + Math.abs((mouseY - y) / 10) + 10;

  context.font = "20px Open Sans";
  context.fillText(timer, 20, 40, 100);

  context.fillStyle = "#8aa95e";
  context.fill();
  context.beginPath();
  context.arc(mouseX, mouseY, size, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "#8aa95e";
  context.fill();

  // Makes it so that this function can be called again
  window.requestAnimationFrame(frame);
}

window.setInterval(function()
{
  if (!found) {
      timer --;
  }
}, 1000);

// Make that ^ call every frame
frame();
