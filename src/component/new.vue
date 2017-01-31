<template>
  <div id="new">
    <h1>I am a new.</h1>
    <a>  {{ msg }} </a>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      msg: "微信公众号 jinkey-love"
    }
  }
}
</script>

<style>
#new{
	margin: 120px auto 0 auto;
	width: 95%;
	background: rgba(255,255,255,0.2);
}
</style>