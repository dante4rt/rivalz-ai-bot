# Rivalz AI Bot

This repository contains a bot for interacting with the Rivalz Fragmentz claimer using Ethereum wallets.

## Features

- Check wallet balances
- Claim Fragmentz
  - One-time claim
  - Recurring claim every 12 hours
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

#### Options

1. **Check Balances**: Enter `0` to check the balance of each wallet.
2. **Claim Fragmentz**: Enter `1` to claim Fragmentz.
   - **One-time Claim**: Enter `1` to claim once.
   - **Recurring Claim**: Enter `2` to perform an initial claim and set up a recurring job that runs every 12 hours.

### Recurring Claim Feature

If you choose the recurring claim option, the bot will perform the initial claim immediately and then automatically claim Fragmentz every 12 hours. This is achieved using the `cron` package, which schedules the recurring jobs.

## License

This project is licensed under the [MIT License](LICENSE).
