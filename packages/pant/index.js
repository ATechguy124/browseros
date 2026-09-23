(function(args) {
  // Prevent duplicate windows
  if (document.getElementById("win-paint")) {
    return "Paint application is already open.";
  }

  // Create floating OS window frame
  const win = document.createElement("div");
  win.id = "win-paint";
  win.style.position = "absolute";
  win.style.top = "80px";
  win.style.left = "80px";
  win.style.width = "400px";
  win.style.height = "330px";
  win.style.backgroundColor = "#2d2d2d";
  win.style.border = "2px solid #00ff66";
  win.style.borderRadius = "6px";
  win.style.boxShadow = "0 10px 30px rgba(0,0,0,0.7)";
  win.style.zIndex = "9999";
  win.style.display = "flex";
  win.style.flexDirection = "column";

  // Create Window Title Bar
  const titleBar = document.createElement("div");
  titleBar.style.backgroundColor = "#00ff66";
  titleBar.style.color = "#111";
  titleBar.style.padding = "6px 12px";
  titleBar.style.fontWeight = "bold";
  titleBar.style.fontFamily = "sans-serif";
  titleBar.style.display = "flex";
  titleBar.style.justifyContent = "space-between";
  titleBar.style.alignItems = "center";
  titleBar.style.cursor = "move";
  titleBar.style.userSelect = "none";
  titleBar.innerHTML = '<span>Paint.exe</span><button id="close-paint-btn" style="background:#ff5555;color:white;border:none;padding:2px 8px;cursor:pointer;font-weight:bold;border-radius:3px;">X</button>';

  // Canvas element for drawing
  const canvas = document.createElement("canvas");
  canvas.width = 396;
  canvas.height = 290;
  canvas.style.backgroundColor = "#ffffff";
  canvas.style.cursor = "crosshair";
  canvas.style.display = "block";

  win.appendChild(titleBar);
  win.appendChild(canvas);
  document.body.appendChild(win);

  // Window Close Handler
  document.getElementById("close-paint-btn").onclick = () => win.remove();

  // Canvas Drawing Context Setup
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  let isDrawing = false;

  canvas.onmousedown = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  canvas.onmouseup = () => isDrawing = false;
  canvas.onmouseleave = () => isDrawing = false;

  canvas.onmousemove = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  // Window Dragging Functionality
  let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;

  titleBar.onmousedown = (e) => {
    if (e.target.id === "close-paint-btn") return;
    isDragging = true;
    dragOffsetX = e.clientX - win.offsetLeft;
    dragOffsetY = e.clientY - win.offsetTop;
  };

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    win.style.left = (e.clientX - dragOffsetX) + "px";
    win.style.top = (e.clientY - dragOffsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  return "[GUI] Paint app window launched successfully.";
})
