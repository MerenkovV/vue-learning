import { defineStore } from "pinia";
import { shallowRef } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const useThreeStore = defineStore("threeStore", {
  state: () => ({
    scene: shallowRef(new THREE.Scene()),
    camera: shallowRef(
      new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
    ),
    renderer: shallowRef(new THREE.WebGLRenderer()),
    cube: shallowRef(
      new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      )
    ),
    sphere: shallowRef(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
      )
    ),
    pyramid: shallowRef(
      new THREE.Mesh(
        new THREE.ConeGeometry(1, 3, 4),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      )
    ),
    light: shallowRef(new THREE.DirectionalLight(0xffffff, 1)),
    ambientLight: shallowRef(new THREE.AmbientLight(0x404040, 1)), // мягкое белое освещение
    controls: null as OrbitControls | null, // Переменная для хранения OrbitControls
  }),
  actions: {
    initScene() {
      // Настройка рендерера
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("map")?.appendChild(this.renderer.domElement);

      // Позиционируем камеру
      this.camera.position.z = 5;

      // Добавляем свет
      this.scene.add(this.light);
      this.scene.add(this.ambientLight);

      // Добавляем фигуры в сцену
      this.scene.add(this.cube);
      // this.scene.add(this.sphere);
      this.scene.add(this.pyramid);

      // Размещение фигур
      this.cube.position.x = -2.5;
      this.sphere.position.x = 0;
      this.pyramid.position.x = 2.5;

      const gltfLoader = new GLTFLoader();
      const url = "./Rose.glb";
      gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        this.scene.add(root);
      });

      // Размещение света
      this.light.position.set(5, 5, 5); // Позиция для направленного света

      if (this.camera && this.renderer.domElement) {
        this.controls = new OrbitControls(
          this.camera,
          this.renderer.domElement
        );
        this.controls.enableDamping = true; // Включаем сглаживание
        this.controls.dampingFactor = 0.25; // Настройка силы сглаживания
        this.controls.screenSpacePanning = false; // Запрещаем панорамирование экрана
        this.controls.maxPolarAngle = Math.PI / 2; // Ограничение угла поворота по вертикали
      }
    },

    animate() {
      if (!this.scene || !this.camera || !this.renderer || !this.cube) return;

      if (this.controls) {
        this.controls.update(); // Это необходимо для включения сглаживания
      }

      // Рендерим сцену
      this.renderer.render(this.scene, this.camera);

      // Запускаем анимацию
      requestAnimationFrame(this.animate);
    },

    resize() {
      if (!this.renderer || !this.camera) return;

      // Подстраиваем размер канваса под размер окна
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    },
    deInit() {
      this.scene.clear();
      this.renderer.clear();
    },
  },
});
