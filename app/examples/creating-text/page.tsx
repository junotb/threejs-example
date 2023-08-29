"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

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

      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const geometry = new TextGeometry('Hello three.js!', {
          font: font,
          size: 8,
          height: 0,
          curveSegments: 1,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 0
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -30;
        mesh.position.y = 0;

        const group = new THREE.Group();
        group.add(mesh);

        scene.add(group);
        renderer.render(scene, camera);
      });
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