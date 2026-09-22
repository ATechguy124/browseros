(async function(args) {
  if (!args[0]) return "Usage: curl <url>";
  try {
    const res = await fetch(args[0]);
    if (!res.ok) return `HTTP Error: ${res.status} ${res.statusText}`;
    const text = await res.text();
    return text.length > 1500 ? text.substring(0, 1500) + "\n...[truncated]" : text;
  } catch (err) {
    return `curl: error fetching ${args[0]} (${err.message})`;
  }
})
