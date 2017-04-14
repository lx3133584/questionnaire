<template>
    <div id="messageBox" v-if="show">
        <div>
          <div class="title">
              <h1>{{ title }}</h1>
              <i class="iconfont icon-close" @click="handleAction('cancel')"></i>
            </div>
            <div class="main">
              <p>{{ message }}</p>
            </div>
            <div class="btns">
              <button
                class="cancel"
                v-if="type === 'confirm'"
                @click="handleAction('cancel')">
                取消
              </button>
              <button
                class="submit"
                @click="handleAction('submit')">
                确定
              </button>
            </div>
        </div>
        <div class="fixed" v-if="show" @click="handleAction('cancel')"></div>
    </div>
</template>

<script type="text/babel">
  export default {
    props: {
      modal: {
        default: true
      }
    },
    methods: {
      handleAction(action) {
        if(this.type === 'alert' || action === 'cancel') {
          this.show = false;
        }
        else if(this.type === 'confirm' && action === 'submit') {
          this.submit()
        }
      },
      submit() {
        this.success();
        this.show = false;
      },
      success() {
        console.log('确定')
      },
    },
    data() {
      return {
        title: '提示',
        message: '此操作将永久删除该文件, 是否继续?',
        type: 'confirm',
        show: true,
      };
    }
  };
</script>

<style>
#messageBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 30%;
    height: 32%;
    background: #fff;
    border-radius: 8px;
    z-index: 9999;
}
#messageBox>div:first-child {
    padding: 15px;
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    box-shadow: 8px 5px 8px #333;
}
#messageBox .title h1 {
    display: inline-block;
    font-size: 26px;
}
#messageBox .title i {
    float: right;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s;
}
#messageBox .title i:hover {
    color: #ff9800;
}
#messageBox .main p {
    margin: 12%;
    font-size: 20px;
}
#messageBox .btns button {
    float: right;
    display: inline-block;
    margin-top: 5px;
    margin-right: 18px;
    width: 4em;
    height: 1.5em;
    line-height: 1.5em;
    font-size: 20px;
    text-align: center;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 5px;
}
#messageBox .btns .submit {
    color: #fff;
    background: #ff9800;
}
#messageBox .btns .cancel {
    color: #000;
    background: #fff;
    border: 2px solid #aaa;
}
#messageBox .btns .cancel:hover {
    color: #ff9800;
    background: #fff;
    border: 2px solid #ff9800;
}
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background: rgba(0,0,0,0.3)
}
</style>