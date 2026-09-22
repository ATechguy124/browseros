(function(args) {
  if (args.length < 2) return "Usage: grep <pattern> <text_line_1> [text_line_2 ...]";
  const pattern = args[0];
  const inputLines = args.slice(1);
  const matches = inputLines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
  
  if (matches.length === 0) return `grep: no matches found for '${pattern}'`;
  return matches.join("\n");
})
