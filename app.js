require('dotenv').config()
const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', ctx => {
    if (ctx.message.text.indexOf('https://t.me/joinchat') > -1) {
        ctx.deleteMessage()
        const chatId = ctx.chat.id
        const userId = ctx.message.from.id
        ctx.telegram.restrictChatMember(chatId, userId, {
            permissions: {
                can_send_messages: false,
                can_send_media_messages: false,
                can_send_polls: false,
                can_send_other_messages: false,
                can_add_web_page_previews: false,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false,
            },
            until_date: Date.now() + 60 * 60 * 1000,
        }).then(r => console.log("SUCCESS"))
    }
})
bot.launch().then(() =>
    console.log("Bot started..."))
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))