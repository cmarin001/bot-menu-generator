interface IMenuItem {
  label: string;
  value: string;
}

function parseMenu(text: string): IMenuItem[] {
  const lines = text.split(/\n|\r/).filter(Boolean);
  return lines.map((line) => {
    const [label, ...valueParts] = line.split(":");
    return {
      label: label.trim(),
      value: valueParts.join(":").trim(),
    };
  });
}

export { parseMenu };
export type { IMenuItem };