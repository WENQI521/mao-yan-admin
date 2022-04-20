/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 18:57:11 Tue
 * @LastEditTime: 2022-02-22 20:22:03 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from "vue";

Vue.filter("userTypeFilter", function (val) {
    if (val == 1) {
        return "普通用户";
    } else if (val == 2) {
        return "管理员";
    } else if (val == 3) {
        return "超级管理员";
    } else {
        return "暂无";
    }
});

Vue.filter("orderStatusFilter", function (val) {
    if (val == "completed") {
        return "已完成";
    } else {
        return "未完成";
    }
});

Vue.filter("userNameFilter", function (val) {
    if (val) {
        return val.userName
    } else {
        return "用户已注销";
    }
});

Vue.filter("nullFilter", function (val) {
    if (val) {
        return val;
    }
    return "暂无";
});

Vue.filter("filmType", function (val) {
    if (val == "1") {
        return "爱情"
    }
    if (val == "2") {
        return "喜剧"
    }
    if (val == "3") {
        return "动画"
    }
    if (val=="4"){
        return "剧情"
    }
    if (val=="5"){
        return "惊悚"
    }
    if (val=="6"){
        return "科幻"
    }
    if (val=="7"){
        return "动作"
    }
    if (val=="8"){
        return "悬疑"
    }
    if (val=="9"){
        return "犯罪"
    }
    if (val=="10"){
        return "冒险"
    }
    if (val=="11"){
        return "战争"
    }
    if (val=="12"){
        return "奇幻"
    }
    if (val=="13"){
        return "运动"
    }
    if (val=="14"){
        return "武侠"
    }
    if (val=="15"){
        return "历史"
    }


});


