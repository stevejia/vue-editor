<template>
  <div>
    <div>vue loader</div>
    <div v-for="(item, index) in components" :key="index">
      <button type="button" @click="mountComponentWithVueLoader(item)">{{item.title}}</button>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
import components from "@/editor-components/components";
import vueLoader from "@/utils/vueLoader";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";

import Vue from "vue";
export default {
  data() {
    return {
      components
    };
  },
  methods: {
    mountComponentWithVueLoader(item) {
      vueLoader(item.content).then(comp => {
        const Component = Vue.extend(comp);
        const component = new Component();
        let mountContainer = document.createElement("div");
        mountContainer.setAttribute("id", "mount-area");
        let editorEl = document.querySelector("#container");
        editorEl.appendChild(mountContainer);
        // 挂载到 ID 为 plateContainer 的DOM元素
        component.$mount("#mount-area");
        let $el = component.$el;
        $el.setAttribute("id", uuidv1());
        console.log(component);
      });
    }
  }
};
</script>