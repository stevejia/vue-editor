<template>
  <div class="about">
    <h1>测试动态加载组件</h1>
    <div>
      <button type="button" @click="loadComponent1">加载组件1</button>
      <button type="button" @click="loadComponent2">加载组件2</button>
    </div>
    <MountComponent1></MountComponent1>
    <div class="mount-area"></div>
  </div>
</template>
<script>
// import { registerComponent } from "@/utils/registerComponents";
import testData from "@/editor-components/test";
import httpVueLoader from "@/utils/vueLoader";
import Vue from "vue";
import MountComponent1 from "@/components/MountComponent1.vue";
import axios from "axios";
import components from "@/editor-components/components";
export default {
  components: { MountComponent1 },
  mounted() {
    // httpVueLoader.httpRequest = function(url) {
    //   console.log(url);
    //   // return new Promise(() => {
    //   //   console.log(1);
    //   // }).then(() => {
    //   //   return testData;
    //   // });
    //   let xhr = new XMLHttpRequest();
    //   xhr.open("GET", "./components/MountComponent1.txt", true);
    //   xhr.send(null);
    //   xhr.onload = res => {
    //     console.log(res);
    //   };
    //   return axios
    //     .get("./components/MountComponent1.vue")
    //     .then(function(res) {
    //       return res.data;
    //     })
    //     .catch(function(err) {
    //       return Promise.reject(err.status);
    //     });
    // };
    console.log(httpVueLoader);
    debugger;
    console.log(httpVueLoader);
    let test = httpVueLoader(components[0].content);
    test.then(comp => {
      console.log(comp);
      const constructor = Vue.extend(comp);
      console.log(constructor);
      const instance = new constructor();
      let mountContainer = document.createElement("div");
      mountContainer.setAttribute("id", "mount-area");
      // let containerEl = document.querySelector(container).cloneNode(true);
      let editorEl = document.querySelector(".about");
      editorEl.appendChild(mountContainer);
      // 挂载到 ID 为 plateContainer 的DOM元素
      instance.$mount("#mount-area");
    });
  },
  methods: {
    loadComponent1() {
      registerComponent(
        "MountComponent1",
        { text: "I am component 1." },
        1,
        ".mount-area"
      );
    },
    loadComponent2() {
      registerComponent(
        "MountComponent2",
        { text: "I am component 2." },
        1,
        ".mount-area"
      );
    }
  }
};
</script>
