import Vue from 'vue'

export default {
    getName({ state }) {//得到用户的用户名
        Vue.http.options.root = '.';
        return Vue.http.get('./data.php').then(response => {
            state.name = response.body;
        }, response => {
            alert("error" + response.headers)
        });
    },
    getList({ state }) {//得到问卷列表
        return Vue.http.post('./data.php', { "type": "list" })
            .then(response => {
                if (response.body != 0) {
                    if (response.body.indexOf("++") !== -1) {
                        state.list = response.body.split('++');
                    }
                    else {
                        state.list[0] = response.body;
                    }
                    for (var i = 0; i < state.list.length; i++) {
                        state.list[i] = JSON.parse(state.list[i]);
                    }
                }
                else {
                    state.list = []
                }

            }, response => {
                alert("error" + response.headers)
            });
    },
    save({ state, commit }, arr) {//保存问卷
        state.questionnaire.status = "未发布";
        if (arr.index != undefined) {
            return Vue.http.post('./data.php', { "type": "mod", "index": arr.index, "data": state.questionnaire })
                .then(response => {
                    console.log('修改问卷成功并保存，问卷状态为未发布');
                    commit('switchEditing', { boolean: false });
                }, response => {
                    alert("error" + response.headers)
                });
        }
        else {
            return Vue.http.post('./data.php', { "type": "add", "data": state.questionnaire })
                .then(response => {
                    console.log('增加问卷成功并保存，问卷状态为未发布');
                }, response => {
                    alert("error" + response.headers)
                });
        }
    },
    submit({ state, commit }, arr) {//保存并把问卷状态改为发布
        state.questionnaire.status = "已发布";
        if (arr.index != undefined) {
            return Vue.http.post('./data.php', { "type": "mod", "index": arr.index, "data": state.questionnaire })
                .then(response => {
                    console.log('修改问卷成功并保存，问卷状态为已发布');
                    commit('switchEditing', { boolean: false });
                }, response => {
                    alert("error" + response.headers)
                });
        }
        else {
            return Vue.http.post('./data.php', { "type": "add", "data": state.questionnaire })
                .then(response => {
                    console.log('增加问卷成功并保存，问卷状态为已发布');
                }, response => {
                    alert("error" + response.headers)
                });
        }
    },
    reset({ state }, arr) {//重置正在编辑的问卷
        if (arr) {
            return Vue.http.post('./data.php', { "type": "get", "index": arr.index })
                .then(response => {
                    state.questionnaire = JSON.parse(response.body);
                    console.log('成功重置正在编辑的问卷');
                }, response => {
                    alert("error" + response.headers)
                });
        }
        else {
            state.questionnaire = { title: '请输入标题', questions: [{ type: 'radio', title: '请输入标题', required: false, options: ['选项', '选项'] }], date: '', status: '未保存' }
        }
    },
    removeNaire({ state }, arr) {//删除问卷
        state.list.splice(arr.index, 1)
        return Vue.http.post('./data.php', { "type": "del", "index": arr.index })
            .then(response => {
                console.log('成功删除问卷');
            }, response => {
                alert("error" + response.headers)
            });
    }
}