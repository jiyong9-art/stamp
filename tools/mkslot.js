// 시험용: node mkslot.js <비밀번호> <출력 slot.json>
const crypto = require('crypto'), fs = require('fs');
const K = Buffer.from(fs.readFileSync(__dirname + '/key.txt', 'utf8').trim(), 'base64'), salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), iter = 300000;
const wk = crypto.pbkdf2Sync(process.argv[2], salt, iter, 32, 'sha256'), c = crypto.createCipheriv('aes-256-gcm', wk, iv);
const ct = Buffer.concat([c.update(K), c.final(), c.getAuthTag()]);
fs.writeFileSync(process.argv[3], JSON.stringify({ salt: salt.toString('base64'), iv: iv.toString('base64'), iter, ct: ct.toString('base64') }));
