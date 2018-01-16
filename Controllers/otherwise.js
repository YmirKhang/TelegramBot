'use srict';
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class OtherWiseController extends Telegram.TelegramBaseController {
  handle($) {
    $.sendMessage('Can\'t resolve the command!')
  }
}

module.exports = OtherWiseController;
