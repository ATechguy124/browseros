(function(args) {
  const flag = args[0] || "";
  const userAgent = navigator.userAgent;
  
  if (flag === "-a" || flag === "--all") {
    return `BrowserOS 1.0.0-web #1 SMP JS-V8 x86_64 BrowserOS/Linux (${navigator.platform})`;
  }
  if (flag === "-r") return "1.0.0-web";
  if (flag === "-m") return navigator.platform;
  
  return "BrowserOS";
})
