# Menu Bot Telegram

This is a simple Telegram bot that allows a restaurant owner to input a daily menu in plain text and automatically receive a stylized image version of the menu. Perfect for sharing on social media or with customers.

## 🛠 Features

- Accepts menu input via Telegram command.
- Parses the input and renders a clean HTML menu.
- Converts HTML to image using Puppeteer.
- Sends the final menu image back via Telegram.

## 🚀 Setup

### 1. Clone this repo
```bash
git clone https://github.com/your-username/menu-bot-telegram.git
cd menu-bot-telegram
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Add your Telegram bot token from [@BotFather](https://t.me/botfather):

```env
TELEGRAM_TOKEN=your-telegram-bot-token
```

### 4. Run the bot
```bash
npm start
```

## 🧪 Usage

Send a message in this format to your bot:

```
/menu
Sopa: Ajiaco
Plato fuerte: Bandeja paisa
Bebida: Jugo natural
Postre: Flan de coco
```

The bot will reply with a nice image of your daily menu.

## 📦 Deployment

Deploy easily using [Railway](https://railway.app) or [Render](https://render.com). Don’t forget to add the environment variable `TELEGRAM_TOKEN` in your project settings.

---

Enjoy serving beautiful menus! 🍽️
