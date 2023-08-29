"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

export default function Page() {
  useEffect(() => {
    if (WebGL.isWebGLAvailable()) {
      const width = 768;
      const height = 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(renderer.domElement);
      
      const group = new THREE.Group();

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      group.add(new THREE.LineSegments(geometry, lineMaterial));

      const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      group.add(new THREE.Mesh(geometry, meshMaterial));

      scene.add(group);

      const animate = () => {
        requestAnimationFrame(animate);

        group.rotation.x += 0.01;
        group.rotation.y += 0.01;
        
        renderer.render(scene, camera);
      }
      animate();
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