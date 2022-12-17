require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const { getWeatherInCity } = require('./api.js')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
	ctx.replyWithHTML('Оберіть, будь ласка, місто', {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: 'London', callback_data: 'setCity-London' },
					{ text: 'Kharkiv', callback_data: 'setCity-Kharkiv' },
				],
				[
					{ text: 'Bodegraven', callback_data: 'setCity-Bodegraven' },
					{ text: 'Szczecin', callback_data: 'setCity-Szczecin' },
				],
				[{ text: 'Мій варіант', callback_data: 'setOwnCity' }],
			],
		},
	})
})

bot.hears(/Привіт+/i, ctx => {
	ctx.reply('\u{1F44B}')
})

bot.action(/^setCity-(\w+)$/, async ctx => {
	console.log(ctx.match[1])
	let cityPerChat = ctx.match[1]
	let data = await getWeatherInCity(cityPerChat)
	ctx.reply('температура в місті ' + cityPerChat + ' ' + data.temp)
})

bot.action('setOwnCity', ctx => {
	ctx.reply('введіть назву міста латинецею')
})

bot.hears(/^[a-zA-Z]+$/, async ctx => {
	console.log(ctx.match[0])
	let cityPerChat = ctx.match[0]
	let data = await getWeatherInCity(cityPerChat)

	ctx.reply('температура в місті ' + cityPerChat + ' ' + data.temp)
})

bot.launch()
