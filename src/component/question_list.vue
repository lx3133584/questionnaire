<!-- 问题列表（包含管理问题的一些功能） -->
<template>
    <div id="questionList">
        <ul>
            <li v-for="(item,index) in questions">
                <question :index="index"></question>
            </li>
        </ul>
        <div>
            <transition name="slide-fade">
                <ul v-if="add_seen">
                    <li @click="addQuestion('radio')">单选题</li>
                    <li @click="addQuestion('checkbox')">多选题</li>
                    <li @click="addQuestion('text')">文本题</li>
                </ul>
            </transition>
            <button @click="showAdd">+ 添加问题</button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Question from './question.vue';
    export default {
        data() {
            return {
                add_seen: false
            }
        },
        computed: {
            questions() {
                return this.$store.state.questionnaire.questions
            }
        },
        methods: {
            addQuestion(type) {//添加指定类型的问题
                this.$store.commit('addQuestion', {type: type});
                this.add_seen = false;
            },
            showAdd() {//切换 增加的题目类型的显示
                this.add_seen = !this.add_seen;
            }
        },
        components: {Question}
    }
</script>

<style>
    #questionList {
        padding: 6rem;
    }

    #questionList > ul > li:hover {
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
    }

    #questionList > div {
        text-align: center;
        background: rgba(255, 255, 255, 0.4);
        border: 2px solid #666;
    }

    #questionList > div > ul {
        height: 4em;
        line-height: 4em;
        font-size: 1.4rem;
        color: #000;
        overflow: hidden;
    }

    #questionList > div > ul > li {
        display: inline-block;
        margin: 0 1em;
        width: 5em;
        height: 2em;
        line-height: 2em;
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #666;
        border-radius: 5px;
        cursor: pointer;
    }

    #questionList > div > button {
        width: 100%;
        height: 3em;
        line-height: 3em;
        font-size: 2rem;
        color: #fff;
        background: rgba(255, 152, 0, 0.6);
        border: none;
        cursor: pointer;
    }

    /*过渡动画*/
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
        height: 0 !important;
    }
</style>