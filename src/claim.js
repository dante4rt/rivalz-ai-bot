const moment = require('moment');

async function claimFragmentz(contract, numClaims) {
  for (let i = 0; i < numClaims; i++) {
    try {
      const responseContract = await contract.claim();

      if (responseContract.hash) {
        console.log(
          `[ ${moment().format(
            'HH:mm:ss'
          )} ] Successfully claimed Fragmentz for address ${
            responseContract.from
          }`.green
        );
        console.log(
          `[ ${moment().format(
            'HH:mm:ss'
          )} ] Check your hash here: https://rivalz2.explorer.caldera.xyz/tx/${
            responseContract.hash
          }`.green
        );
      }
    } catch (error) {
      console.log(
        `[ ${moment().format('HH:mm:ss')} ] Error claiming Fragmentz: ${
          error.message
        }`.red
      );
    }
  }
}

module.exports = {
  claimFragmentz,
};
