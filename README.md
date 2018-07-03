# web-crypto

Check this https://diafygi.github.io/webcrypto-examples/

## Results
**Check the results in the `/results` folder of this repo**

The [webcrypto-examples](https://diafygi.github.io/webcrypto-examples/) repo has been ran for all major browser releases for the following versions:
- chrome: 67.0.3396.99;
- firefox: 60.0.2;
- safari: 11.1.1;
- edge: 41.16299.492.0;
- opera: 54.0;

## Percentage support with latest browsers
- Sessions **with no key** import / export: 89%;
- Users **with no key** import / export: 85%;

- Sessions **with** key import / export: 73%;
- Users **with** key import / export: 65%;



## All Browsers
- Web Crypto cannot derive a public key from a private one
- Unable to confirm the generated signature was correct (worked in chrome browser, not in python tests)
- Mobile web browsers won't be supported at all

## Firefox
Import and export of private ECDSA keys unsupported: https://bugzilla.mozilla.org/show_bug.cgi?format=default&id=1133698

## Safari
Known issues on safari: 10.x.x: 
- ECDSA is entirely unsupported

## IE
In IE 5.5 compatibilty mode, web crypto will never work at all

## Edge
- ECDSA is entirely unsupported
