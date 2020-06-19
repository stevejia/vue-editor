export default [{
    title: "挂载组件1",
    name: "MountComponent1",
    content: "<template>\n  <div :style=\"{width: `${width}px`, height: `${height}px`, opacity: opacity, display: \'flex\', justifyContent: hAlign, alignItems: vAlign, background: background, color: color}\">\n    {{ text }}    \n  </div>\n</template>\n<script>\nmodule.exports = {\n  data() {\n    return {text: \"我是component1\", left: 0, top: 0, deg: 0 , width: 300, height: 300, opacity: 1, vAlign: 'center', hAlign: 'center', background: '#ff0000', color: '#00ff00'};\n  }\n};\n</script>"
}]