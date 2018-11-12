
const Telegraf = require('telegraf')

const token = '792844945:AAEQeknbg3f6ujQE8VQvQ5pOcnOczz30qC0';
const ADMINS = ['tunght91', 'longvuong', 'alex_9121', 'hothule', ''];
const bot = new Telegraf(token);

const banWords = [
  'exchange',
  'ex-change',
  'e-xchange',
  'ex change',
  'ex.change',
  'e-xchange',
  'exhcange'
];

function checkMessage(msg) {
  if (!msg) return null;

  msg = msg.toLowerCase();

  for (var i = 0; i < banWords.length; i++) {
    if (msg.indexOf(banWords[i]) === 0 || msg.indexOf(' ' + banWords[i]) >= 0) {
      return banWords[i];
    }
  }

  return null;
}

bot.on('message', ctx => {
  var msg = ctx.update.message.text || '';
  var banWord = checkMessage(msg);
  if (banWord) {
    var from = ctx.update.message.from;
    if (ADMINS.indexOf(from.username) >= 0 || from.is_bot) {
      return;
    }
    ctx.reply('Exchange listing won’t never be disclosed, or discussed by any team member in this chat. Follow our blog, Telegram ANN, or signal channel to receive the latest update', {
      reply_to_message_id: ctx.update.message.message_id
    });
  }
});


bot.startPolling()