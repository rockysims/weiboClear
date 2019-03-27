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
			code: req.query.code,
			grant_type: 'authorization_code',
			redirect_uri: 'https://weibo-clear.herokuapp.com/sinaweibo/callback'
		}, function (err: any, result: any, accessToken: string) {
			if (err) res.send(err);
			else {
				weibo.GET('friendships/followers', {
					uid: 6088256551
				}, function(result: any) {
					console.log('friendships/followers result: ', result);
					res.send(result);
				});
			}
		}
	);
});

app.listen(port);



