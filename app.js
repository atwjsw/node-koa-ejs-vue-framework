var koa = require('koa');
var app = koa();

//路由模块配置
var controller = require('koa-route');

//模板渲染模块配置
var views = require('co-views');
var render = views('./view', {
    map: { html: 'ejs' }
});

//静态资源文件模块配置
var koa_static = require('koa-static-server');
app.use(koa_static({
	rootDir:'./static/',
	rootPath: '/static/',
	maxage : 0
}));

var service = require('./service/webAppService');

app.use(controller.get('/route_test', function*() {
    this.set('Cache-Control', 'no-cache')
    this.body = 'Hello koa!';
}));

app.use(controller.get("/ejs_test", function*() {
	//console.log('render: ' + render('ejs_test', {title: 'ejs_test'}));
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('ejs_test', {title: 'ejs_test'});
	// this.body = render('ejs_test', {title: 'ejs_test'});
}));

app.use(controller.get("/api_test", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));

app.use(controller.get("/api_test_async", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_test_data_async();
}));

app.use(controller.get("/ajax/search", function*() {
	this.set('Cache-Control', 'no-cache');
	var qs = require('querystring');
	var params = qs.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end =params.end;
	var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
    //this.body = service.get_search_data(start, end, keyword);
}));

app.listen(3000);
console.log("Server listened on port 3000");
