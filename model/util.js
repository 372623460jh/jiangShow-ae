/**
 * Created by Et on 2018/1/22.
 */
'use strict'

let resumeModule = {
    //求两个date时间差
    getTimeSub: function (nowTime, oldTime) {
        let d = nowTime.getTime() - oldTime.getTime();  //时间差的毫秒数

        //计算出相差天数
        var year = Math.floor(d / (24 * 3600 * 1000 * 365));

        //计算出相差天数
        var leave0 = d % (24 * 3600 * 1000 * 365);    //计算天数后剩余的毫秒数
        var days = Math.floor(leave0 / (24 * 3600 * 1000));

        //计算出小时数
        var leave1 = leave0 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));

        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));

        //计算相差秒数
        var leave3 = leave2 % (60 * 1000);    //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);

        return {
            year: year,
            day: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }
};

module.exports = resumeModule;