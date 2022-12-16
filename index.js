require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

async function getDataFromServer(city) {
	let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_TOKEN}&units=metric`

	console.log(api)
	let response = await fetch(api, {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})

	let data = await response.json()

	console.log(data)

	let obj = { city: data.name, temp: data.main.temp }

	return obj
}

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
	let data = await getDataFromServer(cityPerChat)
	ctx.reply('температура в місті ' + cityPerChat + ' ' + data.temp)
})

bot.action('setOwnCity', ctx => {
	ctx.reply('введіть назву міста латинецею')
})

bot.hears(/^[a-zA-Z]+$/, async ctx => {
	console.log(ctx.match[0])
	let cityPerChat = ctx.match[0]
	let data = await getDataFromServer(cityPerChat)

	ctx.reply('температура в місті ' + cityPerChat + ' ' + data.temp)
})

bot.launch()
