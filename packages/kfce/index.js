(function(args) {
  if (document.getElementById("kfce-desktop")) {
    return "KFCE Desktop Environment is already running.";
  }

  // Desktop Container
  const desktop = document.createElement("div");
  desktop.id = "kfce-desktop";
  desktop.style.position = "fixed";
  desktop.style.top = "0";
  desktop.style.left = "0";
  desktop.style.width = "100vw";
  desktop.style.height = "100vh";
  desktop.style.backgroundColor = "#1e222a";
  desktop.style.backgroundImage = "radial-gradient(#2c313a 15%, transparent 16%)";
  desktop.style.backgroundSize = "24px 24px";
  desktop.style.zIndex = "8000";
  desktop.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  desktop.style.color = "#ffffff";
  desktop.style.userSelect = "none";

  // Top Panel Bar (XFCE Style)
  const panel = document.createElement("div");
  panel.style.height = "34px";
  panel.style.backgroundColor = "#21252b";
  panel.style.borderBottom = "1px solid #333842";
  panel.style.display = "flex";
  panel.style.alignItems = "center";
  panel.style.justifyContent = "space-between";
  panel.style.padding = "0 12px";

  // Applications Menu Button
  const menuBtn = document.createElement("button");
  menuBtn.innerText = "🐭 Applications";
  menuBtn.style.backgroundColor = "#3b4048";
  menuBtn.style.color = "#fff";
  menuBtn.style.border = "none";
  menuBtn.style.padding = "5px 12px";
  menuBtn.style.borderRadius = "4px";
  menuBtn.style.cursor = "pointer";
  menuBtn.style.fontWeight = "bold";

  // Clock Widget
  const clock = document.createElement("div");
  clock.style.fontSize = "13px";
  clock.style.color = "#abb2bf";
  const updateClock = () => {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };
  updateClock();
  const clockInterval = setInterval(updateClock, 1000);

  // Logout / Exit Button
  const exitBtn = document.createElement("button");
  exitBtn.innerText = "Log Out";
  exitBtn.style.backgroundColor = "#e06c75";
  exitBtn.style.color = "#fff";
  exitBtn.style.border = "none";
  exitBtn.style.padding = "5px 10px";
  exitBtn.style.borderRadius = "4px";
  exitBtn.style.cursor = "pointer";

  const panelLeft = document.createElement("div");
  panelLeft.appendChild(menuBtn);

  const panelRight = document.createElement("div");
  panelRight.style.display = "flex";
  panelRight.style.alignItems = "center";
  panelRight.style.gap = "15px";
  panelRight.appendChild(clock);
  panelRight.appendChild(exitBtn);

  panel.appendChild(panelLeft);
  panel.appendChild(panelRight);
  desktop.appendChild(panel);

  // Applications Dropdown Menu
  const appMenu = document.createElement("div");
  appMenu.style.position = "absolute";
  appMenu.style.top = "38px";
  appMenu.style.left = "12px";
  appMenu.style.width = "220px";
  appMenu.style.backgroundColor = "#21252b";
  appMenu.style.border = "1px solid #333842";
  appMenu.style.borderRadius = "6px";
  appMenu.style.display = "none";
  appMenu.style.flexDirection = "column";
  appMenu.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
  appMenu.style.padding = "6px 0";
  appMenu.style.zIndex = "8001";

  menuBtn.onclick = (e) => {
    e.stopPropagation();
    appMenu.style.display = appMenu.style.display === "none" ? "flex" : "none";
  };

  desktop.onclick = () => {
    appMenu.style.display = "none";
  };

  // Binary Launcher Helper
  const launchBinary = (binName) => {
    const fsData = localStorage.getItem("browseros_vfs");
    if (!fsData) return alert("VFS system not initialized.");
    const fs = JSON.parse(fsData);
    const code = fs[`/bin/${binName}`];
    
    if (code) {
      try {
        const fn = eval(code);
        fn([]);
      } catch (err) {
        alert(`Error executing ${binName}: ${err.message}`);
      }
    } else {
      alert(`Package '${binName}' is not installed.\nRun 'apt-get install ${binName}' in terminal first.`);
    }
  };

  const addMenuItem = (label, handler) => {
    const item = document.createElement("div");
    item.innerText = label;
    item.style.padding = "8px 16px";
    item.style.cursor = "pointer";
    item.style.fontSize = "13px";
    item.onmouseenter = () => item.style.backgroundColor = "#2c313a";
    item.onmouseleave = () => item.style.backgroundColor = "transparent";
    item.onclick = (e) => {
      e.stopPropagation();
      appMenu.style.display = "none";
      handler();
    };
    appMenu.appendChild(item);
  };

  // Add items to Start Menu
  addMenuItem("🎨 Paint App", () => launchBinary("paint"));
  addMenuItem("🐮 Cow Says", () => launchBinary("cowsays"));
  addMenuItem("🖥️ Terminal View", () => {
    clearInterval(clockInterval);
    desktop.remove();
  });

  // Desktop Icons Layout
  const iconArea = document.createElement("div");
  iconArea.style.padding = "20px";
  iconArea.style.display = "flex";
  iconArea.style.flexDirection = "column";
  iconArea.style.gap = "20px";

  const createDesktopIcon = (name, icon, action) => {
    const iconContainer = document.createElement("div");
    iconContainer.style.width = "75px";
    iconContainer.style.textAlign = "center";
    iconContainer.style.cursor = "pointer";
    iconContainer.style.padding = "8px";
    iconContainer.style.borderRadius = "6px";

    iconContainer.onmouseenter = () => iconContainer.style.backgroundColor = "rgba(255,255,255,0.1)";
    iconContainer.onmouseleave = () => iconContainer.style.backgroundColor = "transparent";

    const symbol = document.createElement("div");
    symbol.style.fontSize = "36px";
    symbol.innerText = icon;

    const label = document.createElement("div");
    label.style.fontSize = "12px";
    label.style.marginTop = "4px";
    label.innerText = name;

    iconContainer.appendChild(symbol);
    iconContainer.appendChild(label);
    iconContainer.onclick = action;
    return iconContainer;
  };

  iconArea.appendChild(createDesktopIcon("Paint", "🎨", () => launchBinary("paint")));
  iconArea.appendChild(createDesktopIcon("Terminal", "💻", () => {
    clearInterval(clockInterval);
    desktop.remove();
  }));

  desktop.appendChild(iconArea);
  desktop.appendChild(appMenu);

  exitBtn.onclick = () => {
    clearInterval(clockInterval);
    desktop.remove();
  };

  document.body.appendChild(desktop);
  return "[KFCE] Desktop Environment launched successfully.";
})
