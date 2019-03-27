import express from 'express';
const SinaWeibo = require('node-sina-weibo');

const app = express();
const port = process.env.PORT || 8080;

const weibo = new SinaWeibo(process.env.WEIBO_CLIENT_ID, process.env.WEIBO_CLIENT_SECRET);

app.get('/', (req, res) => {
	res.send('working');
});

app.get('/login', (req, res) => {
	const weiboLoginUrl = weibo.getAuthorizeUrl({
		redirect_uri:'https://weibo-clear.herokuapp.com/sinaweibo/callback',
		response_type:'code'
	});

	res.redirect(weiboLoginUrl);
});

app.get('/sinaweibo/callback', (req, res) => {
	weibo.getAccessToken({
			code: req.params.code,
			grant_type: 'authorization_code',
			redirect_uri: 'https://weibo-clear.herokuapp.com/sinaweibo/callback2'
		}, function (err: any, result: any, accessToken: string) {
			if (err) res.send(err);
			else {
				weibo.GET('Friendships/followers', {}, function(result: any) {
					console.log('Friendships/followers result: ', result);
					res.send(result);
				});
			}
		}
	);
});

app.get('/sinaweibo/callback2', (req, res) => {
	res.send('/sinaweibo/callback2 working');
});

app.listen(port);



