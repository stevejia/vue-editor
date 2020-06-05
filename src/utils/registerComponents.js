import Vue from 'vue';
import components from '@/editor-components'
export function registerComponent(component, id) {
    // console.log(1);
    // let src = `@/components/${templateName}.vue`
    // import(src).then(component => {
    //     const constructor = Vue.extend(component.default);
    //     const instance = new constructor({
    //         data
    //     });

    //     // // 传入数据 dataObj 为 props 
    //     // instance.dataObj = this.form;

    //     // // 监听抛出的数据  this.$emit("emitStream", {  data: "data" });
    //     // instance.$on("emitStream", params => {
    //     //     //  params 为组件内部抛出的数据

    //     // });

    //     // 挂载到 ID 为 plateContainer 的DOM元素
    //     instance.$mount(container);

    //     // console.log(templateName + " 加载成功");
    // });
    // let src = `../../editor-components/${templateName}.js`
    // import(src).then(component => {
    //     const constructor = Vue.extend(component.default);
    //     const instance = new constructor({
    //         data
    //     });

    //     // // 传入数据 dataObj 为 props 
    //     // instance.dataObj = this.form;

    //     // // 监听抛出的数据  this.$emit("emitStream", {  data: "data" });
    //     // instance.$on("emitStream", params => {
    //     //     //  params 为组件内部抛出的数据

    //     // });

    //     // 挂载到 ID 为 plateContainer 的DOM元素
    //     instance.$mount(container);

    //     // console.log(templateName + " 加载成功");
    // });
    // console.log(components);
    // let component = components[templateName];
    console.log(component);
    const constructor = Vue.extend(component.content);
    const instance = new constructor();

    // // 传入数据 dataObj 为 props 
    // instance.dataObj = this.form;

    // // 监听抛出的数据  this.$emit("emitStream", {  data: "data" });
    // instance.$on("emitStream", params => {
    //     //  params 为组件内部抛出的数据

    // });
    let mountContainer = document.createElement('div');
    mountContainer.setAttribute('id', 'mount-area');
    // let containerEl = document.querySelector(container).cloneNode(true);
    let editorEl = document.querySelector('.editor-area-inner');
    editorEl.appendChild(mountContainer);
    // 挂载到 ID 为 plateContainer 的DOM元素
    instance.$mount('#mount-area');
    return instance;


    // console.log(templateName + " 加载成功");
}