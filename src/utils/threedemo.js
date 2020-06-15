import "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default [{
    label: '创建一个立方体',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            // requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
    }

}, {
    label: '创建旋转立方体',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
    }

}, {
    label: '鼠标操作旋转缩放',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            // requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render);
    }

}, {
    label: '插入球体',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            // requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        render();
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render);
    }

}, {
    label: '材质&贴图',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.BoxGeometry(250, 250, 250); //创建一个立方体几何对象Geometry
        // var material = new THREE.MeshLambertMaterial({
        //     color: 0x0000ff
        // }); //材质对象Material
        let textureLoader = new THREE.TextureLoader();
        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        textureLoader.load('images/material.png', function (texture) {
            var material = new THREE.MeshToonMaterial({
                map: texture
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中

            //纹理贴图加载成功后，调用渲染函数执行渲染操作
            render();
        })
        // var material = new THREE.MeshPhongMaterial({
        //     map: THREE.ImageUtils.loadTexture('https://wow.techbrood.com/uploads/1702/crate.jpg')
        // }); //材质对象Material
        // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            // requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        // render();
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render);
    }

}, {
    label: '材质&贴图',
    onClick() {
        let container = document.querySelector('#three-container');
        container.innerHTML = '';
        /**
       * 创建场景对象Scene
       */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */

        let geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
            0, 0, 0, //顶点1坐标
            50, 0, 0, //顶点2坐标
            0, 50, 0, //顶点3坐标
            0, 0, 0, //顶点4坐标
            0, 0, 50, //顶点5坐标
            50, 0, 0, //顶点6坐标
            0, 0, 0,
            0, 50, 0,
            0, 0, 50
        ])
        let attribute = new THREE.BufferAttribute(vertices, 3);
        geometry.attributes.position = attribute;
        //   var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        // var geometry = new THREE.BoxGeometry(250, 250, 250); //创建一个立方体几何对象Geometry
        // var material = new THREE.MeshLambertMaterial({
        //     color: 0x0000ff
        // }); //材质对象Material
        // let textureLoader = new THREE.TextureLoader();
        // // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        // textureLoader.load('images/material.png', function (texture) {
        //     var material = new THREE.MeshToonMaterial({
        //         map: texture
        //     }); //材质对象Material
        //     var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        //     scene.add(mesh); //网格模型添加到场景中

        //     //纹理贴图加载成功后，调用渲染函数执行渲染操作
        //     render();
        // })

        // // 三角面(网格)渲染模式
        // var material = new THREE.MeshBasicMaterial({
        //     color: 0x0000ff, //三角面颜色
        //     side: THREE.DoubleSide //两面可见
        // }); //材质对象
        // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // scene.add(mesh);
        // // 点渲染模式
        var material = new THREE.PointsMaterial({
            // color: 0xff0000,
            vertexColors: THREE.VertexColors,
            size: 10.0 //点对象像素尺寸
        }); //材质对象
        var points = new THREE.Points(geometry, material); //点模型对象
        scene.add(points); //点对象添加到场景中

        // 线条渲染模式
        // var material = new THREE.LineBasicMaterial({
        //     color: 0xff0000 //线条颜色
        // });//材质对象
        // var line = new THREE.Line(geometry, material);//线条模型对象
        // scene.add(line);//线条对象添加到场景中

        let geometry2 = new THREE.BufferGeometry();
        var vertices = new Float32Array([
            100, 100, 100, //顶点1坐标
            100, 300, 100, //顶点2坐标
            300, 300, 100, //顶点3坐标
            100, 100, 100, //顶点4坐标
            300, 100, 100, //顶点5坐标
            300, 300, 100 //顶点6坐标
        ])
        let attribute2 = new THREE.BufferAttribute(vertices, 3);
        geometry2.attributes.position = attribute2;
        var colors = new Float32Array([
            1, 0, 0, //顶点1颜色
            0, 1, 0, //顶点2颜色
            0, 0, 1, //顶点3颜色

            1, 1, 0, //顶点4颜色
            0, 1, 1, //顶点5颜色
            1, 0, 1, //顶点6颜色
        ]);
        // 设置几何体attributes属性的颜色color属性
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
        // let textureLoader = new THREE.TextureLoader();
        // let texture = textureLoader.load('images/material2.png');
        // var material2 = new THREE.MeshBasicMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide //两面可见
        // }); //材质对象
        // var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
        // scene.add(mesh2);

        let textureLoader = new THREE.TextureLoader();
        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        textureLoader.load('images/material2.png', function (texture) {
            var material2 = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide //两面可见
            }); //材质对象Material
            var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
            scene.add(mesh2); //网格模型添加到场景中

            //纹理贴图加载成功后，调用渲染函数执行渲染操作
            render();
        })

        // var material = new THREE.MeshPhongMaterial({
        //     map: THREE.ImageUtils.loadTexture('https://wow.techbrood.com/uploads/1702/crate.jpg')
        // }); //材质对象Material
        // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(100, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x0000000);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */

        var width = container.clientWidth; //窗口宽度
        var height = container.clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

        container.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //   renderer.render(scene, camera);
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
            // requestAnimationFrame(render); //请求再次执行渲染函数render
        }
        // render();
        // render();
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render);
    }

}]