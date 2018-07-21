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

signed_data = b'''this is some data I'd like to sign'''

signature = binascii.a2b_base64('''
MEQCIEGXT/GAC2le3Edlwde2SBn6GgbNuyuAXoH/amebgg91AiByJDYs+vSlK9lu7QYa5tFcQVBy2dKTokZennTI737jKQ==
''')

key = load_pem_private_key(pem_data, password=None, backend=default_backend())

public_key = key.public_key()
try:
    public_key.verify(signature, signed_data, ec.ECDSA(hashes.SHA256()))
    print ('Signature OK')
except:
    print ('Verification Failed!')
