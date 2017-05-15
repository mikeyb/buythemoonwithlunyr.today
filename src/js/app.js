var Web3 = require('web3');
var m = require('mithril');

var web3 = new Web3(new Web3.providers.HttpProvider("https://buythemoonwithlunyr.today:9001")); // miko controlled

var LUNabi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vaultPercentOfTotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"crowdfundPercentOfTotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeCrowdfunding","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lunyrPercentOfTotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"upgrade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeMaster","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"finalizedCrowdfunding","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"hundredPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isLunyrToken","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lunyrMultisig","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingEndBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"ok","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalUpgraded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingStartBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"agent","type":"address"}],"name":"setUpgradeAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"create","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"newWallet","type":"address"}],"name":"setMultiSigWallet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"timeVault","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokensPerEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"master","type":"address"}],"name":"setUpgradeMaster","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_lunyrMultisig","type":"address"},{"name":"_upgradeMaster","type":"address"},{"name":"_fundingStartBlock","type":"uint256"},{"name":"_fundingEndBlock","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Upgrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Refund","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"upgradeAgent","type":"address"}],"name":"UpgradeFinalized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"agent","type":"address"}],"name":"UpgradeAgentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');
var LUNaddress = '0xfa05A73FfE78ef8f1a739473e462c54bae6567D9';
var MOONaddress = '0x910c8b3366e4e27201df417d9d05476850e12ead'; // miko controlled
// var MOONaddress = '0x37b6ffba2a6d2f4e9796bfc2ac2259edb03ba2dc'; // >0<10LUN (random: https://etherscan.io/token/Lunyr#balances)
// var MOONaddress = ' 0xdaf830a124db4b5492952c29611f4d359ee27a35'; // >10LUN (random: https://etherscan.io/token/Lunyr#balances)
var LUNcontract = web3.eth.contract(LUNabi).at(LUNaddress);

var progressbarElement = document.getElementsByTagName('progressbar')[0];
var depositElement = document.getElementsByTagName('deposit')[0];

var checkProgressThreshold =
{

  returnProgressThreshold: function ()
  {

    var progressValue = getProgress.returnProgress();

    if (progressValue >= 10)
    {
      return 100;
    } else if (progressValue > 0 && progressValue < 10)
    {
      progressValue = progressValue / 10 * 100;
      return progressValue.toFixed(2);
    } else {
      return 0;
    }

  }

}

var getProgress =
{

  returnProgress: function ()
  {
    return web3.fromWei(LUNcontract.balanceOf(MOONaddress), 'ether').toString();
  }

}

var setProgress =
{

  view: function ()
  {

    var progress = checkProgressThreshold.returnProgressThreshold();

    return m("progress",
      {
        class: "progress is-success",
        value: progress,
        max: 100
      },
      progress + '%'
    );

  }

}

function setProgressLoop ()
{

    setTimeout(function ()
    {
      // m.mount(progressbarElement, setProgress);
      m.redraw();
    }, 30000);

    m.mount(progressbarElement, setProgress);

}

var depositAddress =
{

  view: function ()
  {

    return m("deposit",
      {
        class: "tag is-info is-fullwidth has-text-centered"
      },
      'Send LUN to: ' + MOONaddress
    );

  }

}

var setDepositAddress =
{

  view: function ()
  {

    var progress = checkProgressThreshold.returnProgressThreshold();

    if (progress >= 100)
    {
      return m("deposit",
        {
          class: "button is-info is-info is-outlined is-fullwidth has-text-centered"
        },
        'Crowdsale is over.  Look for the Moon in a sky near you!');
    } else
    {
      return m("deposit",
        {
          onclick: function ()
          {
            m.mount(depositElement, depositAddress)
          },
          class: "button is-danger is-info is-outlined is-fullwidth has-text-centered"
        },
        'I UNDERSTAND I MAY NEVER SEE THIS LUN AGAIN'
      );
    }

  }

}

m.mount(depositElement, setDepositAddress);
setProgressLoop();