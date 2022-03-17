const encryptMessage = async (sign) => {
  const publicKeyArmored = document.getElementById('public-key').innerHTML;
  const privateKeyArmored = document.getElementById('private-key').innerHTML;

  const [publicKey, privateKey] = await Promise.all([
    openpgp.readKey({ armoredKey: publicKeyArmored }),
    openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
  ]);

  const rawMessage = document.getElementById('message').value;

  const message = await openpgp.createMessage({ text: rawMessage });

  document.getElementById('decrypted-message').value = '';
  document.getElementById('signature').innerHTML = '';
  document.getElementById('decrypt-message').disabled = false;
  document.getElementById('signature-verified').checked = false;

  const encryptedMessage = await openpgp.encrypt({
    message,
    encryptionKeys: publicKey,
    signingKeys: sign ? privateKey : undefined,
  });

  document.getElementById('encrypted-message').value = encryptedMessage;
};

exports = encryptMessage;
