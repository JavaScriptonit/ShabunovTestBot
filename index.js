const { againOptions, gameOptions } = require('./options');

const TelegramApi = require('node-telegram-bot-api');

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

      if (text === '/start') {
         await bot.sendMessage(chatId, 'https://tlgrm.eu/_/stickers/987/a9a/987a9af2-cc48-41b1-aa72-011cc4acad4e/256/2.webp');
         return  bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Шабунова Андрея Андреевича https://github.com/JavaScriptonit/ShabunovTestBot`);
      }
      if (text === '/info') {
         return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
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