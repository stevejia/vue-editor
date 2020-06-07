import httpVueLoader from "http-vue-loader";
import { registerComponent } from "@/utils/registerComponents";
export default async function loadComp(compData, container, callback) {
    container = container || 'editor-area-inner';
    httpVueLoader.httpRequest = function () {
        // console.log(url);
        // // return new Promise(() => {
        // //   console.log(1);
        // // }).then(() => {
        // //   return testData;
        // // });
        // let xhr = new XMLHttpRequest();
        // xhr.open("GET", "./components/MountComponent1.txt", true);
        // xhr.send(null);
        // xhr.onload = (res) => {
        //     console.log(res);
        // };
        // return axios
        //     .get("")
        //     .then(function (res) {
        //         return res.data;
        //     })
        //     .catch(function (err) {
        //         return Promise.reject(err.status);
        //     });
        return new Promise(() => { }).then(() => {
            return new Promise(() => { }).then(function () {
                return compData
            }).catch(function (err) {
                return Promise.reject(err.status);
            });
        })
    };
    let component = await httpVueLoader('empty.vue')();
    let element = registerComponent(component, container)
    callback && callback(element)
    console.log(compData);
    // test().then((comp) => {
    //     console.log(comp);
    //     const constructor = Vue.extend(comp);
    //     console.log(constructor);
    //     const instance = new constructor();
    //     let mountContainer = document.createElement("div");
    //     mountContainer.setAttribute("id", "mount-area");
    //     // let containerEl = document.querySelector(container).cloneNode(true);
    //     let editorEl = document.querySelector(".about");
    //     editorEl.appendChild(mountContainer);
    //     // 挂载到 ID 为 plateContainer 的DOM元素
    //     instance.$mount("#mount-area");
    // });
}