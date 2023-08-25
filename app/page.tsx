import Link from 'next/link';

export default function Home() {
  /*
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  */

  return (
    <main className="">
      <div>
        <Link href="/examples/1">Creating a scene</Link>
        <Link href="/examples/2">WebGL compatibility check</Link>
        <Link href="/examples/3">Drawing lines</Link>
        <Link href="/examples/4">Creating text</Link>
        <Link href="/examples/5">Loading 3D models</Link>
      </div>
    </main>
  )
}
