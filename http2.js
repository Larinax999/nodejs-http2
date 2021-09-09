const http2 = require('http2');
const domain = "discord.com";
const client = http2.connect(`https://${domain}`);
let data = [];

const fetch = (method,path,payload=null) => new Promise((resolve) => {
	const client = http2.connect(`https://${domain}`);
	const req = client.request({
		":authority": domain,
		":scheme": "https",
		":method": method,
		":path":path,
		"content-type": "application/x-www-form-urlencoded",
		"referrer": `https://${domain}/`,
		"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84"
	});
	let data = [];
	let headers = null;
	req.on('data', (chunk) => {
		data.push(chunk);
	});
	req.on('end', () => {
		return resolve({data:data.join(""),headers:headers});
	});
	req.on('response', (response)=> {
		headers = JSON.parse(JSON.stringify(response));
	});
	req.setEncoding('utf8');
	if (payload != null) {
		req.write(Buffer.from(payload));
	}
	req.end();
});
fetch("GET","/register");
