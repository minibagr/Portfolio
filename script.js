import * as THREE from 'three'

const lines = document.getElementById('lines')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    lines.clientWidth / lines.clientHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(lines.clientWidth, lines.clientHeight)
lines.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(7, 4, 20, 13)
const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

cube.rotation.set(96, 0, 0)
cube.position.z = 3

const positions = geometry.attributes.position.count

const clock = new THREE.Clock()

function animate() {
    const t = clock.getElapsedTime()

    for (let i = 0; i < positions; i++) {
        const x = geometry.attributes.position.getX(i)
        const y = geometry.attributes.position.getY(i)

        const waveX1 = 0.1 * Math.sin(x * 2 + t)
        const waveX2 = 0.07 * Math.sin(x * 3 + t * 2)
        const waveY1 = 0.09 * Math.sin(y * 2 + t * 0.5)
        const waveY2 = 0.07 * Math.sin(y * 4 + t * 2)
        geometry.attributes.position.setZ(i, waveX1 + waveX2 + waveY1 + waveY2)
    }

    cube.geometry.attributes.position.needsUpdate = true
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
    camera.aspect = lines.clientWidth / lines.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(lines.innerWidth, lines.innerHeight)
})
