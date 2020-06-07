import Vue from 'vue';
export function registerComponent(component, container) {
    container = container || '.editor-area-inner'
    const Component = Vue.extend(component);
    const instance = new Component();
    let mountContainer = document.createElement("div");
    mountContainer.setAttribute("id", "mount-area");
    // let containerEl = document.querySelector(container).cloneNode(true);
    let editorEl = document.querySelector(container);
    editorEl.appendChild(mountContainer);
    // 挂载到 ID 为 plateContainer 的DOM元素
    instance.$mount("#mount-area");
    return instance;
}