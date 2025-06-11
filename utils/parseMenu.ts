function parseMenu(text: string): Record<string, string> {
  const lines = text.split("\n");
  const parsed: Record<string, string> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      parsed[key.trim()] = rest.join(":").trim();
    }
  }

  return parsed;
}

export {parseMenu};
