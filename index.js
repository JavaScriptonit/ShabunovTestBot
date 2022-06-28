const { againOptions, gameOptions } = require('./options');
const TelegramApi = require('node-telegram-bot-api');
const { stickers } = require("./stickers");
const token = '5331372857:AAFenSlpTWqCrb-5yFB5YsMsjqBh-_qF3rk';
const bot = new TelegramApi(token, {polling: true});
const chats = {}

const startGame = async (chatId) => {
   await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её отгадать`);
   const randomNumber = Math.floor(Math.random() * 10);
   chats[chatId] = randomNumber;
   await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
   bot.setMyCommands([
      {command: '/start', description: 'Начальное приветствие'},
      {command: '/info', description: 'Получить информацию о пользователе'},
      {command: '/game', description: 'Игра угадай цифру'},
   ]);

   bot.on('message', async msg => {
      const text = msg.text;
      const chatId = msg.chat.id;
      const userName = `${msg.from.first_name} ${msg.from.last_name}`;

      if (text === '/start') {
         await bot.sendSticker(chatId, stickers.disney.pocahontas);
         return  bot.sendMessage(chatId, `${userName}, добро пожаловать в телеграм бот Шабунова Андрея Андреевича`);
      }
      if (text === '/info') {
         await bot.sendSticker(chatId, stickers.disney.allIn);
         return  bot.sendMessage(chatId, `Тебя зовут ${userName}`);
      }
      if (text === '/game') {
         return startGame(chatId);
      }
      return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!');
   });

   bot.on('callback_query', async msg => {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      if (data === '/again') {
         return startGame(chatId);
      }
      if (Number(data) === Number(chats[chatId])) {
         return await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
      } else {
         return await bot.sendMessage(chatId, `К сожалению, ты не угадал, бот загадал ${chats[chatId]}`, againOptions);
      }
   });
}

start();