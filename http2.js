const http2 = require('http2');
const domain = "discord.com"
const client = http2.connect(`https://${domain}`);
let data = [];
//const body = "hello=world";
//const buffer = Buffer.from(JSON.stringify(body));
const req = client.request({
	":scheme": "https",
	":method": "GET",
	":path":"/",
	"referrer": `https://${domain}/`,
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84"
});
req.on('data', (chunk) => {
	data.push(chunk);
});
req.on('end', () => {
	console.log(data.join(""));
});
req.setEncoding('utf8');
//req.write(buffer);
req.end();
