/**
 * Created by Et on 2017/11/12.
 */
'use strict';

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,//开启接收cookie 如果客户端设置了withCredentials（fetch设置了credentials: "include"）origin不能设置为*
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());

//加载控制器的中间件返回koa_router.routes对象
const cmw = require('./middleWare/controllerMiddleWare');
app.use(cmw(__dirname + '/controller'));

app.listen(9528);
console.log('在9528监听');