import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import '../styles/global.css';

const Scene = () => {
  const cubeRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cubeRef.current.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x2f6bbd });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect =
        cubeRef.current.offsetWidth / cubeRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        cubeRef.current.offsetWidth,
        cubeRef.current.offsetHeight
      );
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [cubeRef]);

  return <div ref={cubeRef} style={{ width: `100vw`, height: `100vh` }}></div>;
};

export default Scene;
