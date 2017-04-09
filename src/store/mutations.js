import Vue from 'vue'

export default {
    getName(state) {//得到用户的用户名
        Vue.http.options.root = '.';
        Vue.http.get('./data.php').then(response => {
            state.name = response.body;
        }, response => {
            alert("error" + response.headers)
        });
    },
    modNaireTitle(state, arr) {//修改问卷标题
        state.questionnaire.title = arr.title
    },
    addQuestion(state, arr) {//添加指定类型的问题
        state.questionnaire.questions.push({ type: arr.type, title: '请输入标题', required: false, options: ['选项', '选项'] })
    },
    modQuestionTitle(state, arr) {//修改问卷标题
        state.questionnaire.questions[arr.index].title = arr.title
    },
    modQuestionRequired(state, arr) {//修改问题是否必填
        state.questionnaire.questions[arr.index].required = arr.required
    },
    upQuestion(state, arr) {//上移问题
        var cur = state.questionnaire.questions[arr.index];
        var pre = state.questionnaire.questions[arr.index - 1];
        state.questionnaire.questions.splice(arr.index - 1, 1, cur);
        state.questionnaire.questions.splice(arr.index, 1, pre);

    },
    downQuestion(state, arr) {//下移问题
        var cur = state.questionnaire.questions[arr.index];
        var aft = state.questionnaire.questions[arr.index + 1];
        state.questionnaire.questions.splice(arr.index + 1, 1, cur);
        state.questionnaire.questions.splice(arr.index, 1, aft);

    },
    copyQuestion(state, arr) {//复用问题
        var cur = state.questionnaire.questions[arr.index];
        state.questionnaire.questions.push(cur);
    },
    removeQuestion(state, arr) {//删除问题
        state.questionnaire.questions.splice(arr.index, 1);
    },
    addOption(state, arr) {//添加选项
        state.questionnaire.questions[arr.index].options.push(arr.option)
    },
    removeOption(state, arr) {//删除选项
        state.questionnaire.questions[arr.index].options.splice(arr.oindex, 1)
    },
    modOption(state, arr) {//修改选项的值
        state.questionnaire.questions[arr.index].options.splice(arr.oindex, 1, arr.option)
    },
    modDate(state, arr) {//修改截止日期
        state.questionnaire.date = arr.date
    },
    reset(state, arr) {//重置正在编辑的问卷
        if (arr) {
            Vue.http.post('./data.php', { "type": "get", "index": arr.index })
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
    removeNaire(state, arr) {//删除问卷
        state.list.splice(arr.index, 1)
        Vue.http.post('./data.php', { "type": "del", "index": arr.index })
            .then(response => {
                console.log('成功删除问卷');
            }, response => {
                alert("error" + response.headers)
            });
    },
    getList(state) {//得到问卷列表
        Vue.http.post('./data.php', { "type": "list" })
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
    switchSeen(state, arr) {//切换日历显示状态
        state.seen = arr.seen
    },
    switchEditing(state, arr) {//切换编辑问卷状态
        state.editing.boolean = arr.boolean;
        state.editing.index = arr.index;
    }
}