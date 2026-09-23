(function(args) {
  const flag = args[0];

  if (!flag) {
    return "Usage:\n  java -version\n  java run 'System.out.println(\"Hello World!\");'\n  java exec <code_string>";
  }

  // Version check flag
  if (flag === "-version" || flag === "--version" || flag === "-v") {
    return [
      'openjdk version "21.0.2" 2026-01-16 LTS',
      'OpenJDK Runtime Environment (build 21.0.2+13-LTS)',
      'OpenJDK 64-Bit Server VM (build 21.0.2+13-LTS, mixed mode, sharing)'
    ].join("\n");
  }

  // Java code execution parser
  if (flag === "run" || flag === "exec") {
    const rawCode = args.slice(1).join(" ");
    if (!rawCode) return "Error: No Java code string supplied.";

    const outputs = [];

    // Parse and evaluate System.out.println(...)
    const printlnRegex = /System\.out\.println\((.*?)\);/g;
    let match;
    while ((match = printlnRegex.exec(rawCode)) !== null) {
      let expression = match[1].trim();

      // Handle literal strings vs basic arithmetic
      if ((expression.startsWith('"') && expression.endsWith('"')) || 
          (expression.startsWith("'") && expression.endsWith("'"))) {
        outputs.push(expression.slice(1, -1));
      } else {
        try {
          const val = Function(`"use strict"; return (${expression})`)();
          outputs.push(String(val));
        } catch (e) {
          outputs.push(expression);
        }
      }
    }

    if (outputs.length > 0) {
      return outputs.join("\n");
    }

    return "[JVM] Code executed successfully (0 exit status, no stdout).";
  }

  return `java: unknown option '${flag}'. Run 'java' with no arguments for usage.`;
})
