**Алгоритм создания telegram бота:**

to create and set up a bot - [telegramBotApi](https://core.telegram.org/bots/api) \
[Telegram БОТ на JavaScript.youtube](https://www.youtube.com/watch?v=slcqnHIFrj8)

npm init -y === инициализация проекта
* (добавление файла package.json с основной информацией о проекте + зависимости)

git init === инициализация в гите

index.js - добавление token из telegram (@botfather)

npm i node-telegram-bot-api nodemon === скачать бибилиотеку 'node-telegram-bot-api'

Создать команды для бота (bot.setMyCommands)
* команды будут отображаться в menu пользователя

Настроить логику для сообщений (bot.on('message'))
* ответы бота при разных условиях

Настроить логику для повтора игры или победы/поражения (bot.on('callback_query'))
* действия бота при разных условиях