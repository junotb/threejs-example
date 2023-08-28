"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

export default function Page() {
  useEffect(() => {
    if (WebGL.isWebGLAvailable()) {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();

      //create a blue LineBasicMaterial
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

      const points = [];
      points.push(new THREE.Vector3( - 10, 0, 0 ));
      points.push(new THREE.Vector3( 0, 10, 0 ));
      points.push(new THREE.Vector3( 10, 0, 0 ));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      scene.add(line);
      renderer.render(scene, camera);
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