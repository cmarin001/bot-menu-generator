function parseMenu(text) {
  const lines = text.split(/\n|\r/).filter(Boolean);
  return lines.map((line) => {
    const [label, ...valueParts] = line.split(":");
    return {
      label: label.trim(),
      value: valueParts.join(":").trim(),
    };
  });
}

module.exports = { parseMenu };
