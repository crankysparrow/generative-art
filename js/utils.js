export const paletteFromUrl = (url) => {
	return url
		.split('coolors.co/')
		.slice(1)[0]
		.split('-')
		.map((c) => '#' + c)
}
