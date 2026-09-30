(async function(args) {
  if (!args || args.length === 0) return "Usage: curl <url>";
  let url = args[0];

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return `curl: (HTTP ${res.status}) ${res.statusText}`;

    const contentType = res.headers.get("content-type") || "";
    let text = await res.text();

    // If the response is HTML, convert it to readable plain text
    if (contentType.includes("text/html")) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      
      // Remove scripts and styles
      doc.querySelectorAll("script, style").forEach(el => el.remove());
      
      text = doc.body ? doc.body.textContent : text;
      // Clean up empty lines and multi-spaces
      text = text.replace(/^\s*[\r\n]/gm, "").replace(/[ \t]+/g, " ");
    }

    const maxChars = 2000;
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "\n... [Output truncated]";
    }

    return text.trim();
  } catch (err) {
    return `curl: error fetching ${url} (${err.message})`;
  }
})
