import * as THREE from '../node_modules/three/src/Three.js';

export function createCube(scene, data) {
    console.log("Creating platform with data:", data);
    const platformGeometry = new THREE.BoxGeometry(data.size, 0.1, data.size);
    // Generate a random color
    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    const platformMaterial = new THREE.MeshStandardMaterial({ color: randomColor });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(data.x, data.y, data.z);
    scene.add(platform);
    return platform;
}