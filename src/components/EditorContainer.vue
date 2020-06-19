<template>
  <div class="editor-container">
    <div class="editor-area">
      <div
        class="editor-area-inner"
        :style="{ zoom: editorZoom }"
        @mousewheel.stop="onZoom"
        @DOMMouseScroll.stop="onZoom"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
      ></div>
    </div>
    <div class="editor-ruler-top">
      <div class="editor-ruler-inner" v-html="topRulerHtml"></div>
    </div>
    <div class="editor-ruler-left">
      <div class="editor-ruler-inner" v-html="leftRulerHtml"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftRulerHtml: "",
      topRulerHtml: "",
      editorZoom: 1,
      isMouseDown: false
    };
  },
  mounted() {
    this.initRuler();
  },
  methods: {
    initRuler() {
      let el = this.$el;
      let editArea = el.querySelector(".editor-area .editor-area-inner");
      console.log(editArea.clientWidth);
      console.log(editArea.clientHeight);
      let editAreaWidth = editArea.clientWidth;
      let editAreaHeight = editArea.clientHeight;
      let topRuler = el.querySelector(".editor-ruler-top");
      let rulerTopContent = this.generateRuler(editAreaWidth);
      this.topRulerHtml = rulerTopContent;

      let rulerLeftContent = this.generateRuler(editAreaHeight);
      this.leftRulerHtml = rulerLeftContent;
      // console.log(rulerTopContent);
      let leftRuler = el.querySelector(".editor-ruler-left");
      leftRuler.style.width = `${editAreaHeight}px`;
    },
    getTickSizeByZoom(zoom) {
      //default 10
      let tickSize = 10;
      if (zoom >= 1.8) {
        tickSize = 5;
      } else if (zoom > 0.8) {
        tickSize = 10;
      } else if (zoom > 0.5) {
        tickSize = 40;
      } else if (zoom > 0.3) {
        tickSize = 100;
      } else {
        tickSize = 100;
      }
      return tickSize;
    },
    generateRuler(length, isLeft) {
      let zoom = this.editorZoom;
      let tickSize = this.getTickSizeByZoom(zoom);
      let tickCount = Math.floor(length / tickSize);
      let rulerHtml = "";
      for (let start = 0; start < tickCount; start++) {
        let subTick = this.createRulerTick(
          start,
          start % 5 === 0,
          isLeft,
          tickSize
        );
        console.log(subTick, start);
        rulerHtml += subTick;
      }
      return rulerHtml;
      console.log(tickCount);
    },
    createRulerTick(tick, withDigital, isLeft, tickSize) {
      let zoom = this.editorZoom;
      let tickInner = `<div class="ruler-subtick-small"></div>`;
      if (withDigital) {
        tickInner = `<div class="ruler-subtick-large"></div><span class="ruler-subtick-digital">${tick *
          tickSize}</span>`;
      }
      return `<div class="ruler-subtick" style="left: ${15 +
        tick * tickSize * zoom}px">${tickInner}</div>`;
    },

    onZoom(el) {
      console.log(el);
      let { deltaY } = el;
      //最小缩放到0.1
      if (this.editorZoom < 0.3 && deltaY > 0) {
        return;
      }
      if (this.editorZoom >= 3 && deltaY < 0) {
        return;
      }
      let scaleDelta = 0.1;
      if (deltaY > 0) {
        scaleDelta = -0.1;
      }
      this.editorZoom += scaleDelta;
      this.$nextTick(() => {
        this.initRuler();
      });
    },
    onMouseDown(el) {
      this.isMouseDown = true;
      let { clientX, clientY, pageX, pageY } = el;
      this.originPos = { clientX, clientY };
      console.log(this.originPos);
    },
    onMouseMove(el) {
      if (!this.isMouseDown) {
        return;
      }
      if (this.isMouseDown) {
        let { clientX, clientY } = el;
        let deltaX = clientX - this.originPos.clientX;
        let deltaY = clientY - this.originPos.clientY;
        console.log(deltaX, deltaY);
      }
    },
    onMouseUp(el) {
      this.isMouseDown = false;
    }
  }
};
</script>

<style lang="css">
.editor-container {
  position: relative;
  /* width: 1920px;
  height: 1080px; */
  width: 100%;
  height: 100%;
}

.editor-area {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px 0 0 15px;
  position: relative;
}

.editor-area-inner {
  position: relative;
  width: 100%;
  height: 100%;
  background: #999999;
  background-image: linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(white 1px, transparent 0),
    linear-gradient(90deg, white 1px, transparent 0);
  background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
}
.vue-component {
  position: relative;
  z-index: 2;
  cursor: grab;
}

.vue-component-move {
  cursor: grabbing !important;
}

.editor-ruler-top {
  width: 100%;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
}

.editor-ruler-top .editor-ruler-inner {
  padding-left: 15px;
  width: 100%;
}

.ruler-subtick {
  position: absolute;
  height: 100%;
  left: 15px;
}

.ruler-subtick-large {
  width: 1px;
  height: 12px;
  background: red;
  position: absolute;
  left: 0;
  bottom: -1px;
}

.ruler-subtick-digital {
  position: absolute;
  top: -2px;
  left: 2px;
  font-size: 12px;
}

.ruler-subtick-small {
  width: 1px;
  height: 5px;
  background: red;
  position: absolute;
  left: 0;
  bottom: -1px;
}

.editor-ruler-left {
  width: 100%;
  height: 15px;
  position: absolute;
  /* padding-left: 15px; */
  left: 15px;
  top: 0;
  transform: rotate(90deg);
  transform-origin: left top;
}

.editor-ruler-left .ruler-subtick-small,
.editor-ruler-left .ruler-subtick-large {
  top: -1px !important;
}

.editor-ruler-left .ruler-subtick-digital {
  top: 2px !important;
}
</style>
