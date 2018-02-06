/**
 * Created by Et on 2017/12/10.
 */
'use strict'
const dbController = require('../db/dbController');
const util = require('./util');

let resumeModule = {
    getSkills: async (userId) => {
        let data = {};
        try {
            var p = await dbController.getSkills(userId);
            if (p.length == 0) {
                data.REV = false;
                data.MSG = '未查询到数据';
            } else {
                data.REV = true;
                var leftSkills = [],
                    rightSkills = [];
                //将data拆分成左右显示的两组
                p.forEach(function (item, index) {
                    if (index % 2 === 0) {
                        leftSkills.push(item)
                    } else {
                        rightSkills.push(item)
                    }
                });
                data.DATA = {
                    leftSkills: leftSkills,
                    rightSkills: rightSkills
                };
            }
        } catch (err) {
            data.REV = false;
            data.MSG = err.message;
        }
        return data;
    },
    getProject: async (userId) => {
        let data = {};
        try {
            var projects = await dbController.getProject(userId);
            if (projects.length == 0) {
                data.REV = false;
                data.MSG = '未查询到项目信息';
            } else {
                var projectArr = [];
                projects.forEach(function (item, index) {
                    let skillArr = item.skill.split('|'),
                        skills = item.skill ? [] : '';
                    item.skill && skillArr.forEach(function (item, index) {
                        skills.push({
                            index: index,
                            name: item
                        });
                    });
                    let imgArr = item.imgList.split('|'),
                        imgs = item.imgList ? [] : '';
                    item.imgList && imgArr.forEach(function (item, index) {
                        imgs.push({
                            index: index,
                            url: item
                        });
                    });
                    projectArr.push({
                        index: index,//索引值
                        name: item.projectName,
                        alias: item.projectAlias,
                        img: item.img,
                        projectBg: item.projectBg,
                        projectTask: item.projectTask,
                        projectDesc: item.projectDesc,
                        projectRes: item.projectRes,
                        skills: skills,
                        time: item.time,
                        company: item.company,
                        androidUrl: item.androidUrl,
                        iosUrl: item.iosUrl,
                        webUrl: item.webUrl,
                        imgList: imgs
                    });
                });
                // 初始化返回数据
                data.REV = true;
                data.DATA = {
                    project: projectArr
                };
            }
        } catch (err) {
            data.REV = false;
            data.MSG = err.message;
        }
        return data;
    },
    /**
     * 获取首页信息
     * @param userId
     * @returns {Promise.<{}>}
     */
    getMainInfo: async (userId) => {
        let data = {};
        try {
            var personArr = await dbController.getPerson(userId),
                jobArr = await dbController.getJob(userId),
                intensionArr = await dbController.getIntension(userId);
            if (personArr.length == 0) {
                data.REV = false;
                data.MSG = '没有该用户信息';
            }
            else {
                let person = personArr[0],
                    work = [],
                    workInfo = [];

                // 初始化工作经历
                jobArr.forEach(function (item, index) {
                    let worktem1 = {},
                        worktem2 = {};
                    worktem2.company = worktem1.company = jobArr[index].company;
                    worktem2.position = worktem1.position = jobArr[index].position;
                    worktem2.jobDesc = jobArr[index].jobDesc;
                    worktem2.companyNature = jobArr[index].companyNature;
                    let bt = jobArr[index].beginTime,
                        et = jobArr[index].endTime;
                    worktem2.timeTrunk = `${bt.getFullYear()}.${bt.getMonth() + 1}~${et.getFullYear() == 2222 ? '至今' : `${et.getFullYear()}.${et.getMonth() + 1}`}`;
                    work.push(worktem1);
                    workInfo.push(worktem2);
                });

                // 学习时间
                let lebt = person.beginTime,
                    leet = person.endTime;

                // 初始化返回数据
                data.REV = true;
                data.DATA = {
                    personInfo: {
                        name: person.userName,
                        sex: person.sex,
                        age: util.getTimeSub(new Date(), person.birthday).year + '岁',
                        education: person.education,
                        workTime: util.getTimeSub(new Date(), person.endTime).year + 1 + '工作经验',
                        tel: person.tel,
                        email: person.email,
                        work: work
                    },
                    workInfo: workInfo,
                    intension: intensionArr,
                    education: {
                        school: person.school,
                        learnTime: `${lebt.getFullYear()}.${lebt.getMonth() + 1}~${leet.getFullYear() == 2222 ? '至今' : `${leet.getFullYear()}.${leet.getMonth() + 1}`}`,
                        education: person.education,
                        degree: person.degree,
                        major: person.major,
                        nature: person.nature
                    }
                };
            }
        } catch (err) {
            data.REV = false;
            data.MSG = err.message;
        }
        return data;
    },
};

module.exports = resumeModule;