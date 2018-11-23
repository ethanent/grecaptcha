# grecaptcha
> reCAPTCHA v3 / v2 client for Node

[GitHub](https://github.com/ethanent/grecaptcha) | [NPM](https://www.npmjs.com/package/grecaptcha)

## Install

```shell
npm i grecaptcha
```

## Usage in async context

```javascript
const Grecaptcha = require('grecaptcha')

const client = new Grecaptcha('secret')

if (await client.verify('token')) {
	// reCAPTCHA response was accepted!
}
else {
	// reCAPTCHA token denied.
}
```

## Usage in non-async context

```javascript
const client = new Grecaptcha('secret')

client.verify('token').then((accepted) => {
	if (accepted) {
		// reCAPTCHA response was accepted!
	}
	else {
		// reCAPTCHA token denied.
	}
}).catch((err) =>  {
	// Request failed.
})
```