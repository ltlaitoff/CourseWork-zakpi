require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const { getWeatherInCity } = require('./api.js')
const { getBasicInfoFromCityWeather } = require('./helpers.js')

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
	const cityPerChat = ctx.match[1]

	const data = await getWeatherInCity(cityPerChat)
	const message = getBasicInfoFromCityWeather(data)

	ctx.reply(message)
})

bot.action('setOwnCity', ctx => {
	ctx.reply('Введіть назву міста латинецею')
})

bot.hears(
	value => true,
	async ctx => {
		const city = ctx.message.text
		const data = await getWeatherInCity(city)

		console.log(data)
		const message = getBasicInfoFromCityWeather(data, city)

		ctx.reply(message)
	}
)

bot.launch()
