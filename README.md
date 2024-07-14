# Rivalz AI Bot

This repository contains a bot for interacting with the Rivalz Fragmentz claimer using Ethereum wallets.

## Features

- Check wallet balances
- Claim Fragmentz
- Interactive CLI interface

## Getting Started

Follow these steps to set up and run the bot.

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dante4rt/rivalz-ai-bot.git
   cd rivalz-ai-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Setting Up Wallets

You need to provide your Ethereum private keys or mnemonics in either `privateKeys.json` or `accounts.json` in the following formats:

- For private keys (array of strings):
  ```json
  [
    "private_key_1",
    "private_key_2"
  ]
  ```

- For mnemonics (array of strings):
  ```json
  [
    "banana apple boat monkey",
    "chicken dog cat ball"
  ]
  ```

### Usage

To start the bot, run:
```bash
npm start
```

Follow the prompts to check balances or claim Fragmentz.

## License

This project is licensed under the [MIT License](LICENSE).