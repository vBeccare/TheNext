const toFixedValue = (value, decimals) => {
	if (typeof value === 'number')
		return (Math.round(value * 100) / 100).toFixed(decimals)

	return value
}

export const currencyToFloat = (val = '') => {
	if (val === '') return val
	if (typeof val !== 'number') {
		return parseFloat(
			val.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
		)
	} else {
		return val
	}
}

export const getMoneyMask = (value = '', prefix = 'R$', decimals) => {
	if (value === '') return value

	let formattedValue = toFixedValue(value, decimals)

	if (formattedValue >= 0) {
		formattedValue = formattedValue.replace(/\D/g, '')
	} else {
		formattedValue = `-${formattedValue.replace(/\D/g, '')}`
	}

	let int = parseInt(formattedValue.replace(/\D/g, ''), 10)
	if (isNaN(int)) return ''

	if (formattedValue.length === 1 && !!decimals) {
		formattedValue = `0,${'0'.repeat(decimals - 1)}${formattedValue}`
	} else if (formattedValue.length >= decimals && !!decimals) {
		formattedValue = formattedValue.replace(
			new RegExp(`(\\d{${decimals}}$)`),
			',$1'
		)
	}

	if (!!decimals) formattedValue = currencyToFloat(formattedValue)

	const options = {
		minimumFractionDigits: decimals,
	}

	const result = Intl.NumberFormat('pt-BR', options).format(formattedValue)

	return result.length === 0 ? '' : `${prefix}${result}`
}