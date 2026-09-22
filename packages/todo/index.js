(function(args) {
  const KEY = "browseros_todos";
  let todos = JSON.parse(localStorage.getItem(KEY) || "[]");
  const action = args[0];
  const item = args.slice(1).join(" ");

  if (!action || action === "list") {
    if (todos.length === 0) return "No tasks. Use 'todo add <task>' to create one.";
    return todos.map((t, i) => `[${i + 1}] ${t}`).join("\n");
  }

  if (action === "add") {
    if (!item) return "Usage: todo add <description>";
    todos.push(item);
    localStorage.setItem(KEY, JSON.stringify(todos));
    return `Added: "${item}"`;
  }

  if (action === "rm" || action === "del") {
    const idx = parseInt(item, 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= todos.length) return "Invalid task index.";
    const removed = todos.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(todos));
    return `Removed: "${removed[0]}"`;
  }

  return "Usage:\n  todo list\n  todo add <task>\n  todo rm <index>";
})
