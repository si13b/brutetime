# Brutetime

Let's say that you have something that you want to keep secret from yourself or a friend for a fixed period of time. At the time of this writing, there aren't any encryption methods that only allow decryption after a certain period of time. How then do we solve this issue?

Well, current encryption methods are only viable because there aren't machines powerful enough to brute force all possible keys in a reasonable amount of time.

Therefore, we can keep a secret from ourselves for a period of time by encrypting the value with a random key. This key should only be strong enough to withstand a brute force attack for an approximate amount of time given finite computing power.


## Disclaimer

I am not a cryptographer, do not use this for securing important data. No warranty is provided.

The purpose of this tool is to make it difficult, not impossible, for you to access your own or your friend's secret.

You may want to use a password manager such as LastPass or KeePass etc to secure your data.


## Installing

Simply clone the repo and install dependencies:

```
git clone https://github.com/si13b/brutetime.git
cd brutetime
npm install
```

It is expected that you already have NodeJS >= v6.0 installed.


## Usage

If you run the program incorrectly, you will get the usage message below.

```
Usage: brutetime [options] encrypt|decrypt
	--size - Size in bits of the random key (roughly; 24bit <15m, 26bit <1h, 30bit <6h, 32bit <1w)
```

Test with different key sizes to find the approximate brute force time that you desire. The values will vary wildly depending on the computing power available.

NOTE: Decryption could take significantly less than the estimated maximum, if the key is in the lower bound of values.

### Encrypting a value

For example;

```
node brutetime.js encrypt mysecret123 --size 24
```

Results in:

```
# ENCRYPTING
* Encrypted Text: 3b50e6340e5477a5ba8ff4456d53a456
* Key size: 20bits
```

You may want to clear your terminal history at this point to avoid secret retrieval via reverse lookup etc.

### Decrypting (brute forcing) a value

Using the cypher from the previous example:

```
node brutetime.js decrypt 3b50e6340e5477a5ba8ff4456d53a456 --size 24
```

The script will attempt to determine the random key via brute force method. It will give an estimate of how long this will take.

NOTE: The brute force method requires computing power. Expect higher CPU usage and operating temperatures for the duration of the decryption.

## Ideas

* Accuracy of decryption time could be increased by generating multiple random keys and splitting the secret up into separately encrypted parts.
* User interface


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
