require('dotenv').config()
const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', ctx => {
    if (ctx.message.text.indexOf('https://t.me/joinchat') > -1) {
        ctx.deleteMessage()
    }
})
bot.launch().then(() =>
    console.log("Bot started..."))
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))