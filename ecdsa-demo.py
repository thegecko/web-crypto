#!/usr/bin/env python3
import binascii
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import load_pem_private_key

pem_data = '''
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgFwFnim4kzQbjoQeb
adZSY/5Y/id7e+YHLeXvEefz9jShRANCAARkEgvpF+/kfighaDxEEEtPgNUAxfks
Tn6vTUir03NGVpxEJkYcZpTylD4aq0ubjUnPpOXYFElCuzIObYBp5zWj
-----END PRIVATE KEY-----
'''

private_key = load_pem_private_key(pem_data, password=None, backend=default_backend())

#private_key = ec.generate_private_key(
#    ec.SECP256R1(), default_backend()
#)

print('Private key:\n{}'.format(private_key.private_bytes(
    serialization.Encoding.PEM,
    serialization.PrivateFormat.PKCS8,
    serialization.NoEncryption()
)))
data = b"this is some data I'd like to sign"
print('Data to sign:\n{}'.format(data))
signature = private_key.sign(
    data,
    ec.ECDSA(hashes.SHA256())
)
print('Signature:\n{}'.format(binascii.b2a_base64(signature)))
public_key = private_key.public_key()
public_key.verify(signature, data, ec.ECDSA(hashes.SHA256()))
