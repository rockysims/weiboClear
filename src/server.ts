import express from 'express';
const SinaWeibo = require('node-sina-weibo');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send('working');
});

app.get('/go', (req, res) => {
	const weibo = new SinaWeibo(process.env.WEIBO_CLIENT_ID, process.env.WEIBO_CLIENT_SECRET);

	const url = weibo.getAuthorizeUrl({
		redirect_uri:'https://weibo-clear.herokuapp.com/sinaweibo/callback',
		response_type:'code'
	});

	res.write('url: ');
	res.write(url);
	res.write(' end.');
	res.end();
});

app.get('/sinaweibo/callback', (req, res) => {
	res.send('/sinaweibo/callback working');
});

app.listen(port);



