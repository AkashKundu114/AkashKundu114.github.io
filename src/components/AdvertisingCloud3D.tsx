import React, { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export type NodeCategory = 'channel' | 'ai' | 'infra' | 'data';
export type CloudDisplayMode = 'cloud' | 'agent' | 'datamesh';

export interface CloudNode {
  readonly id: string;
  readonly name: string;
  readonly category: NodeCategory;
  readonly color: string;
  readonly radius: number;
  readonly speed: number;
  readonly theta: number;
  readonly phi: number;
  readonly role: string;
  readonly stats: string;
}

export interface DisplayModeOption {
  readonly id: CloudDisplayMode;
  readonly label: string;
}

export const CLOUD_DISPLAY_MODES: readonly DisplayModeOption[] = [
  { id: 'cloud', label: 'Advertising Cloud' },
  { id: 'agent', label: 'AI Agent Swarm' },
  { id: 'datamesh', label: 'Multi-Tenant Mesh' },
] as const;

export const NODES_DATA: readonly CloudNode[] = [
  {
    id: 'ai-assistant',
    name: 'AI Agent Swarm',
    category: 'ai',
    color: '#34d399',
    radius: 4.8,
    speed: 0.008,
    theta: 0.2,
    phi: 0.4,
    role: 'Autonomous marketing intelligence & conversational queries',
    stats: 'LangGraph · Ollama · MCP Gateway · <4ms dispatch',
  },
  {
    id: 'search-channel',
    name: 'Search & RTB Engine',
    category: 'channel',
    color: '#60a5fa',
    radius: 5.2,
    speed: 0.006,
    theta: 1.8,
    phi: 0.9,
    role: 'Real-time bidding & multi-channel budget arbitration',
    stats: 'Google Ads API · Dynamic CPA optimization · Sub-10ms Bidding',
  },
  {
    id: 'social-channel',
    name: 'Social Attribution Mesh',
    category: 'channel',
    color: '#f472b6',
    radius: 4.5,
    speed: 0.009,
    theta: 3.4,
    phi: 1.6,
    role: 'Cross-platform conversions & moment-marketing triggers',
    stats: 'Meta Graph · Hotstar LIVE match triggers · Cadbury 2.0 scale',
  },
  {
    id: 'multitenant-sql',
    name: 'Multi-Tenant Data Store',
    category: 'data',
    color: '#fbbf24',
    radius: 5.5,
    speed: 0.005,
    theta: 4.6,
    phi: 2.3,
    role: 'Tenant-isolated high-concurrency transactional ledger',
    stats: 'MS SQL Server · PostgreSQL · Redis Cache · Zero-leakage ACL',
  },
  {
    id: 'telemetry-elk',
    name: 'ELK Telemetry & Observability',
    category: 'infra',
    color: '#a78bfa',
    radius: 4.2,
    speed: 0.007,
    theta: 5.8,
    phi: 0.7,
    role: 'Full-stack centralized monitoring & log aggregation',
    stats: 'Elasticsearch · Logstash · Kibana · Azure Container Apps',
  },
] as const;

interface NodeMeshEntry {
  readonly mesh: THREE.Mesh;
  readonly haloMesh: THREE.Mesh;
  readonly data: CloudNode;
}

interface SceneBundle {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  rootGroup: THREE.Group;
  coreMesh: THREE.Mesh;
  innerMesh: THREE.Mesh;
  particleCloud: THREE.Points;
  nodeEntries: NodeMeshEntry[];
  arcLines: THREE.Line[];
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
}

function isWebGLSupported(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  try {
    const testCanvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function setupSceneLighting(scene: THREE.Scene): void {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const keyPointLight = new THREE.PointLight(0xafd2fa, 2, 20);
  keyPointLight.position.set(5, 5, 8);
  scene.add(keyPointLight);

  const coreEmissiveLight = new THREE.PointLight(0x34d399, 1.8, 12);
  coreEmissiveLight.position.set(0, 0, 0);
  scene.add(coreEmissiveLight);
}

function createCoreMeshes(): {
  coreMesh: THREE.Mesh;
  innerMesh: THREE.Mesh;
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
} {
  const coreGeometry = new THREE.IcosahedronGeometry(2.4, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a6d8c,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);

  const innerGeometry = new THREE.IcosahedronGeometry(1.6, 2);
  const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e3a5f,
    emissive: 0x112233,
    roughness: 0.3,
    metalness: 0.8,
    transparent: true,
    opacity: 0.8,
  });
  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);

  return {
    coreMesh,
    innerMesh,
    geometries: [coreGeometry, innerGeometry],
    materials: [coreMaterial, innerMaterial],
  };
}

