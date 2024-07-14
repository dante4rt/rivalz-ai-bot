const RPC_URL = 'https://rivalz2.rpc.caldera.xyz/infra-partner-http';

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log('========================================'.cyan);
  console.log('=     Rivalz Fragmentz Claimer Bot     ='.cyan);
  console.log('=     Created by HappyCuanAirdrop      ='.cyan);
  console.log('=    https://t.me/HappyCuanAirdrop     ='.cyan);
  console.log('========================================'.cyan);
  console.log();
}

async function checkBalance(provider, address) {
  const balance = await provider.getBalance(address);
  return balance;
}

module.exports = {
  displayHeader,
  checkBalance,
  RPC_URL,
};
