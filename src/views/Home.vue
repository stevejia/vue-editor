<template>
  <el-container>
    <el-header>Steve的编辑器</el-header>

    <el-container>
      <el-aside width="230px">
        <!-- <split-pane :defaultPercent="50" :min="20" :max="80" :split="'vertical'"></split-pane> -->
        <!-- <el-container class="aside-item aside-top"></el-container>
        <el-divider
          class="aside-divider"
          draggable="true"
          @mousedown="onMouseDown($event)"
          @drag="drag($event)"
          @dragend="dragEnd($event)"
        ></el-divider>
        <el-container class="aside-item aside-bottom"></el-container>-->
      </el-aside>
      <el-container>
        <el-main>
          <!-- <split-pane :defaultPercent="50" :min="20" :max="80" :split="'horizontal'"></split-pane> -->
          <div class="main-container">
            <editor-container></editor-container>
            <!-- <CompAxis style="left: 330px; top: 200px;"></CompAxis> -->
            <!-- <div
              style="width: 100%; height: 100%;"
              @drop="drop"
              @dragover="allowDrop"
              @drag="mouseMove"
              @mousedown="moudeDown"
              class="editor-container"
            ></div>-->
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="230px">
        <div
          v-for="(item, index) in components"
          :key="index"
          @mousedown="onMouseDown($event, item)"
          style="height: 80px; width: 100%; line-height: 80px;"
        >
          <div style="width: 80px; height: 80px; background: red;">{{ item.title }}</div>
        </div>

        <!-- <split-pane :defaultPercent="50" :min="20" :max="80" :split="'vertical'"></split-pane> -->
        <!-- <el-container class="aside-item aside-top"></el-container>
        <el-divider
          class="aside-divider"
          draggable="true"
          @mousedown="onMouseDown($event)"
          @drag="drag($event)"
          @dragend="dragEnd($event)"
        ></el-divider>
        <el-container class="aside-item aside-bottom"></el-container>-->
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import CompAxis from "@/components/CompAxis/index.vue";

