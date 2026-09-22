(async function(args) {
  const city = args.join(" ") || "Saint Paul";
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=3`);
    if (!res.ok) return `weather: could not fetch weather for "${city}"`;
    return await res.text();
  } catch (err) {
    return `weather: connection error (${err.message})`;
  }
})