function createOrbitalRings(rootGroup: THREE.Group): {
  rings: THREE.Line[];
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
} {
  const ringRadii = [4.2, 4.8, 5.5];
  const ringSegments = 64;
  const rings: THREE.Line[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  ringRadii.forEach((radius, ringIndex) => {
    const points: THREE.Vector3[] = [];
    for (let segmentIndex = 0; segmentIndex <= ringSegments; segmentIndex++) {
      const thetaAngle = (segmentIndex / ringSegments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(thetaAngle) * radius, 0, Math.sin(thetaAngle) * radius)
      );
    }

    const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const isCenterHighlightedRing = ringIndex === 1;
    const ringMaterial = new THREE.LineBasicMaterial({
      color: isCenterHighlightedRing ? 0x34d399 : 0x475569,
      transparent: true,
      opacity: isCenterHighlightedRing ? 0.45 : 0.2,
    });

    const ring = new THREE.Line(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.25 * (ringIndex + 1);
    ring.rotation.y = Math.PI * 0.15 * ringIndex;

    rootGroup.add(ring);
    rings.push(ring);
    geometries.push(ringGeometry);
    materials.push(ringMaterial);
  });

  return { rings, geometries, materials };
}

function createParticleCloud(particleCount: number = 120): {
  particleCloud: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
} {
  const safeCount = Math.max(1, particleCount);
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(safeCount * 3);

  for (let index = 0; index < safeCount * 3; index += 3) {
    const randomTheta = Math.random() * 2.0 * Math.PI;
    const randomPhi = Math.acos(2.0 * Math.random() - 1.0);
    const radialDistance = 2.6 + Math.random() * 3.5;

    particlePositions[index] = radialDistance * Math.sin(randomPhi) * Math.cos(randomTheta);
    particlePositions[index + 1] = radialDistance * Math.sin(randomPhi) * Math.sin(randomTheta);
    particlePositions[index + 2] = radialDistance * Math.cos(randomPhi);
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.08,
    transparent: true,
    opacity: 0.5,
  });

  const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
  return { particleCloud, geometry: particleGeometry, material: particleMaterial };
}

