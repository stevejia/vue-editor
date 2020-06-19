<template>
  <div class="comp-axis">
    <div class="axis-tick tick-nw" @mousedown="resize($event, 'nw', 0)"></div>
    <div class="axis-tick tick-n" @mousedown="resize($event, 'n', 1)"></div>
    <div class="axis-tick tick-ne" @mousedown="resize($event, 'ne', 2)"></div>
    <div class="axis-tick tick-e" @mousedown="resize($event, 'e', 3)"></div>
    <div class="axis-tick tick-se" @mousedown="resize($event, 'se',4)"></div>
    <div class="axis-tick tick-s" @mousedown="resize($event, 's', 5)"></div>
    <div class="axis-tick tick-sw" @mousedown="resize($event, 'sw',6)"></div>
    <div class="axis-tick tick-w" @mousedown="resize($event, 'w', 7)"></div>
    <div class="axis-border axis-border-w" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-e" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-n" @mousedown="resize($event, 'w')"></div>
    <div class="axis-border axis-border-s" @mousedown="resize($event, 'w')"></div>

    <div class="axis-rotate" @mousedown="onRoMouseDown"></div>
    <div
      :style="{transform: `rotate(${-currentDeg}deg)`}"
      :class="['axis-rotate-deg', currentDeg%90===0 ? 'axis-rotate-deg-vertical' : '']"
    >{{`${currentDeg}°`}}</div>
    <div class="axis-test" @mousedown="calcPositions"></div>
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
      originPageY: 0,

      center: {
        x: 0,
        y: 0
      },
      deg: 0,
      DEG_SCALE: 3
    };
  },
  computed: {
    currentDeg() {
      if (!this.compData) {
        return 0;
      }
      return this.compData.deg >= 360 ? 0 : this.compData.deg;
    }
  },
  methods: {
    calcPositions(event) {
      event.stopPropagation();
      event.preventDefault();
      let target = event.target.parentNode.parentNode;
      console.log(target, target.getBoundingClientRect());
      let { x, y, width, height } = target.getBoundingClientRect();
      let clientWidth = target.clientWidth;
      let clientHeight = target.clientHeight;

      let angle = this.compData.deg;
      //获取当前组件内接圆半径
      let r =
        Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)) / 2;

      //获取矩形内对角线与边线夹角 以w/h为准
      let w_hAngle = (Math.atan(clientWidth / clientHeight) * 180) / Math.PI;
      let deltaAngle = angle - w_hAngle;
      let delta_R_Angle = angle + w_hAngle;

      let centerPos = {
        x: x + width / 2,
        y: y + height / 2
      };

      let halfH = clientHeight / 2;
      let halfW = clientWidth / 2;

      //topLeft坐标
      let x0 = {
        x: centerPos.x + r * Math.sin((deltaAngle / 180) * Math.PI),
        y: centerPos.y - r * Math.cos((deltaAngle / 180) * Math.PI)
      };

      let x1 = {
        x: centerPos.x + halfH * Math.sin((angle / 180) * Math.PI),
        y: centerPos.y - halfH * Math.cos((angle / 180) * Math.PI)
      };

      let x2 = {
        x: centerPos.x + r * Math.sin((delta_R_Angle / 180) * Math.PI),
        y: centerPos.y - r * Math.cos((delta_R_Angle / 180) * Math.PI)
      };

      let x3 = {
        x: centerPos.x + halfW * Math.cos((angle / 180) * Math.PI),
        y: centerPos.y + halfW * Math.sin((angle / 180) * Math.PI)
      };

      let x4 = {
        x: centerPos.x - r * Math.sin((deltaAngle / 180) * Math.PI),
        y: centerPos.y + r * Math.cos((deltaAngle / 180) * Math.PI)
      };

      let x5 = {
        x: centerPos.x - halfH * Math.sin((angle / 180) * Math.PI),
        y: centerPos.y + halfH * Math.cos((angle / 180) * Math.PI)
      };
      let x6 = {
        x: centerPos.x - r * Math.sin((delta_R_Angle / 180) * Math.PI),
        y: centerPos.y + r * Math.cos((delta_R_Angle / 180) * Math.PI)
      };

      let x7 = {
        x: centerPos.x - halfW * Math.cos((angle / 180) * Math.PI),
        y: centerPos.y - halfW * Math.sin((angle / 180) * Math.PI)
      };
      this.points = [x0, x1, x2, x3, x4, x5, x6, x7];
      document.querySelector("#testdiv").style.left = `${x7.x}px`;
      document.querySelector("#testdiv").style.top = `${x7.y}px`;
      console.log(x0);
    },
    _calcPositions(target) {
      // event.stopPropagation();
      // event.preventDefault();
      // let target = event.target.parentNode.parentNode;
      console.log(target, target.getBoundingClientRect());
      let { x, y, width, height } = target.getBoundingClientRect();
      let clientWidth = target.clientWidth;
      let clientHeight = target.clientHeight;

      let angle = this.compData.deg;
      //获取当前组件内接圆半径
      let r =
        Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)) / 2;

      //获取矩形内对角线与边线夹角 以w/h为准
      let w_hAngle = (Math.atan(clientWidth / clientHeight) * 180) / Math.PI;
      let deltaAngle = angle - w_hAngle;
      let delta_R_Angle = angle + w_hAngle;

      let centerPos = {
        x: x + width / 2,
        y: y + height / 2
      };

      let halfH = clientHeight / 2;
      let halfW = clientWidth / 2;

      //topLeft坐标
      let x0 = {
        x: centerPos.x + r * Math.sin((deltaAngle / 180) * Math.PI),
        y: centerPos.y - r * Math.cos((deltaAngle / 180) * Math.PI)
      };

      let x1 = {
        x: centerPos.x + halfH * Math.sin((angle / 180) * Math.PI),
        y: centerPos.y - halfH * Math.cos((angle / 180) * Math.PI)
      };

      let x2 = {
        x: centerPos.x + r * Math.sin((delta_R_Angle / 180) * Math.PI),
        y: centerPos.y - r * Math.cos((delta_R_Angle / 180) * Math.PI)
      };

      let x3 = {
        x: centerPos.x + halfW * Math.cos((angle / 180) * Math.PI),
        y: centerPos.y + halfW * Math.sin((angle / 180) * Math.PI)
      };

      let x4 = {
        x: centerPos.x - r * Math.sin((deltaAngle / 180) * Math.PI),
        y: centerPos.y + r * Math.cos((deltaAngle / 180) * Math.PI)
      };

      let x5 = {
        x: centerPos.x - halfH * Math.sin((angle / 180) * Math.PI),
        y: centerPos.y + halfH * Math.cos((angle / 180) * Math.PI)
      };
      let x6 = {
        x: centerPos.x - r * Math.sin((delta_R_Angle / 180) * Math.PI),
        y: centerPos.y + r * Math.cos((delta_R_Angle / 180) * Math.PI)
      };

      let x7 = {
        x: centerPos.x - halfW * Math.cos((angle / 180) * Math.PI),
        y: centerPos.y - halfW * Math.sin((angle / 180) * Math.PI)
      };
      let points = [x0, x1, x2, x3, x4, x5, x6, x7];
      console.log(points);
      return points;
      // document.querySelector("#testdiv").style.left = `${x7.x}px`;
      // document.querySelector("#testdiv").style.top = `${x7.y}px`;
      // console.log(x0);
    },
    resize(event, direction, index) {
      console.log("resize");
      console.log(index);
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
      let points = this._calcPositions(target);
      let fixedPoint = points[(index + 4) % 8];
      this.fixedPoint = fixedPoint;
      console.log(fixedPoint);
      this.resizeTarget = target;
      console.log(rule);
      // this.backDeg = this.compData.deg;
      // this.compData.deg = 0;
      document.addEventListener("mousemove", this.mouseMove, false);
      document.addEventListener("mouseup", this.mouseUp, false);
    },
    mouseMove(event) {
      event.stopPropagation();
      event.preventDefault();
      let { pageX, pageY } = event;

      // let deg =
      //   (Math.atan(
      //     Math.abs(pageY - this.fixedPoint.y) /
      //       Math.abs(pageX - this.fixedPoint.x)
      //   ) /
      //     Math.PI) *
      //   180;
      let disX = pageX - this.fixedPoint.x;
      let disY = pageY - this.fixedPoint.y;
      let deg = (Math.atan(Math.abs(disY) / Math.abs(disX)) / Math.PI) * 180;
      // console.log(deg);

      let deltaDeg = 90 - this.compData.deg - deg;
      let distance = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
      console.log(distance);
      let newWidth = distance * Math.sin((deltaDeg / 180) * Math.PI);
      let newHeight = distance * Math.cos((deltaDeg / 180) * Math.PI);
      console.log(newWidth, newHeight);
      this.compData.width = newWidth;
      this.compData.height = newHeight;
      return;
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
      // let {
      //   x: cX,
      //   y: cY,
      //   width: cWidth,
      //   height: cHeight
      // } = compParentEl.getBoundingClientRect();
      let { left: cX, top: cY, width: cWidth, height: cHeight } = this.compData;
      console.log(cWidth, cHeight, cX, cY);
      //   compParentEl.style.left = `${left + cX - aX}px`;
      //   compParentEl.style.top = `${top + cY - aY}px`;
      let compEl = document.querySelector(
        "#" + document.querySelector(".comp-axis").getAttribute("comp-id")
      );
      //   compEl.style.width = `${width + cWidth}px`;
      //   compEl.style.height = `${height + cHeight}px`;
      console.log(this.compData);
      this.compData.width = width + +cWidth;
      this.compData.height = height + +cHeight;
      this.compData.top = top + cY;
      // this.compData.deg = this.backDeg;
      this.compData.left = left + cX;
      this.originPageX = pageX;
      this.originPageY = pageY;
      console.log(target.parentNode.parentNode);
    },
    mouseUp(event) {
      event.stopPropagation();
      event.preventDefault();
      document.removeEventListener("mousemove", this.mouseMove, false);
      document.removeEventListener("mouseup", this.mouseUp, false);
    },

    onRoMouseDown($event) {
      $event.stopPropagation();
      $event.preventDefault();

      let rotateItem = this.$el.parentNode;
      let { x, y, width, height } = rotateItem.getBoundingClientRect();
      this.center.x = x + width / 2;
      this.center.y = y + height / 2;
      console.log(this.center);

      this.deg = this.compData.deg;
      this.tempDeg = this.compData.deg;
      console.log(this.deg);
      // return;
      let { pageX, pageY } = $event;
      this.originPos = {
        x: pageX - this.center.x,
        y: pageY - this.center.y
      };
      //   if (this.originPos) {
      //     this.calcDeg(current, this.originPos);
      //   }
      //   this.originPos = { ...current };
      document.addEventListener("mousemove", this.onRoMouseMove, false);
      document.addEventListener("mouseup", this.onRoMouseUp, false);
    },
    onRoMouseMove($event) {
      let { pageX, pageY } = $event;
      let current = {
        x: pageX - this.center.x,
        y: pageY - this.center.y
      };
      let newDeg = this.calcDeg(current, this.originPos);
      this.compData.deg = newDeg;
      this.originPos = current;
    },
    onRoMouseUp($event) {
      document.removeEventListener("mousemove", this.onRoMouseMove, false);
      document.removeEventListener("mouseup", this.onRoMouseUp, false);
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
      let newDeg = Number((this.tempDeg + zDeg).toFixed(2));
      if (crossMultiply < 0) {
        newDeg = Number((this.tempDeg - zDeg).toFixed(2));
      }
      if (newDeg >= 360) {
        newDeg = 0;
      } else if (newDeg < 0) {
        newDeg = 360 + newDeg;
      }
      this.tempDeg = newDeg;
      if (this.deg % 90 === 0) {
        if (
          this.tempDeg >
            (this.deg === 0 ? (crossMultiply < 0 ? 360 : 0) : this.deg) -
              this.DEG_SCALE &&
          this.tempDeg <
            (this.deg === 0 ? (crossMultiply < 0 ? 360 : 0) : this.deg) +
              this.DEG_SCALE
        ) {
          return this.deg;
        }
      } else {
        if (newDeg % 90 >= 90 - this.DEG_SCALE && newDeg % 90 < 90) {
          newDeg = 90 * (Math.floor(newDeg / 90) + 1);
        } else if (newDeg % 90 <= this.DEG_SCALE && newDeg % 90 > 0) {
          newDeg = 90 * Math.floor(newDeg / 90);
        }
      }
      newDeg = newDeg >= 360 ? 0 : newDeg;
      this.tempDeg = newDeg;
      this.deg = newDeg;
      console.log(newDeg);
      return newDeg;
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

.axis-rotate {
  position: absolute;
  top: -40px;
  left: calc(50% - 12px);
  width: 24px;
  height: 24px;
  background-image: url(../../assets/images/rota.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  cursor: pointer; /* cursor: none; 消除鼠标样式 */
}

.axis-test {
  position: absolute;
  top: -80px;
  left: calc(50% - 12px);
  width: 24px;
  height: 24px;
  background-image: url(../../assets/images/rota.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  cursor: pointer; /* cursor: none; 消除鼠标样式 */
}

.axis-rotate-deg {
  position: absolute;
  left: calc(50% + 20px);
  top: -40px;
  color: blue;
  background: #ffffff;
  border-radius: 6px;
}

.axis-rotate-deg-vertical {
  color: red;
  font-weight: bold;
}
</style>