# Trello Power-Up TypeScript SDK

A fully typed SDK for building Trello Power-Ups with TypeScript. This SDK provides a modern, type-safe way to create Trello Power-Ups with excellent IDE support and autocompletion.

[![npm version](https://badge.fury.io/js/trello-powerup-typescript.svg)](https://www.npmjs.com/package/trello-powerup-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Fully Typed**: Complete TypeScript definitions for all Trello Power-Up capabilities
- 🏗️ **Builder Pattern**: Intuitive API with method chaining
- 💉 **Auto-Injection**: Automatic injection of Trello Power-Up client script
- 🔒 **Type-Safe**: Catch errors at compile time rather than runtime
- 📝 **IntelliSense**: Great IDE support with autocomplete
- 🧩 **Modular**: Clean separation of concerns with helper classes

## Installation

```bash
npm install trello-powerup-typescript
```

## Quick Start

### Initialize Your Power-Up

```typescript
import { TrelloPowerUpBuilder } from 'trello-powerup-typescript';

const powerUp = new TrelloPowerUpBuilder({
  appKey: 'YOUR_APP_KEY',
  appName: 'Your PowerUp Name'
})
.onCardBadges(async (t) => {
  return [{
    text: 'Priority',
    color: 'blue'
  }];
})
.onCardButtons((t) => [{
  icon: './assets/icon.svg',
  text: 'Settings',
  callback: (t) => t.popup({
    title: 'Settings',
    url: './settings.html'
  })
}])
.initialize();
```

### Handle Popups

```typescript
import { TrelloIFrame } from 'trello-powerup-typescript';

const iframe = new TrelloIFrame({
  appKey: 'YOUR_APP_KEY',
  appName: 'Your PowerUp Name'
});

// Get data
const data = await iframe.getCardData('priority');

// Update data
await iframe.setCardData('priority', 'high');

// Close popup
iframe.closePopup();
```

## API Reference

### TrelloPowerUpBuilder

Main class for initializing your Power-Up:

```typescript
const powerUp = new TrelloPowerUpBuilder(config: TrelloPowerUpConfig)
  .onBoardButtons(callback)
  .onCardBadges(callback)
  .onCardButtons(callback)
  .onCardBackSection(callback)
  .initialize();
```

### TrelloIFrame

Helper class for working with Trello's iframe capabilities:

```typescript
const iframe = new TrelloIFrame(config);

// Methods
iframe.getCardData<T>(key: string): Promise<T>;
iframe.setCardData(key: string, value: any): Promise<void>;
iframe.getSharedData<T>(key: string): Promise<T>;
iframe.setSharedData(key: string, value: any): Promise<void>;
iframe.closePopup(): void;
```

## Example Power-Up

Here's a complete example of a Power-Up that adds priority badges and settings:

```typescript
import { TrelloPowerUpBuilder, Badge, CardButton } from 'trello-powerup-typescript';

// Initialize the Power-Up
const powerUp = new TrelloPowerUpBuilder({
  appKey: 'YOUR_APP_KEY',
  appName: 'Priority Power-Up'
})
.onCardBadges(async (t) => {
  const priority = await t.get('card', 'shared', 'priority');
  if (!priority) return [];

  return [{
    text: `Priority: ${priority}`,
    color: getPriorityColor(priority)
  }];
})
.onCardButtons((t) => [{
  icon: './assets/settings.svg',
  text: 'Set Priority',
  callback: (t) => t.popup({
    title: 'Set Priority',
    url: './priority.html',
    height: 200
  })
}])
.initialize();

// Helper function
function getPriorityColor(priority: string): Badge['color'] {
  const colors: Record<string, Badge['color']> = {
    high: 'red',
    medium: 'yellow',
    low: 'green'
  };
  return colors[priority] || 'blue';
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Trello for their excellent Power-Up platform
- Inspired by modern TypeScript practices and patterns
