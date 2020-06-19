<template>
  <div
    style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"
  >
    <div
      @mousedown="onMouseDown"
      id="rotate-item"
      :style="{width: '100px', height: '50px', background: 'green', transform: `rotate(${deg}deg)`}"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      center: {
        x: 0,
        y: 0
      },
      deg: 0
    };
  },
  mounted() {
    let rotateItem = this.$el.querySelector("#rotate-item");
    let { x, y, width, height } = rotateItem.getBoundingClientRect();
    this.center.x = x + width / 2;
    this.center.y = y + height / 2;
  },
  methods: {
    onMouseDown($event) {
      let { pageX, pageY } = $event;
      this.originPos = {
        x: pageX - this.center.x,
        y: pageY - this.center.y
      };
      //   if (this.originPos) {
      //     this.calcDeg(current, this.originPos);
      //   }
      //   this.originPos = { ...current };
      document.addEventListener("mousemove", this.onMouseMove, false);
      document.addEventListener("mouseup", this.onMouseUp, false);
    },
    onMouseMove($event) {
      let { pageX, pageY } = $event;
      let current = {
        x: pageX - this.center.x,
        y: pageY - this.center.y
      };
      this.calcDeg(current, this.originPos);
      this.originPos = current;
    },
    onMouseUp($event) {
      document.removeEventListener("mousemove", this.onMouseMove, false);
      document.removeEventListener("mouseup", this.onMouseUp, false);
    },
    calcDeg(current, origin) {
      let o = Math.sqrt(origin.x * origin.x + origin.y * origin.y);
      let c = Math.sqrt(current.x * current.x + current.y * current.y);
      let z = Math.sqrt(
        Math.pow(current.x - origin.x, 2) + Math.pow(current.y - origin.y, 2)
      );
      let cosZ =
        (Math.pow(o, 2) + Math.pow(c, 2) - Math.pow(z, 2)) / (2 * o * c);
      let zPI = Math.acos(cosZ);
      let zDeg = 180 / (Math.PI / zPI);
      //叉乘判断鼠标顺序 为负值 标识逆时针 为正值 表示顺时针
      let crossMultiply = origin.x * current.y - origin.y * current.x;
      let newDeg = Number((this.deg + zDeg).toFixed(2));
      if (crossMultiply < 0) {
        newDeg = Number((this.deg - zDeg).toFixed(2));
      }
      if (newDeg >= 360) {
        newDeg = 0;
      } else if (newDeg < 0) {
        newDeg = 360 + newDeg;
      }
      this.deg = newDeg;
      console.log(this.deg);
    }
  }
};
</script>