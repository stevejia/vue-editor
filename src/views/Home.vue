<template>
  <el-container>
    <el-header>Steve的编辑器</el-header>

    <el-container>
      <el-aside width="230px">
        <split-pane
          :defaultPercent="50"
          :min="20"
          :max="80"
          :split="'vertical'"
        ></split-pane>
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
        <el-main @drop="drop" @dragover.prevent="dragOver($event)"> </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="230px">
        <split-pane
          :defaultPercent="50"
          :min="20"
          :max="80"
          :split="'vertical'"
        ></split-pane>
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
import SplitPane from "@/components/SplitPane.vue";
export default {
  name: "Home",
  components: { SplitPane },
  data() {
    return {};
  },
  methods: {
    onMouseDown(event) {
      console.log(event);
    },
    drag(event) {
      // console.log(event);
    },
    dragEnd(event) {
      console.log(event);
    },
    dragEnter(event) {
      console.log(event);
    },
    drop(event) {
      console.log(event);
    },
    dragOver(event) {
      event.preventDefault();
      console.log(1);
    },
  },
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
</style>
