<!--
 * @Author: TanGuangZhi
 * @Date: 2022-03-03 09:40:06 Thu
 * @LastEditTime: 2022-03-03 13:21:05 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
  },
};
</script>
