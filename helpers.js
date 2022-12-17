const getBasicInfoFromCityWeather = apiDATA => {
	if (apiDATA.cod !== 200) return `Інформація не знайдена`

	return `Температура в місті ${apiDATA.name} становить ${apiDATA.main.temp}`
}

module.exports = { getBasicInfoFromCityWeather }
