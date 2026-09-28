(async function(args) {
  if (!args || args.length === 0) {
    return "Usage: curl <url>";
  }

  let url = args[0];

  // Auto-prepend https:// if protocol is omitted
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return `curl: (HTTP ${response.status}) ${response.statusText}`;
    }

    const contentType = response.headers.get("content-type") || "";
    let content;

    if (contentType.includes("application/json")) {
      const data = await response.json();
      content = JSON.stringify(data, null, 2);
    } else {
      content = await response.text();
    }

    // Limit output length for terminal display
    const maxChars = 2000;
    if (content.length > maxChars) {
      return content.substring(0, maxChars) + `\n\n... [Output truncated: ${content.length} total characters]`;
    }

    return content;
  } catch (err) {
    return `curl: (7) Failed to fetch ${url} (${err.message})`;
  }
})
