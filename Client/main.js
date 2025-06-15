import * as THREE from './node_modules/three/src/Three.js';
import * as Networking from './Networking/ClientConnections.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.y = 5;
camera.position.x = 5;
camera.position.z = 15;


// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// Create a platform based on the received data
function createPlatform(data) {
    console.log("Creating platform with data:", data);
    const platformGeometry = new THREE.BoxGeometry(data.size, 0.1, data.size);
    // Generate a random color
    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    const platformMaterial = new THREE.MeshStandardMaterial({ color: randomColor });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(data.x, data.y, data.z);
    scene.add(platform);
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let connectionObject = await Networking.connect();
let platformData = await Networking.getPlatformData(connectionObject.room);

platformData.forEach(data => {
    createPlatform(data);
});

camera.lookAt(4,4,4);
