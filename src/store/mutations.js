export default {
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
    switchSeen(state, arr) {//切换日历显示状态
        state.seen = arr.seen
    },
    switchEditing(state, arr) {//切换编辑问卷状态
        state.editing.boolean = arr.boolean;
        state.editing.index = arr.index;
    }
}