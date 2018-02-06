/**
 * Created by Et on 2017/11/12.
 */

const fs = require('fs');

/**
 * 将控制器根据key添加到router中
 * @param router koa_router对象
 * @param mapping 控制器文件
 */
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

/**
 * 利用fs自动扫描添加控制器
 * @param router koa_router对象
 * @param dir 扫描路径
 */
function addControllers(router, dir) {
    var files = fs.readdirSync(dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(dir + '/' + f);
        addMapping(router, mapping);
    }
}

/**
 * 导出一个扫描方法
 * @param dir 扫描路径
 * @returns {*} 返回koa_router中间件
 */
module.exports = function (dir) {
    let controllers_dir = dir || '/controller', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};