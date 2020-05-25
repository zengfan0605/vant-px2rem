<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div>
      <van-icon name="chat-o" />
    </div>

    <div>
      <van-button type="info">主要按钮</van-button>
    </div>

    <div>Vant组件按需引入</div>

  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss">
  .home > div {
    margin-top: 20px;
  }
</style>
