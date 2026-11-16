// 날인기 → 비밀번호 잠금 사이트. 사용: node build.js <날인기.html> <출력 폴더>
// app.enc = 화면(도장 글꼴 뺌) · fonts.enc = 도장 글꼴(도장 만들 때만 받음) · ver.json = 바뀌었는지 확인용
const fs = require('fs'), zlib = require('zlib'), crypto = require('crypto'), path = require('path');
const [src, out] = process.argv.slice(2), dir = __dirname;
const K = Buffer.from(fs.readFileSync(path.join(dir, 'key.txt'), 'utf8').trim(), 'base64');
const enc = buf => { const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', K, iv); return Buffer.concat([iv, c.update(zlib.gzipSync(buf, { level: 9 })), c.final(), c.getAuthTag()]); };
let html = fs.readFileSync(src, 'utf8');
const open = '<script type="application/json" id="a1fontsData">', i = html.indexOf(open), j = html.indexOf('</script>', i);
const fonts = html.slice(i + open.length, j); html = html.slice(0, i + open.length) + html.slice(j);
const hash = b => crypto.createHash('sha256').update(b).digest('hex').slice(0, 12);
fs.mkdirSync(out, { recursive: true });
const app = enc(Buffer.from(html)), fe = enc(Buffer.from(fonts));
fs.writeFileSync(path.join(out, 'app.enc'), app); fs.writeFileSync(path.join(out, 'fonts.enc'), fe);
fs.writeFileSync(path.join(out, 'ver.json'), JSON.stringify({ app: hash(html), fonts: hash(fonts) }));
fs.copyFileSync(path.join(dir, 'loader.html'), path.join(out, 'index.html'));
for (const f of ['icon.png', 'manifest.json', 'slot.json', 'sw.js']) if (fs.existsSync(path.join(dir, f))) fs.copyFileSync(path.join(dir, f), path.join(out, f));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('app.enc', app.length, 'bytes · fonts.enc', fe.length, 'bytes');
