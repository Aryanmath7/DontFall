import * as THREE from '../node_modules/three/src/Three.js';

export function createCamera(lookAt = new THREE.Vector3(0, 0, 0), position = new THREE.Vector3(4, 4, 8)) {
    const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(lookAt);
    return camera;
}