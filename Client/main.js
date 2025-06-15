import * as THREE from './node_modules/three/src/Three.js';
import * as Networking from './Networking/ClientConnections.js';
import * as CameraHelper from './Camera/CameraHelper.js';
import * as Loaders from './Loaders/loaders.js';

//#region Create scene, camera, and renderer
// Create scene
const scene = new THREE.Scene();
const camera = CameraHelper.createCamera();
// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//#endregion

//#region Lighting
// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);
//#endregion

//#region Conect and Create Platform
let connectionObject = await Networking.connect();
let platformData = await Networking.getPlatformData(connectionObject.room);

platformData.forEach(data => {
    Loaders.createCube(scene, data);
});

camera.position.set(6,5,15);
camera.lookAt(new THREE.Vector3(6, 0, 6));

//#endregion

//#region Temp Helpers
const gridHelper = new THREE.GridHelper(40, 40); // size, divisions
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//#endregion




// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});