(function(args) {
  if (document.getElementById("win-snake")) {
    return "Snake game is already running.";
  }

  // Create Window Frame
  const win = document.createElement("div");
  win.id = "win-snake";
  win.style.position = "absolute";
  win.style.top = "60px";
  win.style.left = "60px";
  win.style.width = "400px";
  win.style.height = "435px";
  win.style.backgroundColor = "#1e1e1e";
  win.style.border = "2px solid #50fa7b";
  win.style.borderRadius = "8px";
  win.style.boxShadow = "0 10px 30px rgba(0,0,0,0.8)";
  win.style.zIndex = "9999";
  win.style.display = "flex";
  win.style.flexDirection = "column";

  // Title Bar
  const titleBar = document.createElement("div");
  titleBar.style.backgroundColor = "#50fa7b";
  titleBar.style.color = "#111";
  titleBar.style.padding = "6px 12px";
  titleBar.style.fontWeight = "bold";
  titleBar.style.fontFamily = "monospace";
  titleBar.style.display = "flex";
  titleBar.style.justifyContent = "space-between";
  titleBar.style.alignItems = "center";
  titleBar.style.cursor = "move";
  titleBar.style.userSelect = "none";
  
  const titleText = document.createElement("span");
  titleText.innerText = "🐍 Snake | Score: 0";
  
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.style.background = "#ff5555";
  closeBtn.style.color = "white";
  closeBtn.style.border = "none";
  closeBtn.style.padding = "2px 8px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.borderRadius = "3px";

  titleBar.appendChild(titleText);
  titleBar.appendChild(closeBtn);

  // Game Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.backgroundColor = "#111";
  canvas.style.display = "block";

  win.appendChild(titleBar);
  win.appendChild(canvas);
  document.body.appendChild(win);

  const ctx = canvas.getContext("2d");
  const gridSize = 20;
  const tileCount = 20;

  let snake = [{ x: 10, y: 10 }];
  let dx = 1, dy = 0;
  let food = { x: 15, y: 15 };
  let score = 0;
  let gameOver = false;

  function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  }

  function gameLoop() {
    if (gameOver) return;

    // Movement step
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall Collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      endGame();
      return;
    }

    // Self Collision
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        endGame();
        return;
      }
    }

    snake.unshift(head);

    // Food Collision
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      titleText.innerText = `🐍 Snake | Score: ${score}`;
      placeFood();
    } else {
      snake.pop();
    }

    // Draw Board
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    ctx.fillStyle = "#ff5555";
    ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);

    // Draw Snake
    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? "#8be9fd" : "#50fa7b";
      ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
  }

  function endGame() {
    gameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff5555";
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillStyle = "#fff";
    ctx.font = "14px monospace";
    ctx.fillText("Press Arrow Key or Space to Restart", canvas.width / 2, canvas.height / 2 + 20);
  }

  function restart() {
    snake = [{ x: 10, y: 10 }];
    dx = 1; dy = 0;
    score = 0;
    gameOver = false;
    titleText.innerText = `🐍 Snake | Score: ${score}`;
    placeFood();
  }

  const loopInterval = setInterval(gameLoop, 110);

  // Key Event Listener
  const keyHandler = (e) => {
    if (gameOver && (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key))) {
      restart();
      return;
    }

    switch (e.key) {
      case "ArrowUp":    if (dy === 0) { dx = 0; dy = -1; } e.preventDefault(); break;
      case "ArrowDown":  if (dy === 0) { dx = 0; dy = 1; } e.preventDefault(); break;
      case "ArrowLeft":  if (dx === 0) { dx = -1; dy = 0; } e.preventDefault(); break;
      case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } e.preventDefault(); break;
    }
  };

  window.addEventListener("keydown", keyHandler);

  // Close & Clean Up
  closeBtn.onclick = () => {
    clearInterval(loopInterval);
    window.removeEventListener("keydown", keyHandler);
    win.remove();
  };

  // Window Dragging
  let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
  titleBar.onmousedown = (e) => {
    if (e.target === closeBtn) return;
    isDragging = true;
    dragOffsetX = e.clientX - win.offsetLeft;
    dragOffsetY = e.clientY - win.offsetTop;
  };

  const moveHandler = (e) => {
    if (!isDragging) return;
    win.style.left = (e.clientX - dragOffsetX) + "px";
    win.style.top = (e.clientY - dragOffsetY) + "px";
  };
  const upHandler = () => isDragging = false;

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", upHandler);

  return "[GUI] Snake arcade game launched successfully.";
})
