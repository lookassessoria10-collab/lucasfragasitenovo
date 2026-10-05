import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/**
 * Primitivas para modelar ossos e tendões de forma procedural.
 * A peça central é o "loft": uma seção elíptica de raio variável
 * percorrendo uma curva — suficiente para ossos longos, clavícula,
 * espinha da escápula, tendões e nervos.
 */

export type Vec3 = [number, number, number];
export type Keys = [number, number][];
export type Quality = { radial: number; segments: number; sphere: number };

export const QUALITY_HIGH: Quality = { radial: 18, segments: 1, sphere: 1 };
export const QUALITY_LOW: Quality = { radial: 12, segments: 0.6, sphere: 0.7 };

/** Interpolação Catmull-Rom de um perfil escalar definido por pares [t, valor]. */
export function profile(keys: Keys | number): (t: number) => number {
  if (typeof keys === "number") return () => keys;
  const n = keys.length;
  return (t) => {
    if (t <= keys[0][0]) return keys[0][1];
    if (t >= keys[n - 1][0]) return keys[n - 1][1];
    let i = 0;
    while (i < n - 2 && t > keys[i + 1][0]) i++;
    const [t1, p1] = keys[i];
    const [t2, p2] = keys[i + 1];
    const p0 = i > 0 ? keys[i - 1][1] : p1;
    const p3 = i + 2 < n ? keys[i + 2][1] : p2;
    const u = (t - t1) / (t2 - t1);
    const u2 = u * u;
    const u3 = u2 * u;
    return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
  };
}

export type LoftSpec = {
  /** Raio ao longo do vetor de referência (normal) */
  rx: Keys | number;
  /** Raio perpendicular (binormal). Padrão: igual a rx */
  ry?: Keys | number;
  /** Vetor de referência para orientar a seção (evita torções). Padrão: +Z (anterior) */
  ref?: Vec3;
  /** Fração do comprimento usada para arredondar as extremidades */
  cap?: number;
  segments?: number;
  radial?: number;
};

const _p = new THREE.Vector3();
const _t = new THREE.Vector3();
const _n = new THREE.Vector3();
const _b = new THREE.Vector3();
const _ref = new THREE.Vector3();

/** Cria uma geometria vazia com a topologia de um loft (para atualizar in-place depois). */
export function createLoftGeometry(segments: number, radial: number) {
  const geo = new THREE.BufferGeometry();
  const rings = segments + 1;
  const position = new Float32Array(rings * radial * 3);
  const index: number[] = [];
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j;
      const b = i * radial + ((j + 1) % radial);
      const c = (i + 1) * radial + j;
      const d = (i + 1) * radial + ((j + 1) % radial);
      index.push(a, c, b, b, c, d);
    }
  }
  geo.setIndex(index);
  geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(position.length), 3));
  return geo;
}

/** Escreve o loft na geometria (mesma contagem de segmentos/raios usada na criação). */
export function writeLoft(
  geo: THREE.BufferGeometry,
  curve: THREE.Curve<THREE.Vector3>,
  spec: LoftSpec,
  segments: number,
  radial: number,
) {
  const rx = profile(spec.rx);
  const ry = profile(spec.ry ?? spec.rx);
  const cap = spec.cap ?? 0;
  const ref = spec.ref ?? [0, 0, 1];
  const attr = geo.getAttribute("position") as THREE.BufferAttribute;
  const pos = attr.array as Float32Array;
  let k = 0;
  for (let i = 0; i <= segments; i++) {
    // espaçamento cossenoidal: mais anéis nas extremidades, onde a forma muda mais
    const t = 0.5 - 0.5 * Math.cos((Math.PI * i) / segments);
    curve.getPoint(t, _p);
    curve.getTangent(t, _t).normalize();
    _ref.set(ref[0], ref[1], ref[2]);
    _n.copy(_ref).addScaledVector(_t, -_ref.dot(_t));
    if (_n.lengthSq() < 1e-6) _n.set(1, 0, 0).addScaledVector(_t, -_t.x);
    _n.normalize();
    _b.crossVectors(_t, _n);
    let s = 1;
    if (cap > 0) {
      if (t < cap) s = Math.sqrt(Math.max(0, 1 - ((cap - t) / cap) ** 2));
      else if (t > 1 - cap) s = Math.sqrt(Math.max(0, 1 - ((t - (1 - cap)) / cap) ** 2));
    }
    const a = rx(t) * s;
    const b = ry(t) * s;
    for (let j = 0; j < radial; j++) {
      const ang = (j / radial) * Math.PI * 2;
      const ca = Math.cos(ang) * a;
      const sa = Math.sin(ang) * b;
      pos[k++] = _p.x + _n.x * ca + _b.x * sa;
      pos[k++] = _p.y + _n.y * ca + _b.y * sa;
      pos[k++] = _p.z + _n.z * ca + _b.z * sa;
    }
  }
  attr.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
}

export function curveFrom(points: Vec3[]) {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    "centripetal",
  );
}

export function loft(points: Vec3[], spec: LoftSpec, q: Quality) {
  const segments = Math.max(8, Math.round((spec.segments ?? 32) * q.segments));
  const radial = spec.radial ?? q.radial;
  const geo = createLoftGeometry(segments, radial);
  writeLoft(geo, curveFrom(points), spec, segments, radial);
  return geo;
}

function clean(geo: THREE.BufferGeometry) {
  geo.deleteAttribute("uv");
  return geo;
}

export function ellipsoid(radii: Vec3, at: Vec3, q: Quality, rotation: Vec3 = [0, 0, 0]) {
  const geo = new THREE.SphereGeometry(1, Math.round(18 * q.sphere), Math.round(12 * q.sphere));
  geo.scale(...radii);
  geo.rotateX(rotation[0]);
  geo.rotateY(rotation[1]);
  geo.rotateZ(rotation[2]);
  geo.translate(...at);
  return clean(geo);
}

/** Cápsula de `from` até `to`. */
export function capsule(from: THREE.Vector3, to: THREE.Vector3, radius: number, q: Quality) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const length = Math.max(0.001, dir.length() - radius * 2);
  const geo = new THREE.CapsuleGeometry(radius, length, 3, Math.max(6, Math.round(q.radial * 0.6)));
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  geo.applyQuaternion(quat);
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  geo.translate(mid.x, mid.y, mid.z);
  return clean(geo);
}

/** Toro parcial (usado no labrum e na incisura troclear da ulna). */
export function torusArc(
  radius: number,
  tube: number,
  arc: number,
  q: Quality,
  transform: (g: THREE.BufferGeometry) => void,
) {
  const geo = new THREE.TorusGeometry(radius, tube, Math.max(6, Math.round(q.radial * 0.5)), Math.round(32 * q.sphere), arc);
  transform(geo);
  return clean(geo);
}

export function merge(geos: THREE.BufferGeometry[]) {
  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  if (!merged) throw new Error("Falha ao combinar geometrias");
  merged.computeBoundingSphere();
  return merged;
}
