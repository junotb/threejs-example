"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Page() {
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  
  useEffect(() => {
    const width = 768;
    const height = 768;

    const init = () => {
      sceneRef.current = new THREE.Scene();
      //sceneRef.current.background = new THREE.Color(0xffffff);
      cameraRef.current = new THREE.PerspectiveCamera(45, width / height, 0.25, 20);
      cameraRef.current.position.z = 5;
      
      rendererRef.current = new THREE.WebGLRenderer();
      rendererRef.current.setSize(width, height);

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(rendererRef.current.domElement);

      const loader = new GLTFLoader().setPath('/models/Duck/glTF/');
      loader.load('Duck.gltf', (gltf) => {
        sceneRef.current!.add(gltf.scene);
        render();
      });
      
      //sceneRef.current.add(new THREE.AmbientLight(0xffffff));
      sceneRef.current.add(new THREE.DirectionalLight(0xffffff, 0.5));

      const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controls.addEventListener('change', render); // use if there is no animation loop
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set(0, 0, -0.2);
      controls.update();

      window.addEventListener('resize', onWindowResize);
    }

    const onWindowResize = () => {
      cameraRef.current!.aspect = width / height;
      cameraRef.current!.updateProjectionMatrix();

      rendererRef.current!.setSize(width, height);

      render();
    }

    const render = () => {
      if(rendererRef.current) {
        rendererRef.current.render(sceneRef.current!, cameraRef.current!);
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
    <main className="flex justify-center items-center w-full min-h-screen">
      
    </main>
 )
}