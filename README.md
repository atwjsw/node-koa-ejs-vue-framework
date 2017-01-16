# node-koa-ejs-vue-framework
basic framework for node-koa-ejs-vue-framework integration

## 整个项目的开发
1. 阅读器模块 （页面交互行为比较多，服务器交互行为比较标准）
2. 首页：导航条/书城、书架、搜索； 搜索条；活动区域；活动页面简单（体力活）
3. 首页： 书城和书架的tab切换， 尽量做的跟native app接近。animate.css动画
4. 频道页
5. 列表页： 数据展示，分区域和专栏
6. 搜索模块: 
7. 分类和业务排行的展示
8. 引入了vuejs和koa 

## 技术架构
1. 页面-nodejs-后端
2. 页面层：vuejs, 页面渲染js, css, 本地交互逻辑， 客户端模板渲染（vuejs）
3. nodejs：服务前端，proxy，中间层，路由，后端交互（AJAX+Mongoose），服务端模板渲染（ejs)
4. 服务后端：提供restful API，返回json数据结构的文件。transaction/security

1+2 = 大前端
1+2 语言统一

- 页面会跟直接调用后端API吗？
- 业务逻辑都在nodejs层了吧？

- vue与ejs的集成，返回的ejs模板中写好了vue模板和js？
ejs用于主要页面的跳转， vue用于单页面内、局部的DOM的动态渲染
通过Express返回response, response中为渲染后的ejs模板，中间内嵌了vue模板{{}}和js代码
前端交互触发vue js代码的执行，重新渲染DOM

- 哪些数据需要vue渲染，哪些需要ejs渲染？前端和后端模板的分工？
ejs用于主要页面的跳转， vue用于单页面内、局部的DOM的动态渲染；
nodejs后端模板主要是指字符串模板，<%= name =%>这种。后端服务器用数据覆盖placeholder并作为response body返回。所以看到的html已经有所有的DOM节点和节点的内容和样式了。
前端模板好像vuejs的模板的内容是动态变化的，看源码看不到所有的html内容的，但看元素可以看到。

后端Java/Spring使用的模板引擎如velocity/freemarker，本质上跟nodejs ejs一类是一样的。
vue/angular js是对DOM的内容，样式进行动态改变

- bower来管理vue？
- express/koa与vue/anglular的交互？
vue/angular可以通过AJAX与express和koa服务器接口交互，vue-resource？

- express和前端框架数据交互， express和vue.js之间的数据是怎么传输的。
express 搭建的是一个restful 程序，提供了一些http接口让前端页面访问数据，前端通过ajax发送这些请求去获取或者修改数据。
express抛出一个异步接口，用vue-resource请求数据。如果存在跨域，还要解决一下跨域问题。
刚转前端，工作中的项目都是node,express配合用的，也想听听express

- 对DOM的操作有哪些？
改造样式（背景颜色，字体，大小，边框）；改变内容：元素的InnerHtml，image的src
用原生JS/jquery，需要监听事件，获取DOM元素，改属性，改样式、改内容
用vue或者angular JS则自动渲染

## 目录结构
1. mock - 模拟后台数据 = 后端接口
2. service - 业务逻辑 + DAO， 从后端获取数据，数据操作，渲染服务端模板，
3. static - css/js/image等前端静态文件，会按需下载到浏览器上，缓存起来，
4. view - 服务端模板, include
5. node_modules - 依赖管理

## 项目开发步骤：
1. 搭建目录结构
2. 用koa搭建框架
2.1 路由测试 
- var controller = require('koa-route'); 
- controller.get("/route_test", function* ()
2.1.1 路由部分还要有URL参数解析
- URL参数 （get）
- body中的参数（post）
- 
2.2 静态资源访问，不可能每个静态资源都写个路由吧。
2.3 如何渲染模板，并返回客户端
- var views = require('co-views')
- var render = views('./view', {
	map : { html : 'ejs'}
});
- 用ejs模板引擎，模板放在./view下面
this.body = yield render('ejs_test', {title: 'ejs_test'});
渲染./view/ejs_test.html模板，传入模板数据的json对象
2.4 后端Mock数据交互
- 在mock数据目录建json格式数据文件
- service目录下创建后端交互js文件， fs读取json文件
- 引入service模块js文件
2.5 后端http数据交互
- 企业中，一般用nodejs直接连接数据库的情况比较少，一般是通过http连接后端写好的服务器接口， nodejs连接数据库性能一般不是很好
