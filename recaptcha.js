const p = require('phin').promisified
const qs = require('qs')
const {URL} = require('url')

module.exports = class Client {
	constructor(secret) {
		if (!secret) throw new Error('Missing required reCAPTCHA secret key.')

		this.secret = secret
	}

	async verify (token, remoteip) {
		if (!token) throw new Error('Missing reCAPTCHA response.')

		const reqUrl = new URL('https://www.google.com/recaptcha/api/siteverify')

		reqUrl.search = qs.stringify({
			'secret': this.secret,
			'response': token,
			'remoteip': remoteip || null
		})
		
		let response = JSON.parse((await p({
			'method': 'POST',
			'url': reqUrl.toString(),
			'timeout': 8000
		})).body)

		return response.success || false
	}
}