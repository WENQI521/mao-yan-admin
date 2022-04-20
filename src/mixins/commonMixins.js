/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-13 19:52:25 Sun
 * @LastEditTime: 2022-03-13 20:10:05 Sun
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
            }
        }
    },
    methods: {
        changePageSize(pageSize) {
            this.pageData.pageSize = pageSize;
        },
        changeCurrentPage(currentPage) {
            this.pageData.currentPage = currentPage;
        }
    }
}
