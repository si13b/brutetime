const crypto = require('crypto');
const argv = require('minimist')(process.argv.slice(2));

const KEY_SIZE_BITS = 28;

const KEY_MARKER = 'KEY:';

const main = () => {
	if (argv._[0] === 'encrypt') {
		if (!argv._[1]) throw Error('Expecting a secret to encrypt');
		const secret = argv._[1];

		const encryptedText = encrypt(secret, argv.size || KEY_SIZE_BITS);
		console.log('# ENCRYPTING');
		console.log('* Encrypted Text: ' + encryptedText);
		console.log(`* Key size: ${argv.size || KEY_SIZE_BITS}bits`);
		console.log('');
		console.log('');
	} else if (argv._[0] === 'decrypt') {
		if (!argv._[1]) throw Error('Expecting a secret to decrypt');
		const encryptedText = argv._[1];

		const KEY_MAX = Math.pow(2, argv.size || KEY_SIZE_BITS);
		console.log('# DECRYPTING');
		const start = Date.now();
		for (let i = 0; i < KEY_MAX; i++) {
			if (i > 0 && i % 10000 === 0) {
				// Update progress now and then
				console.log(`${i} / ${KEY_MAX} (${Math.floor((i / KEY_MAX) * 10000) / 100}%)`);
				if (i % 100000 === 0) {
					const estimatedSec = (KEY_MAX / i) * ((Date.now() - start) / 1000);
					if (estimatedSec && !isNaN(estimatedSec)) {
						console.log(`Estimated to take a maximum of ${Math.floor(estimatedSec)} sec (${Math.floor(estimatedSec / (60 * 60))}hrs)`);
					}
				}
			}
			const decryptedText = decrypt('' + i, encryptedText);
			if (decryptedText) {
				console.log('DECRYPTED: ' + decryptedText);
				break;
			}
		}
		console.log(`It took ${(Date.now() - start) / 1000} sec`);
	} else {
		throw Error(`
			Usage: brutetime [options] encrypt|decrypt
			
			\t--size - Size in bits of the random key (roughly; 24bit <15m, 26bit <1h, 30bit <6h, 32bit <1w)			
		`)
	}
};

const encrypt = (text, keySize = KEY_MAX) => {
	let key = '' + Math.floor(Math.random() * Math.pow(2, keySize));

	let cipher = crypto.createCipher('aes-256-cbc', key);
	let crypted = cipher.update(KEY_MARKER + text, 'utf-8', 'hex');
	crypted += cipher.final('hex');

	return crypted;
};

const decrypt = (key, data) => {
	try {
		let decipher = crypto.createDecipher('aes-256-cbc', key);
		let decrypted = decipher.update(data, 'hex', 'utf-8');
		decrypted += decipher.final('utf-8');

		return decrypted.indexOf(KEY_MARKER) === 0 ? decrypted.split(KEY_MARKER)[1] : null;
	} catch (e) {
		return null;
	}
};


main();