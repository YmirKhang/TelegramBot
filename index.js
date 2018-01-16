'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const MemoryStorage = require('./adapters/MemoryStorage');
const storage = new MemoryStorage(`${__dirname}/data/userStorage.json`,`${__dirname}/data/chatStorage.json`)
const apikey = require('./data/apikey.json');
const tg = new Telegram.Telegram(apikey['key'], {
  workers: 1,
  storage: storage
});
const ToDoController = require('./Controllers/todo'), OtherWiseController = require('./Controllers/otherwise');

const ToDoInstance = new ToDoController();
tg.router
    .when(new TextCommand('/add', 'addCommand'), ToDoInstance)
    .when(new TextCommand('/list', 'getCommand'), ToDoInstance)
    .when(new TextCommand('/check', 'checkCommand'), ToDoInstance)
    .otherwise(new OtherWiseController());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null,1));
