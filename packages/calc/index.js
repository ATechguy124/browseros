(function(args) {
  const expr = args.join("");
  if (!expr) return "Usage: calc <expression> (e.g., calc 12*45)";
  
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    return "Error: Invalid math characters detected.";
  }

  try {
    const result = Function(`"use strict"; return (${expr})`)();
    return `= ${result}`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
})
