<template>
<div>
    <div id="loading" v-show="show">
        <img src="../../assets/images/loading.gif">
        <span>{{message}}</span>
    </div>
    <div class="fixed" v-show="show" @click="handleAction('cancel')"></div>
</div>
 
</template>

<script type="text/babel">
  export default {
    methods: {
      handleAction(action) {
        this.show = false;
        
      },
    },
    data() {
      return {
        message: 'Loading...',
        show: true,
      };
    }
  };
</script>

<style>
#loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 30%;
    height: 4em;
    line-height: 4em;
    font-size: 26px;
    background: #fff;
    color: #ff9800;
    opacity: 1;
    border-radius: 8px;
    text-align: center;
    z-index: 9999;
}
</style>