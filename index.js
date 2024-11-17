require('colors');
const fs = require('fs');
const readlineSync = require('readline-sync');
const inquirer = require('inquirer');
const { displayHeader, checkBalance } = require('./src/utils');
const { createWallet, createContract } = require('./src/wallet');
const { claimFragmentz } = require('./src/claim');
const { RPC_URL } = require('./src/utils');
const { JsonRpcProvider, ethers } = require('ethers');
const moment = require('moment');
const { CronJob } = require('cron');
const CONTRACT_ADDRESS = '0xF0a66d18b46D4D5dd9947914ab3B2DDbdC19C2C0';

let recurringSettings = {};

async function claimProcess(seedPhrasesOrKeys, method, provider, numClaims) {
  for (const keyOrPhrase of seedPhrasesOrKeys) {
    let wallet;
    if (method === '0') {
      wallet = createWallet(keyOrPhrase, provider);
    } else {
      wallet = createWallet(keyOrPhrase, provider);
    }

    const senderAddress = wallet.address;
    console.log(`Processing transactions for address: ${senderAddress}`.cyan);

    const contract = createContract(wallet, CONTRACT_ADDRESS);
    try {
      await claimFragmentz(contract, numClaims);
      console.log(
        `Successfully claimed ${numClaims} Fragmentz for ${senderAddress}`.green
      );
    } catch (error) {
      console.log(
        `[ ${moment().format(
          'HH:mm:ss'
        )} ] Error claiming Fragmentz for ${senderAddress}: ${error.message}`
          .red
      );
    }
  }
}

async function setupRecurringClaim(
  seedPhrasesOrKeys,
  method,
  provider,
  numClaims
) {
  console.log('Setting up recurring claim every 12 hours...'.green);

  const job = new CronJob('0 */12 * * *', async function () {
    await claimProcess(seedPhrasesOrKeys, method, provider, numClaims);
    console.log(
      `[ ${moment().format('HH:mm:ss')} ] Recurring claim executed.`.green
    );
  });

  job.start();
  console.log('Cron job successfully set up.'.green);
}

async function main() {
  displayHeader();

  const provider = new JsonRpcProvider(RPC_URL);

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an option:',
        choices: [
          { name: 'Check balance', value: '0' },
          { name: 'Claim Fragmentz', value: '1' },
          { name: 'Exit', value: '2' },
        ],
      },
    ]);

    if (action === '2') {
      console.log('Exiting...'.cyan);
      break;
    }

    try {
      if (action === '0') {
        const privateKeys = JSON.parse(
          fs.readFileSync('privateKeys.json', 'utf-8')
        );
        if (!Array.isArray(privateKeys) || privateKeys.length === 0) {
          throw new Error(
            'privateKeys.json is not set correctly or is empty'.red
          );
        }

        for (const privateKey of privateKeys) {
          const wallet = createWallet(privateKey, provider);
          const senderAddress = wallet.address;

          const balance = await checkBalance(provider, senderAddress);
          console.log(
            `Address: ${senderAddress} - Balance: ${ethers.formatEther(
              balance
            )} ETH`.yellow
          );
          console.log(
            `Claim faucet here: https://rivalz2.hub.caldera.xyz/`.yellow
          );
        }
      } else if (action === '1') {
        let claimOption, method, seedPhrasesOrKeys;

        if (recurringSettings.claimOption === '2') {
          claimOption = '2';
          method = recurringSettings.method;
          seedPhrasesOrKeys = recurringSettings.seedPhrasesOrKeys;
        } else {
          ({ claimOption } = await inquirer.prompt([
            {
              type: 'list',
              name: 'claimOption',
              message: 'Select claim type:',
              choices: [
                { name: 'One-time claim', value: '1' },
                { name: '12 hours recurring claim', value: '2' },
              ],
            },
          ]));

          ({ method } = await inquirer.prompt([
            {
              type: 'list',
              name: 'method',
              message: 'Select input method:',
              choices: [
                { name: 'Use mnemonics', value: '0' },
                { name: 'Use private keys', value: '1' },
              ],
            },
          ]));

          if (method === '0') {
            seedPhrasesOrKeys = JSON.parse(
              fs.readFileSync('accounts.json', 'utf-8')
            );
            if (
              !Array.isArray(seedPhrasesOrKeys) ||
              seedPhrasesOrKeys.length === 0
            ) {
              throw new Error(
                'accounts.json is not set correctly or is empty'.red
              );
            }
          } else if (method === '1') {
            seedPhrasesOrKeys = JSON.parse(
              fs.readFileSync('privateKeys.json', 'utf-8')
            );
            if (
              !Array.isArray(seedPhrasesOrKeys) ||
              seedPhrasesOrKeys.length === 0
            ) {
              throw new Error(
                'privateKeys.json is not set correctly or is empty'.red
              );
            }
          } else {
            throw new Error('Invalid input method selected'.red);
          }
        }

        const numClaims = readlineSync.questionInt(
          'How many Fragmentz do you want to claim? '
        );

        console.log('');

        await claimProcess(seedPhrasesOrKeys, method, provider, numClaims);
        console.log('\nInitial claim completed.'.green);

        if (claimOption === '2') {
          recurringSettings = { claimOption, method, seedPhrasesOrKeys };
          await setupRecurringClaim(
            seedPhrasesOrKeys,
            method,
            provider,
            numClaims
          );
          console.log(
            'Bot is now running in idle mode. It will perform claims every 12 hours.'
              .green
          );
          break;
        }
      } else {
        console.log(
          'Invalid input. Please enter 0 to check balance, 1 to claim Fragmentz, or 2 to exit.'
            .red
        );
      }
    } catch (error) {
      console.log(
        `[ ${moment().format('HH:mm:ss')} ] Error in main loop: ${
          error.message
        }`.red
      );
    } finally {
      console.log('\nAll tasks completed!'.green);
      console.log('Subscribe: https://t.me/HappyCuanAirdrop'.green);
    }
  }
}

main();
