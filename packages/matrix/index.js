(function(args) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";
  const lines = [];
  const lineCount = parseInt(args[0], 10) || 10;

  for (let i = 0; i < lineCount; i++) {
    let row = "";
    for (let j = 0; j < 45; j++) {
      row += chars[Math.floor(Math.random() * chars.length)];
    }
    lines.push(row);
  }

  return lines.join("\n");
})
