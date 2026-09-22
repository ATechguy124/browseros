// Exported function receives args and access to OS environment
(function(args) {
  const msg = args.join(' ') || 'Moo! Welcome to BrowserOS';
  return `
  ${'_'.repeat(msg.length + 2)}
< ${msg} >
  ${'-'.repeat(msg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )/\\
                ||----w |
                ||     ||`;
})
