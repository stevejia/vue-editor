<template>
  <el-checkbox
    class="hold"
    draggable="true"
    @drag.native="handleDrag"
    @dragover.native.prevent="handleDragover"
    @dragstart.native="handleDragstart($event)"
    @dragenter.native="handleDragenter($event)"
    @dragleave.native="handleDragleave"
    @drop.native.prevent="handleDrop"
  >test</el-checkbox>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {
    // 拖动事件
    handleDrag() {
      // console.log('drag')
    },

    handleDragover() {
      // 不能少并且要阻止默认行为，不然触发不了drop事件
    },

    // 拖动开始
    handleDragstart($event) {
      console.log($event);
    },

    // 拖动进入
    handleDragenter($event) {},

    // 拖动离开
    handleDragleave() {
      // this.enter$event = '';
    },

    // 放开
    handleDrop() {
      console.log(1);
    }
  }
};
</script>

<style scoped>
.hold {
  padding: 3px 5px;
  border: 1px dashed transparent;
  border-radius: 3px;
  box-sizing: border-box;
}

.hold-active {
  border: 1px dashed teal;
}

.drag-active {
  opacity: 0.5;
}
</style>