import components from "@/editor-components/components";
import SplitPane from "@/components/SplitPane.vue";
import EditorContainer from "@/components/EditorContainer.vue";
import loadComp from "@/utils/loadComp";
import vueLoader from "@/utils/vueLoader";
import Vue from "vue";
export default {
  name: "Home",
  components: { SplitPane, EditorContainer, CompAxis },
  props: ["editorArea"],
  data() {
    return {
      idIndex: 0,
      components
    };
  },
  mounted() {
    // document.addEventListener("mousemove", this.mouseMove, true);
  },
  methods: {
    onMouseDown(ev, item) {
      this.toMountItem = item;
      console.log(item);
      let target = ev.target;
      console.log(ev);
      let { clientX, clientY } = ev;
      console.log(clientX, clientY);
      this.target = target.cloneNode(true);
      this.target.style.position = "absolute";
      this.target.style.left = `${clientX}px`;
      this.target.style.top = `${clientY}px`;
      document.body.append(this.target);
      document.addEventListener("mouseup", this.mouseUp, false);
      document.addEventListener("mousemove", this.mouseMove, false);
    },

    // dragStart(event) {
    //   // let target = event.target.cloneNode(true);
    //   let target = event.target;
    //   let rect = target.getBoundingClientRect();
    //   console.log(rect);
    //   let deltaX = event.pageX - rect.left;
    //   let deltaY = event.pageY - rect.top;
    //   this.originPos = {
    //     deltaX,
    //     deltaY,
    //   };
    //   this.target = target.cloneNode(true);
    //   this.target.addEventListener("dragstart", (e) => {
    //     console.log(e);
    //     this.target = e.target;
    //   });
    //   this.target.addEventListener("drop", (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   });
    // },

    mouseUp(event) {
      let { clientX, clientY } = event;
      let newTarget = this.target.cloneNode(true);
      let editorAreaSelector = this.editorArea || ".editor-area-inner";
      let editorArea = document.querySelector(editorAreaSelector);
      let { x, y } = editorArea.getBoundingClientRect();
      let left = clientX - x;
      left = left < 0 ? 0 : left;
      let top = clientY - y;
      top = top < 0 ? 0 : top;
      newTarget.style.left = `${left}px`;
      newTarget.style.top = `${top}px`;
      // let compEl = registerComponent(this.toMountItem, 1);
      // compEl.$el.style.position = "absolute";
      // compEl.$el.style.left = `${left}px`;
      // compEl.$el.style.top = `${top}px`;
      // compEl.$el.addEventListener("mousedown", this.compMouseDown, false);
      vueLoader(this.toMountItem.content).then(comp => {
        console.log(comp);
        const constructor = Vue.extend(comp);
        console.log(constructor);
        const instance = new constructor();
        let mountContainer = document
          .createRange()
          .createContextualFragment(
            `<div class="comp-area"><div id="mount-area"></div></div>`
          );
        // dom.appendChild(tempNode);
        // let mountContainer = document.createElement("div");
        // mountContainer.setAttribute("id", "mount-area");
        // let containerEl = document.querySelector(container).cloneNode(true);
        let editorEl = document.querySelector(".editor-area-inner");
        editorEl.appendChild(mountContainer);
        // 挂载到 ID 为 plateContainer 的DOM元素
        instance.$mount("#mount-area");
        instance.$el.parentNode.style.position = "absolute";
        instance.$el.parentNode.style.left = `${left}px`;
        instance.$el.parentNode.style.top = `${top}px`;
        instance.$el.addEventListener("mousedown", this.compMouseDown, false);
      });

      // loadComp(this.toMountItem, ".editor-area-inner", el => {
      //   console.log(el);
      // });
      // editorArea.append(newTarget);
      document.body.removeChild(this.target);
      document.removeEventListener("mouseup", this.mouseUp, false);
      document.removeEventListener("mousemove", this.mouseMove, false);
    },
    compMouseDown(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let target = ev.target.parentNode;
      console.log(target);
      let { x, y } = target.getBoundingClientRect();
      let { clientX, clientY } = ev;
      document.addEventListener("mousemove", this.compMouseMove, false);
      this.deltaData = {
        deltaX: clientX,
        deltaY: clientY
      };
      this.comp = target;
      let mountContainer = document
        .createRange()
        .createContextualFragment(`<div id="mount-area"></div>`);
      target.appendChild(mountContainer);
      let AxisComponent = Vue.extend(CompAxis);
      if (this.axisVM) {
        this.axisVM.$destroy();
        this.axisVM.$el.remove();
        this.axisVM = null;
      }
      let axisVM = new AxisComponent().$mount("#mount-area");
      this.axisVM = axisVM;

      document.addEventListener("mouseup", this.compMouseUp, false);
    },
    compMouseUp(ev) {
      document.removeEventListener("mouseup", this.compMouseUp, false);
      document.removeEventListener("mousemove", this.compMouseMove, false);
    },
    compMouseMove(ev) {
      let deltaData = this.deltaData;
      let element = this.comp;
      let { clientX, clientY } = ev;
      console.log(clientY, clientX);
      let editorAreaSelector = this.editorArea || ".editor-area-inner";
      let editorArea = document.querySelector(editorAreaSelector);
      let {
        x: editorAreaX,
        y: editorAreaY
      } = editorArea.getBoundingClientRect();
      let { x, y } = element.getBoundingClientRect();
      this.deltaData = {
        deltaX: clientX,
        deltaY: clientY
      };
      element.style.left = `${clientX - deltaData.deltaX + x - editorAreaX}px`;
      element.style.top = `${clientY - deltaData.deltaY + y - editorAreaY}px`;
    },
    mouseMove(ev) {
      let { clientX, clientY } = ev;
      console.log(clientX, clientY);
      this.target.style.left = `${clientX}px`;
      this.target.style.top = `${clientY}px`;
    }
    // mouseMove1(e) {
    //   let target = e.target;
    //   let id = target.getAttribute("id");
    //   // console.log(e.pageX, e.pageY);
    //   let left = e.pageX - this.originPos.deltaX;
    //   let top = e.pageY - this.originPos.deltaY;
    //   let sameLeft = this.positions.filter((pos) => {
    //     return pos.id !== id && pos.left === left;
    //   });
    //   if (sameLeft.length) {
    //     console.log(sameLeft);
    //     let tops = sameLeft.map((sl) => {
    //       return sl.top;
    //     });
    //     let min = Math.min(top, ...[tops]);
    //     let max = Math.max(top, ...[tops]);
    //     let div = document.createElement("div");
    //     div.style.borderLeft = "1px dashed red";
    //     div.style.height = `${max - min}px`;
    //     div.style.position = "absolute";
    //     div.style.left = `${left}px`;
    //     div.style.top = `${min}px`;
    //     div.classList.add("guide-line");
    //     document.body.append(div);
    //   } else {
    //     let divs = document.querySelectorAll(".guide-line");
    //     if (divs.length) {
    //       document.body.removeChild(divs[0]);
    //     }
    //   }
    // },
    // allowDrop(event) {
    //   event.preventDefault();
    // },
    // dragEnter(event) {
    //   console.log(event);
    // },
    // drop(event) {
    //   setTimeout(() => {
    //     console.log(event.pageX, event.pageY);
    //     let left = event.pageX - this.originPos.deltaX;
    //     let top = event.pageY - this.originPos.deltaY;
    //     this.target.style.position = "absolute";
    //     this.target.style.left = `${left}px`;
    //     this.target.style.top = `${top}px`;

    //     let dropTarget = event.target;
    //     let id = this.target.getAttribute("id");
    //     if (!id) {
    //       id = ++this.idIndex;
    //       this.target.setAttribute("id", id);
    //     }
    //     dropTarget.append(this.target);
    //     this.positions.push({
    //       id,
    //       left,
    //       top,
    //       width: this.target.clientWidth,
    //       height: this.target.clientHeight,
    //     });
    //     console.log(this.posDic);
    //   }, 0);
    // },
    // dragOver(event) {
    //   event.preventDefault();
    //   console.log(1);
    // },
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-footer {
  height: 26px !important;
}

.el-header {
  height: 50px !important;
  line-height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  position: relative;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100% - 76px);
  padding: 0;
}

.el-container {
  height: 100%;
  width: 100%;
}

.aside-item {
  height: 50%;
  border-bottom: 1px solid #666666;
}

.aside-divider {
  position: absolute;
  top: 50%;
  margin: 20px 0;
  cursor: n-resize;
}

.el-main {
  padding: 0;
  overflow: hidden;
}

.main-container {
  width: 100%;
  height: 100%;
  /* background: #999999;
  background-image: linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(white 1px, transparent 0),
    linear-gradient(90deg, white 1px, transparent 0);
  background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px; */
}

/* background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg,rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
    // background-size: 20px 20px;
     background-position: center center; */
</style>
