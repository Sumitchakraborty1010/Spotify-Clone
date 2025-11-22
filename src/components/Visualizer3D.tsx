import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getUser, getTimeSpent } from "@/lib/storage";
import { genreColors } from "@/lib/mockData";

const Visualizer3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  useEffect(() => {
    if (!mountRef.current || !user) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Get genre-specific color
    const genreColor = genreColors[user.genre] || "141 76% 48%";
    const [h, s, l] = genreColor.split(" ");
    const hueValue = parseInt(h) / 360;
    const primaryColor = new THREE.Color().setHSL(hueValue, parseInt(s) / 100, parseInt(l) / 100);

    // Create geometric visualizer bars
    const barCount = 32;
    const bars: THREE.Mesh[] = [];
    const barGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);

    for (let i = 0; i < barCount; i++) {
      const barMaterial = new THREE.MeshPhongMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 0.5,
        shininess: 100,
      });

      const bar = new THREE.Mesh(barGeometry, barMaterial);
      const angle = (i / barCount) * Math.PI * 2;
      const radius = 5;
      bar.position.x = Math.cos(angle) * radius;
      bar.position.z = Math.sin(angle) * radius;
      bar.position.y = 0;

      scene.add(bar);
      bars.push(bar);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, 2, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Camera position
    camera.position.y = 5;
    camera.position.z = 12;
    camera.lookAt(0, 0, 0);

    // Animation variables
    let time = 0;
    const timeSpent = getTimeSpent();
    const intensityMultiplier = 1 + (timeSpent / 3600) * 0.5; // Increases with time spent

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      bars.forEach((bar, i) => {
        // Create wave patterns based on time and genre
        const wave1 = Math.sin(time * 2 + i * 0.2) * intensityMultiplier;
        const wave2 = Math.cos(time * 3 - i * 0.1) * intensityMultiplier;
        const height = Math.abs(wave1 + wave2) * 2 + 1;

        bar.scale.y = height;
        bar.position.y = height / 2;

        // Rotate bars
        bar.rotation.y += 0.01;

        // Pulse the emissive intensity
        const material = bar.material as THREE.MeshPhongMaterial;
        material.emissiveIntensity = 0.3 + Math.sin(time * 4 + i * 0.3) * 0.3;
      });

      // Rotate camera slowly
      camera.position.x = Math.sin(time * 0.1) * 12;
      camera.position.z = Math.cos(time * 0.1) * 12;
      camera.lookAt(0, 0, 0);

      // Pulse the point light
      pointLight.intensity = 1.5 + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [user]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Visualizer3D;
