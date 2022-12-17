const BASE_API_LINK = 'https://api.openweathermap.org/data/2.5'

async function getWeatherInCity(city) {
	const api = `${BASE_API_LINK}/weather?q=${city}&appid=${process.env.API_TOKEN}&units=metric&lang=ua`

	const response = await fetch(api, {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})

	return await response.json()
}

module.exports = { getWeatherInCity }
