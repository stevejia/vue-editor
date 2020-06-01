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
            <div
              style="width: 100%; height: 100%;"
              @drop="drop"
              @dragover="allowDrop"
              @drag="mouseMove"
              @mousedown="moudeDown"
              class="editor-container"
            ></div>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="230px">
        <div>
          <div
            :draggable="true"
            @drag="mouseMove"
            @dragstart="dragStart"
            style="width: 50px; height: 50px; background: red;"
          ></div>
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
import SplitPane from "@/components/SplitPane.vue";
export default {
  name: "Home",
  components: { SplitPane },
  data() {
    return {
      originPos: {
        deltaX: 0,
        deltaY: 0
      },
      positions: [],
      idIndex: 0
    };
  },
  mounted() {
    // document.addEventListener("mousemove", this.mouseMove, true);
  },
  methods: {
    dragStart(event) {
      // let target = event.target.cloneNode(true);
      let target = event.target;
      let rect = target.getBoundingClientRect();
      console.log(rect);
      let deltaX = event.pageX - rect.left;
      let deltaY = event.pageY - rect.top;
      this.originPos = {
        deltaX,
        deltaY
      };
      this.target = target.cloneNode(true);
      this.target.addEventListener("dragstart", e => {
        console.log(e);
        this.target = e.target;
      });
      this.target.addEventListener("drop", e => {
        e.preventDefault();
        e.stopPropagation();
      });
    },
    moudeDown(event) {
      let target = event.target;
      // target.addEventListener("mousemove", this.mouseMove, true);
      // target.addEventListener("mouseup", this.mouseUp, true);
    },
    mouseUp(event) {
      let target = event.target;
      target.removeEventListener("mousemove", this.mouseMove, true);
      target.removeEventListener("mouseup", this.mouseUp, true);
    },
    mouseMove(e) {
      let target = e.target;
      let id = target.getAttribute("id");
      // console.log(e.pageX, e.pageY);
      let left = e.pageX - this.originPos.deltaX;
      let top = e.pageY - this.originPos.deltaY;
      let sameLeft = this.positions.filter(pos => {
        return pos.id !== id && pos.left === left;
      });
      if (sameLeft.length) {
        console.log(sameLeft);
        let tops = sameLeft.map(sl => {
          return sl.top;
        });
        let min = Math.min(top, ...[tops]);
        let max = Math.max(top, ...[tops]);
        let div = document.createElement("div");
        div.style.borderLeft = "1px dashed red";
        div.style.height = `${max - min}px`;
        div.style.position = "absolute";
        div.style.left = `${left}px`;
        div.style.top = `${min}px`;
        div.classList.add("guide-line");
        document.body.append(div);
      } else {
        let divs = document.querySelectorAll(".guide-line");
        if (divs.length) {
          document.body.removeChild(divs[0]);
        }
      }
    },
    allowDrop(event) {
      event.preventDefault();
    },
    dragEnter(event) {
      console.log(event);
    },
    drop(event) {
      setTimeout(() => {
        console.log(event.pageX, event.pageY);
        let left = event.pageX - this.originPos.deltaX;
        let top = event.pageY - this.originPos.deltaY;
        this.target.style.position = "absolute";
        this.target.style.left = `${left}px`;
        this.target.style.top = `${top}px`;

        let dropTarget = event.target;
        let id = this.target.getAttribute("id");
        if (!id) {
          id = ++this.idIndex;
          this.target.setAttribute("id", id);
        }
        dropTarget.append(this.target);
        this.positions.push({
          id,
          left,
          top,
          width: this.target.clientWidth,
          height: this.target.clientHeight
        });
        console.log(this.posDic);
      }, 0);
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

.el-main {
  padding: 0;
}

.main-container {
  width: 100%;
  height: 100%;
  background: #999999;
  background-image: linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0),
    linear-gradient(white 1px, transparent 0),
    linear-gradient(90deg, white 1px, transparent 0);
  background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
}

/* background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg,rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
    // background-size: 20px 20px;
     background-position: center center; */
</style>
