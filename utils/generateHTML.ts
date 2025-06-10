import { IMenuItem } from "./parseMenu";

function generateHTML(menuItems: IMenuItem[]): string {
  const itemsHTML = menuItems
    .map(
      (item) => `
        <div class="item">
          <span class="label">${item.label}</span>
          <span class="value">${item.value}</span>
        </div>
      `
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            padding: 2rem;
            background: #fff8f0;
            color: #333;
          }
          .menu-container {
            max-width: 600px;
            margin: auto;
            border: 2px solid #d2691e;
            border-radius: 10px;
            padding: 1.5rem;
            background-color: #fff;
          }
          h1 {
            text-align: center;
            color: #d2691e;
            margin-bottom: 1.5rem;
          }
          .item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f0e0d0;
            padding: 0.5rem 0;
            font-size: 1.1rem;
          }
          .label {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="menu-container">
          <h1>Menú del Día</h1>
          ${itemsHTML}
        </div>
      </body>
    </html>
  `;
}

export { generateHTML };