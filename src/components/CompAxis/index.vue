<template>
  <div
    class="comp-axis"
    style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; border: 1px solid;"
  >
    <div class="axis-tick tick-nw" @mousedown="resize($event, 'nw')"></div>
    <div class="axis-tick tick-n" @mousedown="resize($event, 'n')"></div>
    <div class="axis-tick tick-ne" @mousedown="resize($event, 'ne')"></div>
    <div class="axis-tick tick-e" @mousedown="resize($event, 'e')"></div>
    <div class="axis-tick tick-se" @mousedown="resize($event, 'se')"></div>
    <div class="axis-tick tick-s" @mousedown="resize($event, 's')"></div>
    <div class="axis-tick tick-sw" @mousedown="resize($event, 'sw')"></div>
    <div class="axis-tick tick-w" @mousedown="resize($event, 'w')"></div>
  </div>
</template>

<script>
export default {
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
      let compEl = this.resizeTarget;
      let containerEl = document.querySelector(".editor-area-inner");
      let { x: aX, y: aY } = containerEl.getBoundingClientRect();
      let {
        x: cX,
        y: cY,
        width: cWidth,
        height: cHeight
      } = compEl.getBoundingClientRect();
      console.log(width, height, left, top);
      compEl.style.left = `${left + cX - aX}px`;
      compEl.style.top = `${top + cY - aY}px`;
      compEl.style.width = `${width + cWidth}px`;
      compEl.style.height = `${height + cHeight}px`;
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
.axis-tick {
  position: absolute;
  width: 5px;
  height: 5px;
  border: 1px solid blue;
  background: #ffffff;
}

.tick-nw {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.tick-n {
  top: -4px;
  left: calc(50% - 3px);
  cursor: ns-resize;
}

.tick-ne {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.tick-e {
  top: calc(50% - 3px);
  right: -4px;
  cursor: ew-resize;
}

.tick-se {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

.tick-s {
  bottom: -4px;
  left: calc(50% - 3px);
  cursor: ns-resize;
}

.tick-sw {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.tick-w {
  top: calc(50% - 3px);
  left: -4px;
  cursor: ew-resize;
}
</style>