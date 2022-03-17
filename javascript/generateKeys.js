const generateKeys = async () => {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name: 'Rafael', email: 'rafael@pki-playground.com' }],
    format: 'armored',
  });
  
  document.getElementById('public-key').innerHTML = publicKey;
  document.getElementById('private-key').innerHTML = privateKey;

  document.getElementById('encrypt').disabled = false;
  document.getElementById('encrypt-and-sign').disabled = false;

  document.getElementById('encrypted-message').value = '';
  document.getElementById('decrypted-message').value = '';
  document.getElementById('signature').value = '';
  document.getElementById('signature-verified').checked = false;
};

exports = generateKeys;
