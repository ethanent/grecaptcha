const w = require('whew')
const Grecaptcha = require('./')

const badClient = new Grecaptcha('nonexistant')
const goodClient = new Grecaptcha('6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe')

w.add('Bad client secret', async (result) => {
	const verifyResponse = await badClient.verify('faketoken')

	if (verifyResponse === false) {
		result(true, 'Response was marked invalid.')
	}
	else result(false, 'Repsonse was marked not invalid.')
})

w.add('Good credentials', async (result) => {
	const verifyResponse = await goodClient.verify('good-token')

	if (verifyResponse === true) {
		result(true, 'Response was marked valid.')
	}
	else result(false, 'Repsonse was marked invalid.')
})

w.test()