
function generateHTML(menu: Record<string, string>): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
          h1 { color: #333; }
          ul { padding-left: 1rem; }
          li { margin-bottom: .5rem; }
        </style>
      </head>
      <body>
        <h1>Menú del Día</h1>
        <ul>
          ${Object.entries(menu)
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join("")}
        </ul>
      </body>
    </html>
  `;
}

export { generateHTML };