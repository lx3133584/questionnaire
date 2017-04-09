import Vue from 'vue'

export default {
    save({state,commit}, arr) {//保存问卷
        state.questionnaire.status = "未发布";
        if (arr.index!=undefined) {
            return Vue.http.post('./data.php', { "type": "mod", "index": arr.index, "data": state.questionnaire })
                .then(response => {
                    console.log('修改问卷成功并保存，问卷状态为未发布');
                    commit('switchEditing',{boolean:false});
                }, response => {
                    alert("error" + response.headers)
                });
        }
        else {
            return Vue.http.post('./data.php', { "type": "add", "data": state.questionnaire })
                .then(response => {
                    console.log('增加问卷成功并保存，问卷状态为未发布')
                }, response => {
                    alert("error" + response.headers)
                });
        }
    },
    submit({state,commit}, arr) {//保存并把问卷状态改为发布
        state.questionnaire.status = "已发布";
        if (arr.index!=undefined) {
            return Vue.http.post('./data.php', { "type": "mod", "index": arr.index, "data": state.questionnaire })
                .then(response => {
                    console.log('修改问卷成功并保存，问卷状态为已发布');
                    commit('switchEditing',{boolean:false});
                }, response => {
                    alert("error" + response.headers)
                });
        }
        else {
            return Vue.http.post('./data.php', { "type": "add", "data": state.questionnaire })
                .then(response => {
                    console.log('增加问卷成功并保存，问卷状态为已发布')
                }, response => {
                    alert("error" + response.headers)
                });
        }
    }
}