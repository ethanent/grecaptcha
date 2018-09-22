const c = require('centra')
const qs = require('qs')
const {URL} = require('url')

module.exports = class Client {
	constructor(secret) {
		if (!secret) throw new Error('Missing required reCAPTCHA secret key.')

		this.secret = secret
	}

	async verify (token, remoteip) {
		if (!token) throw new Error('Missing reCAPTCHA response.')

		const res = await c('https://www.google.com/recaptcha/api/siteverify', 'POST')
			.query('secret', this.secret)
			.query('response', token)
			.query('remoteip', remoteip || null)
			.timeout(8000)
			.send()

		const responseBody = await res.json()

		return responseBody.success || false
	}
}