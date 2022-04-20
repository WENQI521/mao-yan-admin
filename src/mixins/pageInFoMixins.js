/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-13 19:52:25 Sun
 * @LastEditTime: 2022-03-13 20:12:01 Sun
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
export default {
    data() {
        return {
            pageData: {
                currentPage: 1,
                pageSize: 10,
            },
            pageSizeList: [10, 20, 50],
            dialogObj: {
                add: false,
                update: false
            },
            filmType: [
                {
                    "_id": "1",
                    "filmType": "爱情"
                },
                {
                    "_id": "2",
                    "filmType": "喜剧"
                },
                {
                    "_id": "3",
                    "filmType": "动画"
                },
                {
                    "_id": "4",
                    "filmType": "剧情"
                },
                {
                    "_id": "5",
                    "filmType": "惊悚"
                },
                {
                    "_id": "6",
                    "filmType": "科幻"
                },
                {
                    "_id": "7",
                    "filmType": "动作"
                },
                {
                    "_id": "8",
                    "filmType": "悬疑"
                },
                {
                    "_id": "9",
                    "filmType": "犯罪"
                },
                {
                    "_id": "10",
                    "filmType": "冒险"
                },
                {
                    "_id": "11",
                    "filmType": "战争"
                },
                {
                    "_id": "12",
                    "filmType": "奇幻"
                },
                {
                    "_id": "13",
                    "filmType": "运动"
                },
                {
                    "_id": "14",
                    "filmType": "武侠"
                },
                {
                    "_id": "15",
                    "filmType": "历史"
                }
            ],
        }
    },
}