function createInteractiveNodes(
  nodes: readonly CloudNode[],
  rootGroup: THREE.Group
): {
  nodeEntries: NodeMeshEntry[];
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
} {
  const nodeEntries: NodeMeshEntry[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  nodes.forEach((nodeItem) => {
    const sphereGeometry = new THREE.SphereGeometry(0.24, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: nodeItem.color,
      emissive: nodeItem.color,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    const haloGeometry = new THREE.RingGeometry(0.3, 0.42, 24);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: nodeItem.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    sphereMesh.add(haloMesh);

    rootGroup.add(sphereMesh);
    nodeEntries.push({ mesh: sphereMesh, haloMesh, data: nodeItem });
    geometries.push(sphereGeometry, haloGeometry);
    materials.push(sphereMaterial, haloMaterial);
  });

  return { nodeEntries, geometries, materials };
}

function createConnectorArcs(
  nodes: readonly CloudNode[],
  rootGroup: THREE.Group
): {
  arcLines: THREE.Line[];
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
} {
  const arcLines: THREE.Line[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  nodes.forEach((nodeItem) => {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 1, 1),
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: nodeItem.color,
      transparent: true,
      opacity: 0.25,
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    rootGroup.add(line);

    arcLines.push(line);
    geometries.push(lineGeometry);
    materials.push(lineMaterial);
  });

  return { arcLines, geometries, materials };
}

function disposeSceneBundle(bundle: SceneBundle): void {
  bundle.geometries.forEach((geometry) => {
    try {
      geometry.dispose();
    } catch (e) {
      void e;
    }
  });

  bundle.materials.forEach((material) => {
    try {
      material.dispose();
    } catch (e) {
      void e;
    }
  });

  try {
    bundle.renderer.dispose();
    bundle.renderer.forceContextLoss();
  } catch (e) {
    void e;
  }
}

interface CloudHeaderProps {
  activeMode: CloudDisplayMode;
  onSelectMode: (mode: CloudDisplayMode) => void;
}

const CloudHeader = memo(function CloudHeader({ activeMode, onSelectMode }: CloudHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#34d399',
            boxShadow: '0 0 10px #34d399',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          DeltaX Advertising Cloud &amp; AI Engine · 3D Neural Mesh
        </span>
        <span
          style={{
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(52, 211, 153, 0.12)',
            color: '#34d399',
            fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
          }}
        >
          Procedural Three.js
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {CLOUD_DISPLAY_MODES.map((modeOption) => {
          const isSelected = activeMode === modeOption.id;
          return (
            <button
              key={modeOption.id}
              onClick={() => onSelectMode(modeOption.id)}
              type="button"
              style={{
                background: isSelected ? 'rgba(175, 210, 250, 0.15)' : 'transparent',
                border: isSelected ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.06)',
                color: isSelected ? 'var(--accent)' : 'var(--muted)',
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              {modeOption.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

interface NodeDeckProps {
  nodes: readonly CloudNode[];
  activeNode: CloudNode;
  onSelectNode: (node: CloudNode) => void;
}

const NodeDeck = memo(function NodeDeck({ nodes, activeNode, onSelectNode }: NodeDeckProps) {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: '14px 18px',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        background: 'rgba(7, 11, 18, 0.65)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {nodes.map((nodeItem) => {
          const isSelected = activeNode.id === nodeItem.id;
          return (
            <button
              key={nodeItem.id}
              onClick={() => onSelectNode(nodeItem)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                background: isSelected ? `${nodeItem.color}1a` : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isSelected ? nodeItem.color : 'rgba(255, 255, 255, 0.08)'}`,
                color: isSelected ? nodeItem.color : 'var(--muted)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: nodeItem.color,
                }}
              />
              {nodeItem.name}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          padding: '12px 14px',
          borderRadius: '6px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: `1px solid ${activeNode.color}33`,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: activeNode.color,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}
          >
            System Responsibility
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>
            {activeNode.role}
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}
          >
            Telemetry &amp; Stack Alignment
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--link)',
            }}
          >
            {activeNode.stats}
          </div>
        </div>
      </div>
    </div>
  );
});

function AdvertisingCloud3DComponent() {
  const containerReference = useRef<HTMLDivElement | null>(null);
  const canvasReference = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef(false);

  const { isEcoMode, toggleEcoMode } = useTheme();
  const defaultNode = useMemo(() => NODES_DATA[0] ?? ({} as CloudNode), []);
  const [activeNode, setActiveNode] = useState<CloudNode>(defaultNode);
  const [activeMode, setActiveMode] = useState<CloudDisplayMode>('cloud');
  const [isHovered, setIsHovered] = useState(false);
  const [isWebGLAvailableState] = useState(() => isWebGLSupported());

  const handleSelectMode = useCallback((mode: CloudDisplayMode) => {
    setActiveMode(mode);
  }, []);

  const handleSelectNode = useCallback((node: CloudNode) => {
    setActiveNode(node);
  }, []);

  useEffect(() => {
    if (!isWebGLAvailableState || isEcoMode) {
      return;
    }

    const container = containerReference.current;
    const canvas = canvasReference.current;
    if (!container || !canvas) {
      return;
    }

    const initialWidth = Math.max(1, container.clientWidth || 600);
    const canvasHeight = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, initialWidth / canvasHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const pixelRatio =
      typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: pixelRatio < 2,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setSize(initialWidth, canvasHeight);
    renderer.setPixelRatio(pixelRatio);

    setupSceneLighting(scene);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const {
      coreMesh,
      innerMesh,
      geometries: coreGeometries,
      materials: coreMaterials,
    } = createCoreMeshes();
    rootGroup.add(coreMesh);
    rootGroup.add(innerMesh);

    const {
      rings: orbitalRings,
      geometries: ringGeometries,
      materials: ringMaterials,
    } = createOrbitalRings(rootGroup);

    const {
      particleCloud,
      geometry: particleGeometry,
      material: particleMaterial,
    } = createParticleCloud(120);
    rootGroup.add(particleCloud);

    const {
      nodeEntries,
      geometries: nodeGeometries,
      materials: nodeMaterials,
    } = createInteractiveNodes(NODES_DATA, rootGroup);

    const {
      arcLines,
      geometries: arcGeometries,
      materials: arcMaterials,
    } = createConnectorArcs(NODES_DATA, rootGroup);

    const sceneBundle: SceneBundle = {
      scene,
      camera,
      renderer,
      rootGroup,
      coreMesh,
      innerMesh,
      particleCloud,
      nodeEntries,
      arcLines,
      geometries: [
        ...coreGeometries,
        ...ringGeometries,
        particleGeometry,
        ...nodeGeometries,
        ...arcGeometries,
      ],
      materials: [
        ...coreMaterials,
        ...ringMaterials,
        particleMaterial,
        ...nodeMaterials,
        ...arcMaterials,
      ],
    };

    let targetRotationX = 0;
    let targetRotationY = 0;

    let animationFrameId: number = 0;
    let isSceneVisible = true;
    let lastTime = performance.now();
    let lastRenderTime = performance.now();
    let lastInteractionTime = performance.now();
    let isSleeping = false;
    let elapsedTime = 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wakeAnimationLoop = () => {
      lastInteractionTime = performance.now();
      if (isSleeping && isSceneVisible && document.visibilityState === 'visible') {
        isSleeping = false;
        lastTime = performance.now();
        lastRenderTime = performance.now();
        if (!animationFrameId) {
          renderAnimationLoop();
        }
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const boundingRectangle = canvas.getBoundingClientRect();
      if (boundingRectangle.width <= 0 || boundingRectangle.height <= 0) {
        return;
      }
      const normalizedX =
        ((event.clientX - boundingRectangle.left) / boundingRectangle.width) * 2 - 1;
      const normalizedY =
        -((event.clientY - boundingRectangle.top) / boundingRectangle.height) * 2 + 1;

      targetRotationY = normalizedX * 0.45;
      targetRotationX = -normalizedY * 0.35;
      wakeAnimationLoop();
    };

    canvas.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleWindowResize = () => {
      if (!container) return;
      const updatedWidth = Math.max(1, container.clientWidth);
      camera.aspect = updatedWidth / canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(updatedWidth, canvasHeight);
    };

    window.addEventListener('resize', handleWindowResize, { passive: true });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      isSceneVisible = entry.isIntersecting;
      if (isSceneVisible && document.visibilityState === 'visible') {
        lastTime = performance.now();
        lastRenderTime = performance.now();
        lastInteractionTime = performance.now();
        isSleeping = false;
        if (!animationFrameId) {
          renderAnimationLoop();
        }
      } else if (!isSceneVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });

    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      const isTabActive = document.visibilityState === 'visible';
      if (isTabActive && isSceneVisible) {
        lastTime = performance.now();
        lastRenderTime = performance.now();
        lastInteractionTime = performance.now();
        isSleeping = false;
        if (!animationFrameId) {
          renderAnimationLoop();
        }
      } else if (!isTabActive && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const renderAnimationLoop = () => {
      if (!isSceneVisible || document.visibilityState !== 'visible') return;

      const now = performance.now();

      if (now - lastInteractionTime > 25000 && !isHoveredRef.current) {
        isSleeping = true;
        animationFrameId = 0;
        return;
      }

      const targetFps = isHoveredRef.current ? 60 : 30;
      const frameInterval = 1000 / targetFps;
      const elapsedSinceLastRender = now - lastRenderTime;

      if (elapsedSinceLastRender < frameInterval) {
        animationFrameId = requestAnimationFrame(renderAnimationLoop);
        return;
      }

      lastRenderTime = now - (elapsedSinceLastRender % frameInterval);

      const delta = prefersReducedMotion ? 0 : Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsedTime += delta;

      rootGroup.rotation.y +=
        (targetRotationY - rootGroup.rotation.y) * 0.05 + (prefersReducedMotion ? 0 : 0.002);
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

      coreMesh.rotation.x = elapsedTime * 0.15;
      coreMesh.rotation.y = elapsedTime * 0.2;
      innerMesh.rotation.x = -elapsedTime * 0.25;
      innerMesh.rotation.y = -elapsedTime * 0.15;
      particleCloud.rotation.y = -elapsedTime * 0.05;

      nodeEntries.forEach((entry, nodeIndex) => {
        const { mesh: nodeSphereMesh, haloMesh, data: nodeData } = entry;
        const currentTheta = nodeData.theta + elapsedTime * (nodeData.speed * 8);
        const radius = nodeData.radius;
        const positionX = radius * Math.sin(nodeData.phi) * Math.cos(currentTheta);
        const positionY = radius * Math.sin(nodeData.phi) * Math.sin(currentTheta) * 0.55;
        const positionZ = radius * Math.cos(nodeData.phi);

        nodeSphereMesh.position.set(positionX, positionY, positionZ);
        haloMesh.lookAt(camera.position);

        const connectingArc = arcLines[nodeIndex];
        if (connectingArc) {
          const positionAttribute = connectingArc.geometry.attributes
            .position as THREE.BufferAttribute;
          positionAttribute.setXYZ(0, 0, 0, 0);
          positionAttribute.setXYZ(1, positionX, positionY, positionZ);
          positionAttribute.needsUpdate = true;
        }
      });

      orbitalRings.forEach((ring, index) => {
        ring.rotation.z = elapsedTime * (0.015 * (index + 1));
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderAnimationLoop);
    };

    renderAnimationLoop();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleWindowResize);
      disposeSceneBundle(sceneBundle);
    };
  }, [isWebGLAvailableState, isEcoMode]);

  return (
    <div
      ref={containerReference}
      onMouseEnter={() => {
        setIsHovered(true);
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isHoveredRef.current = false;
      }}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid rgba(175, 210, 250, 0.15)',
        background:
          'linear-gradient(180deg, rgba(13, 20, 32, 0.75) 0%, rgba(8, 12, 20, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <CloudHeader activeMode={activeMode} onSelectMode={handleSelectMode} />

      <div style={{ position: 'relative', height: '360px', width: '100%', cursor: 'grab' }}>
        {isEcoMode ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '24px',
              textAlign: 'center',
              background: 'rgba(7, 11, 18, 0.45)',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(52, 211, 153, 0.12)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
                fontSize: '16px',
                marginBottom: '12px',
              }}
            >
              ⚡
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '6px',
              }}
            >
              Eco Mode Active · WebGL Suspended
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--muted)',
                maxWidth: '52ch',
                lineHeight: 1.6,
                marginBottom: '14px',
              }}
            >
              Procedural 3D WebGL context is suspended to ensure 0% GPU utilization, preserving
              battery and memory. System architecture and telemetry remain fully accessible below.
            </p>
            <button
              type="button"
              onClick={toggleEcoMode}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                background: 'rgba(52, 211, 153, 0.15)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                color: '#34d399',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              Enable 3D Visualizer ↗
            </button>
          </div>
        ) : isWebGLAvailableState ? (
          <canvas
            ref={canvasReference}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            3D WebGL hardware acceleration unavailable. Telemetry deck remains fully accessible
            below.
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--muted-2)',
            letterSpacing: '0.08em',
            pointerEvents: 'none',
          }}
        >
          {isEcoMode
            ? '0% GPU · Battery optimized'
            : isHovered
              ? 'Interactive orbital tracking active (60 FPS)'
              : 'Ambient orbit (30 FPS) · Hover/drag to inspect'}
        </div>
      </div>

      <NodeDeck nodes={NODES_DATA} activeNode={activeNode} onSelectNode={handleSelectNode} />
    </div>
  );
}

export default memo(AdvertisingCloud3DComponent);
