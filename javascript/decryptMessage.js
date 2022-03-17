const decryptMessage = async () => {
  const publicKeyArmored = document.getElementById('public-key').innerHTML;
  const privateKeyArmored = document.getElementById('private-key').innerHTML;

  const [publicKey, privateKey] = await Promise.all([
    openpgp.readKey({ armoredKey: publicKeyArmored }),
    openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
  ]);

  const rawEncryptedMessage = document.getElementById('encrypted-message').value;
  const message = await openpgp.readMessage({
    armoredMessage: rawEncryptedMessage,
  });

  const { data: decryptedMessage, signatures } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey,
    verificationKeys: publicKey,
  });

  document.getElementById('decrypt-message').disabled = true;
  document.getElementById('decrypted-message').value = decryptedMessage;

  if (signatures.length > 0) {
    const [isVerified, signature] = await Promise.all([
      signatures[0].isVerified,
      signatures[0].signature,
    ]);
    document.getElementById('signature').value = JSON.stringify(signature, null, 2);
    document.getElementById('signature-verified').checked = true;
  }
};

exports = decryptMessage;
