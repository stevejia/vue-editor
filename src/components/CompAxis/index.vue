<template>
  <div class="comp-axis">
    <div class="axis-tick tick-nw" @mousedown="resize($event, 'nw')"></div>
    <div class="axis-tick tick-n" @mousedown="resize($event, 'n')"></div>
    <div class="axis-tick tick-ne" @mousedown="resize($event, 'ne')"></div>
    <div class="axis-tick tick-e" @mousedown="resize($event, 'e')"></div>
    <div class="axis-tick tick-se" @mousedown="resize($event, 'se')"></div>
    <div class="axis-tick tick-s" @mousedown="resize($event, 's')"></div>
    <div class="axis-tick tick-sw" @mousedown="resize($event, 'sw')"></div>
    <div class="axis-tick tick-w" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-w" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-e" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-n" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-s" @mousedown="resize($event, 'w')"></div>
  </div>
</template>

<script>
export default {
  props: ["compData"],
  data() {
    return {
      changeRule: {
        nw: {
          x: -1,
          l: 1,
          y: -1,
          t: 1
        },
        n: {
          x: 0,
          l: 0,
          y: -1,
          t: 1
        },
        ne: {
          x: 1,
          l: 0,
          y: -1,
          t: 1
        },
        e: {
          x: 1,
          l: 0,
          y: 0,
          t: 0
        },
        se: {
          x: 1,
          l: 0,
          y: 1,
          t: 0
        },
        s: {
          x: 0,
          l: 0,
          y: 1,
          t: 0
        },
        sw: {
          x: -1,
          l: 1,
          y: 1,
          t: 0
        },
        w: {
          x: -1,
          l: 1,
          y: 0,
          t: 0
        }
      },
      originPageX: 0,
      originPageY: 0
    };
  },
  methods: {
    resize(event, direction) {
      console.log("resize");
      event.stopPropagation();
      event.preventDefault();
      let { pageX, pageY } = event;
      this.originPageX = pageX;
      this.originPageY = pageY;
      //   let target = event.target;
      let rule = { ...this.changeRule[direction] };
      this.currentRule = rule;
      let target = event.target.parentNode.parentNode;
      console.log(target);
      this.resizeTarget = target;
      console.log(rule);
      document.addEventListener("mousemove", this.mouseMove, false);
      document.addEventListener("mouseup", this.mouseUp, false);
    },
    mouseMove(event) {
      event.stopPropagation();
      event.preventDefault();
      let { pageX, pageY } = event;
      let deltaX = pageX - this.originPageX;
      let deltaY = pageY - this.originPageY;
      let width = deltaX * this.currentRule.x;
      let left = deltaX * this.currentRule.l;
      let height = deltaY * this.currentRule.y;
      let top = deltaY * this.currentRule.t;
      console.log("mouse move");
      let target = event.target;
      let compParentEl = this.resizeTarget;
      let containerEl = document.querySelector(".editor-area-inner");
      let { x: aX, y: aY } = containerEl.getBoundingClientRect();
      let {
        x: cX,
        y: cY,
        width: cWidth,
        height: cHeight
      } = compParentEl.getBoundingClientRect();
      console.log(width, height, left, top);
      //   compParentEl.style.left = `${left + cX - aX}px`;
      //   compParentEl.style.top = `${top + cY - aY}px`;
      let compEl = document.querySelector(
        "#" + document.querySelector(".comp-axis").getAttribute("comp-id")
      );
      //   compEl.style.width = `${width + cWidth}px`;
      //   compEl.style.height = `${height + cHeight}px`;
      console.log(this.compData);
      this.compData.width = width + cWidth;
      this.compData.height = height + cHeight;
      this.compData.top = top + cY - aY;
      this.compData.left = left + cX - aX;
      this.originPageX = pageX;
      this.originPageY = pageY;
      console.log(target.parentNode.parentNode);
    },
    mouseUp(event) {
      event.stopPropagation();
      event.preventDefault();
      document.removeEventListener("mousemove", this.mouseMove, false);
      document.removeEventListener("mouseup", this.mouseUp, false);
    }
  }
};
</script>

<style scoped>
.comp-axis {
  z-index: 2;
  /* position: absolute; */
  left: 0;
  top: 0;
  /* width: 100%; */
  /* height: 100%; */
  /* border: 1px solid blue; */
  box-sizing: border-box;
}

.axis-border {
  background: #409eff;
  position: absolute;
  z-index: 3;
  box-sizing: border-box;
}

.axis-border-w {
  width: 2px;
  height: 100%;
  left: -2px;
  top: 0;
}
.axis-border-n {
  width: 100%;
  height: 2px;
  top: -2px;
  left: 0;
}

.axis-border-e {
  width: 2px;
  height: 100%;
  right: -2px;
  top: 0;
}

.axis-border-s {
  width: 100%;
  height: 2px;
  bottom: -2px;
  left: 0;
}

.axis-tick {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1px solid blue;
  background: #ffffff;
  z-index: 4;
}

.tick-nw {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.tick-n {
  top: -5px;
  left: calc(50% - 3px);
  cursor: ns-resize;
}

.tick-ne {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.tick-e {
  top: calc(50% - 3px);
  right: -5px;
  cursor: ew-resize;
}

.tick-se {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.tick-s {
  bottom: -5px;
  left: calc(50% - 3px);
  cursor: ns-resize;
}

.tick-sw {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.tick-w {
  top: calc(50% - 3px);
  left: -5px;
  cursor: ew-resize;
}
</style>