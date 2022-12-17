const BASE_API_LINK = 'https://api.openweathermap.org/data/2.5'

async function getWeatherInCity(city) {
	const api = `${BASE_API_LINK}/weather?q=${city}&appid=${process.env.API_TOKEN}&units=metric`

	const response = await fetch(api, {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})

	const data = await response.json()

	return { city: data.name, temp: data.main.temp }
}

module.exports = { getWeatherInCity }
