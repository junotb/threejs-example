"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Page() {
  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;

    const init = () => {
      const container = document.createElement('div');

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(container);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
      camera.position.set(-1.8, 0.6, 2.7);

      scene = new THREE.Scene();

      render();

      const loader = new GLTFLoader().setPath('/models/Duck/glTF/');
      loader.load('Duck.gltf', (gltf) => {
        scene.add(gltf.scene);
        render();
      });

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement );
      controls.addEventListener('change', render); // use if there is no animation loop
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set(0, 0, - 0.2 );
      controls.update();

      window.addEventListener('resize', onWindowResize);
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    }

    const render = () => {
      if(renderer) {
        renderer.render(scene, camera);
      }
    }

    if (WebGL.isWebGLAvailable()) {
      init();
      render();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      const main = document.getElementsByTagName('main')[0];
      main.appendChild(warning);
    }
  }, []);

  return (
    <main></main>
 )
}