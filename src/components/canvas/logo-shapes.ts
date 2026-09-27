import * as THREE from "three";
import geometryData from "./logo-geometry-data.json";

function createShapeFromPoints(points: number[][]): THREE.Shape {
  const shape = new THREE.Shape();
  if (!points || points.length === 0) return shape;

  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();
  return shape;
}

// 1. Full rounded hexagon
export const hexagonShape = createShapeFromPoints(geometryData.hexagon);

// 2. Wave mountain ribbon across top face
export const waveShape = createShapeFromPoints(geometryData.wave);

// 3. Hexagon top roof piece (blossoming hood)
export const hexTopShape = createShapeFromPoints(geometryData.hexTop);

// 4. Hexagon bottom keel piece (blossoming keel)
export const hexBottomShape = createShapeFromPoints(geometryData.hexBottom);

// 5. Letter F
export const letterFShape = createShapeFromPoints(geometryData.letterF);

// 6. Letter T
export const letterTShape = createShapeFromPoints(geometryData.letterT);

// 7. Left and right decorative wings (faceted petals)
export function createLeftWingShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-1.80, 0.70);
  s.lineTo(-1.20, 1.30);
  s.lineTo(-0.65, 1.30);
  s.lineTo(-1.35, 0.45);
  s.lineTo(-1.35, -0.45);
  s.lineTo(-0.65, -1.30);
  s.lineTo(-1.20, -1.30);
  s.lineTo(-1.80, -0.70);
  s.closePath();
  return s;
}

export function createRightWingShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(1.80, 0.70);
  s.lineTo(1.20, 1.30);
  s.lineTo(0.65, 1.30);
  s.lineTo(1.35, 0.45);
  s.lineTo(1.35, -0.45);
  s.lineTo(0.65, -1.30);
  s.lineTo(1.20, -1.30);
  s.lineTo(1.80, -0.70);
  s.closePath();
  return s;
}

export const leftWingShape = createLeftWingShape();
export const rightWingShape = createRightWingShape();

// Extrusion settings
export const hexExtrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.42,
  bevelEnabled: true,
  bevelSegments: 6,
  steps: 1,
  bevelSize: 0.05,
  bevelThickness: 0.05,
};

export const letterExtrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.28,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 1,
  bevelSize: 0.03,
  bevelThickness: 0.03,
};

export const waveExtrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.26,
  bevelEnabled: true,
  bevelSegments: 3,
  steps: 1,
  bevelSize: 0.025,
  bevelThickness: 0.025,
};

export const wingExtrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.22,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 1,
  bevelSize: 0.025,
  bevelThickness: 0.025,
};
