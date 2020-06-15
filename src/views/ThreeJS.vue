<template>
  <el-container style="height: 100%; width: 100%;">
    <el-aside width="230px">
      <el-menu :default-active="defaultActive" @select="onMenuSelect">
        <el-menu-item v-for="(item, idx) in demoMenus" :key="idx" :index="idx">
          <i class="el-icon-basketball"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div id="three-container" style="width: 100%; height: 100%;"></div>
    </el-main>
  </el-container>
</template>
<script>
import demoMenus from "@/utils/threedemo";
export default {
  data() {
    return { demoMenus, defaultActive: 0 };
  },
  mounted() {
    this.init();
  },
  methods: {
    onMenuSelect(index) {
      this.demoMenus[index].onClick();
    },
    init() {
      this.demoMenus[this.defaultActive].onClick();
    }
  }
};
</script>