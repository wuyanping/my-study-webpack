<template>
  <div class="sy">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'sy',
  data () {
    return {
      msg: '欢迎来到吴燕萍的博客主页'
    }
  },
  // beforeCreate () {
  //   if (!this.$getCookie().userName) {
  //     this.$router.push({path: '/login'})
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
