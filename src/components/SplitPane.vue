<template>
  <div class="split-pane">
    <div
      class="split-line-v"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      @dragstart="dragstart"
      :style="{ top: `calc(${percent}% - 19px)` }"
      v-if="split === 'vertical'"
    >
      <div class="split-line"></div>
    </div>
    <div
      class="split-line-h"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      v-if="split === 'horizontal'"
      :style="{ left: `calc(${percent}% - 19px)` }"
    >
      <div class="split-line"></div>
    </div>

    <div class="split-content split-horizontal" v-if="split === 'horizontal'">
      <div class="split-part" :style="{ width: `${percent}%` }">
        <slot name="first"></slot>
      </div>
      <div class="split-part" :style="{ width: `${remainPercent}%` }">
        <slot name="second"></slot>
      </div>
    </div>
    <div class="split-content split-vertical" v-if="split === 'vertical'">
      <div class="split-part" :style="{ height: `${percent}%` }"></div>
      <div class="split-part" :style="{ height: `${remainPercent}%` }"></div>
    </div>
    <!-- <div
      @mousedown="onMouseDown($event)"
      :style="{width: `${width}px`, height: `${height}px`}"
      :class="marginTB ? 'marginTB': 'marginLR'"
    >test</div>-->
  </div>
</template>
<script>
export default {
  name: "split-line",
  props: ["min", "max", "defaultPercent", "split", "splitNum"],
  data() {
    return {
      width: null,
      height: null,
      marginTB: false,
      percent: this.defaultPercent,
      remainPercent: 100 - this.defaultPercent,
    };
  },
  mounted() {
    this.distance =
      this.split === "vertical" ? this.$el.clientHeight : this.$el.clientWidth;
    if (this.direction === "v") {
      this.marginTB = false;
      this.width = 1;
      this.height = this.length;
    } else {
      if (this.direction === "h") {
        this.marginTB = true;
        this.width = this.length;
        this.height = 1;
      }
    }
  },
  watch: {
    direction(newVal) {
      console.log(newVal);
    },
  },
  methods: {
    dragstart() {
      return false;
    },
    onMouseDown(event) {
      this.startPageX = event.pageX;
      this.startPageY = event.pageY;
      console.log(this.startPageX, this.startPageY);
      document.addEventListener("mousemove", this._onMouseMove, false);
    },
    onMouseUp(event) {
      document.removeEventListener("mousemove", this._onMouseMove, false);
    },
    _onMouseMove(event) {
      event.preventDefault();
      let pageX = event.pageX;
      let pageY = event.pageY;
      console.log(pageX, pageY);
      // console.log(pageX - this.startPageX, pageY - this.startPageY);
      if (this.split === "horizontal") {
        let moveDistance = pageX - this.startPageX;
        console.log(moveDistance);
        // let originDistance = (this.percent / 100) * this.distance - 20.5;
        let originDistance = (this.percent / 100) * this.distance;
        let currentDistance = originDistance + moveDistance;
        console.log(currentDistance, originDistance);
        let newPercent = Number(
          ((currentDistance / originDistance) * this.percent).toFixed(4)
        );
        console.log(newPercent);
        if (newPercent > this.max || newPercent < this.min) {
          document.removeEventListener("mousemove", this._onMouseMove, false);
        }
        this.percent =
          newPercent > this.max
            ? this.max
            : newPercent < this.min
            ? this.min
            : newPercent;
        this.remainPercent = 100 - this.percent;
        // this.percent = newPercent;
        // this.remainPercent = 100 - newPercent;
        this.startPageX = pageX;
      } else if (this.split === "vertical") {
        let moveDistance = pageY - this.startPageY;
        console.log(moveDistance);
        // let originDistance = (this.percent / 100) * this.distance - 20.5;
        let originDistance = (this.percent / 100) * this.distance;
        let currentDistance = originDistance + moveDistance;
        console.log(currentDistance, originDistance);
        let newPercent = Number(
          ((currentDistance / originDistance) * this.percent).toFixed(4)
        );
        console.log(newPercent);
        if (newPercent > this.max || newPercent < this.min) {
          document.removeEventListener("mousemove", this._onMouseMove, false);
        }
        this.percent =
          newPercent > this.max
            ? this.max
            : newPercent < this.min
            ? this.min
            : newPercent;
        this.remainPercent = 100 - this.percent;
        this.startPageY = pageY;
        // let distance = this.distance - 20.5;
        // let percent = Number(((pageY / distance) * 100).toFixed(4));
        // console.log(percent);
      }
    },
  },
};
</script>
<style scoped>
.split-pane {
  width: 100%;
  height: 100%;
  position: relative;
}
.split-content {
  width: 100%;
  height: 100%;
  border: 1px solid #666666;
  box-sizing: border-box;
}
.split-line-v {
  height: 1px;
  width: 100%;
  position: absolute;
  padding: 19px 0 20px 0;
  cursor: n-resize;
  /* transform: translateY(-50%); */
}
.split-line-h {
  width: 1px;
  height: 100%;
  position: absolute;
  padding: 0 19px 0 20px;
  cursor: e-resize;
}
.split-line {
  background: red;
  width: 100%;
  height: 100%;
}

.split-part {
  width: 100%;
  height: 100%;
}

.split-horizontal {
  display: flex;
}
</style>
