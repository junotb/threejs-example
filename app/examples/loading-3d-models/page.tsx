"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Page() {
  useEffect(() => {
    const width = 768;
    const height = 768;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;

    const init = () => {

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 20);
      camera.position.set(-1.8, 0.6, 2.7);
      
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(renderer.domElement);

      render();

      const loader = new GLTFLoader().setPath('/models/Duck/glTF/');
      loader.load('Duck.gltf', (gltf) => {
        scene.add(gltf.scene);
        render();
      });


      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', render); // use if there is no animation loop
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set(0, 0, -0.2);
      controls.update();

      window.addEventListener('resize', onWindowResize);
    }

    const onWindowResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

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