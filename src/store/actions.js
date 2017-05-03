import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

function overdue(date) {//判断问卷是否过期的方法
    let queDate = date.split('-');
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDate();
    let now = year * 10000 + month * 100 + day;
    let que = queDate[0] * 10000 + queDate[1] * 100 + +queDate[2];
    return que < now;
}

export default {
    getName({ state }) {//得到用户的用户名
        Vue.http.options.root = '.';
        return Vue.http.get('./data.php').then(response => {
            state.name = response.body;
        }, response => {
            alert(`error:${response.headers}`)
        });
    },
    getList({ state, dispatch }) {//得到问卷列表
        return Vue.http.post('./data.php', { "type": "list" })
            .then(response => {
                if (response.body) {
                    state.list = response.body.split('++');
                    for (let [i, v] of state.list.entries()) {
                        state.list[i] = JSON.parse(v);
                        if (overdue(state.list[i].date)) {//判断日期是否过期
                            state.list[i].status = '已过期';
                        }
                    }
                }
            }, response => {
                alert(`error:${response.headers}`)
            });
    },
    save({ state, commit }, arr) {//保存问卷
        state.questionnaire.status = arr.status;
        if (arr.type === 'editing') {
            return Vue.http.post('./data.php', { "type": "mod", "index": arr.index, "data": state.questionnaire })
                .then(response => {
                    console.log(`修改问卷成功并保存，问卷状态为${arr.status}`);
                }, response => {
                    alert(`error:${response.headers}`)
                });
        }
        else {
            return Vue.http.post('./data.php', { "type": "add", "data": state.questionnaire })
                .then(response => {
                    console.log(`增加问卷成功并保存，问卷状态为${arr.status}`);
                }, response => {
                    alert(`error:${response.headers}`)
                });
        }
    },
    removeNaire({ state }, arr) {//删除问卷
        state.list.splice(arr.index, 1)
        return Vue.http.post('./data.php', { "type": "del", "index": arr.index })
            .then(response => {
                console.log(`成功删除第${arr.index + 1}号问卷`);
            }, response => {
                alert(`error:${response.headers}`)
            });
    }
}