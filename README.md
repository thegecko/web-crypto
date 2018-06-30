# web-crypto

Check this https://diafygi.github.io/webcrypto-examples/

## All Browsers
- Web Crypto cannot derive a public key from a private one
- Unable to confirm the generated signature was correct (worked in chrome browser, not in python tests)

## Firefox
Import and export of private ECDSA keys unsupported: https://bugzilla.mozilla.org/show_bug.cgi?format=default&id=1133698

## Safari
Looks like ECDSA is entirely unsupported

## IE
In IE 5.5 compatibilty mode, web crypto will never work at all

## Edge
Untested
