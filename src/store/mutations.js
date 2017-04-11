export default {
    reset(state, arr) {//重置正在编辑的问卷
        if (arr) {
            state.questionnaire = state.list[arr.index];
        }
        else {
            state.questionnaire = { title: '请输入标题', questions: [{ type: 'radio', title: '请输入标题', required: false, options: [{ name: '选项', count: 0 }, { name: '选项', count: 0 }] }], date: '2017-1-1', status: '未保存' }
        }
    },
    modNaireTitle(state, arr) {//修改问卷标题
        state.questionnaire.title = arr.title
    },
    addQuestion(state, arr) {//添加指定类型的问题
        state.questionnaire.questions.push({ type: arr.type, title: '请输入标题', required: false, options: [{ name: '选项', count: 0 }, { name: '选项', count: 0 }] })
    },
    modQuestionTitle(state, arr) {//修改问题标题
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
        state.questionnaire.questions[arr.index].options.push({name:arr.option,count:0})
    },
    removeOption(state, arr) {//删除选项
        state.questionnaire.questions[arr.index].options.splice(arr.oindex, 1)
    },
    modOption(state, arr) {//修改选项的值
        state.questionnaire.questions[arr.index].options[arr.oindex].name = arr.option
    },
    modDate(state, arr) {//修改截止日期
        state.questionnaire.date = arr.date
    },
    switchSeen(state, arr) {//切换日历显示状态
        state.seen = arr.seen
    },
    switchOperating(state, arr) {//切换编辑问卷状态
        state.operating.type = arr.type;
        state.operating.index = arr.index;
    }
}