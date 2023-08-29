"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

export default function Page() {
  useEffect(() => {
    if (WebGL.isWebGLAvailable()) {
      const width = 768;
      const height = 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(renderer.domElement);

      const material = new THREE.LineBasicMaterial({ color: 0xffffff });

      const points = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));
      points.push(new THREE.Vector3(0, -10, 0));
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(0, -10, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.Line(geometry, material);

      scene.add(lineMaterial);
      renderer.render(scene, camera);
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