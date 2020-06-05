export function registerComponent(templateName = '', data, id, container) {
    console.log(1);
    // let test = require(`./component/${templateName}.vue`);
    import(`./component/${templateName}.vue`).then(component => {
        const constructor = Vue.extend(component.default);
        const instance = new constructor({
            data
        });

        // // 传入数据 dataObj 为 props 
        // instance.dataObj = this.form;

        // // 监听抛出的数据  this.$emit("emitStream", {  data: "data" });
        // instance.$on("emitStream", params => {
        //     //  params 为组件内部抛出的数据

        // });

        // 挂载到 ID 为 plateContainer 的DOM元素
        instance.$mount(container);

        // console.log(templateName + " 加载成功");
    });
    console.log(2);
}