(function(args) {
  const quotes = [
    "There are 10 types of people: those who understand binary, and those who don't.",
    "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
    "It's not a bug, it's an undocumented feature.",
    "Talk is cheap. Show me the code. — Linus Torvalds",
    "Programs must be written for people to read, and only incidentally for machines to execute."
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
})
