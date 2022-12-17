const getBasicInfoFromCityWeather = (apiDATA, userCity) => {
	if (apiDATA.cod !== 200) return `Інформація по місцю ${userCity} не знайдена`

	return `Температура в місті ${userCity} становить ${apiDATA.main.temp}`
}

module.exports = { getBasicInfoFromCityWeather }
