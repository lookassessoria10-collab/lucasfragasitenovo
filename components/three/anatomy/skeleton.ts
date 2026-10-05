import * as THREE from "three";
import {
  capsule,
  ellipsoid,
  loft,
  merge,
  torusArc,
  type Quality,
  type Vec3,
} from "./geometry";

/**
 * Membro superior direito estilizado, modelado proceduralmente.
 *
 * Convenções (posição anatômica, braço ao longo do corpo, palma para frente):
 *   +X lateral · +Y superior · +Z anterior · 1 unidade ≈ 10 cm
 *
 * Cada osso é descrito no espaço da articulação que o move:
 *   girdle   → clavícula + escápula (corpo; gira em torno da esternoclavicular)
 *   humerus  → origem no centro da glenoumeral
 *   forearm  → origem no centro do cotovelo (ulna)
 *   radius   → antebraço, mas sujeito à prono-supinação
 *
 * Para trocar por um modelo GLB no futuro, basta reproduzir esta mesma
 * hierarquia de pivôs (ver README).
 */

export const JOINTS = {
  /** Articulação esternoclavicular (espaço do corpo) */
  sc: [-1.5, 0.33, 0.62] as Vec3,
  /** Centro do cotovelo (espaço do úmero) */
  elbow: [0.05, -3.0, 0.04] as Vec3,
  /** Centro da cabeça do rádio (espaço do antebraço) */
  radialHead: [0.13, -0.12, 0.03] as Vec3,
  /** Cabeça da ulna (espaço do antebraço) */
  ulnarHead: [-0.13, -2.58, 0] as Vec3,
  /** Centro do punho (espaço do antebraço) */
  wrist: [0.03, -2.7, 0.02] as Vec3,
};

/** Direção para onde a glenoide está voltada (ântero-lateral). */
const F = new THREE.Vector3(0.8, 0, 0.6).normalize();
const HEAD_CENTER: Vec3 = [-0.04, 0, -0.02];
/** Centro da face da glenoide */
const GLENOID: Vec3 = [HEAD_CENTER[0] - F.x * 0.27, 0, HEAD_CENTER[2] - F.z * 0.27];

/** Plano da escápula: origem no colo, U medial, V superior, W posterior. */
const SCAP_O = new THREE.Vector3(-0.43, -0.03, -0.33);
const SCAP_U = new THREE.Vector3(-F.x, 0, -F.z);
const SCAP_V = new THREE.Vector3(0, 1, 0);
const SCAP_W = new THREE.Vector3().crossVectors(SCAP_U, SCAP_V).normalize();
/** Curvatura da escápula acompanhando o gradil costal. */
const SCAP_BEND = 0.22;

/** Converte coordenadas do plano escapular (u medial, v superior, w posterior) para o corpo. */
export function scap(u: number, v: number, w = 0): Vec3 {
  const ww = w + SCAP_BEND * u * u;
  return [
    SCAP_O.x + SCAP_U.x * u + SCAP_V.x * v + SCAP_W.x * ww,
    SCAP_O.y + SCAP_U.y * u + SCAP_V.y * v + SCAP_W.y * ww,
    SCAP_O.z + SCAP_U.z * u + SCAP_V.z * v + SCAP_W.z * ww,
  ];
}

function scapulaBody(q: Quality) {
  const s = new THREE.Shape();
  s.moveTo(0.02, 0.12);
  s.lineTo(0.28, 0.25);
  s.quadraticCurveTo(0.68, 0.38, 0.97, 0.34);
  s.quadraticCurveTo(1.07, 0.2, 1.03, 0.0);
  s.lineTo(0.92, -0.72);
  s.quadraticCurveTo(0.86, -1.16, 0.72, -1.2);
  s.quadraticCurveTo(0.6, -1.12, 0.46, -0.86);
  s.quadraticCurveTo(0.22, -0.46, 0.05, -0.15);
  s.quadraticCurveTo(-0.02, 0, 0.02, 0.12);

  const depth = 0.03;
  const geo = new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: Math.round(10 * q.sphere),
  });
  geo.deleteAttribute("uv");
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i);
    const v = pos.getY(i);
    const w = pos.getZ(i) - depth / 2;
    const p = scap(u, v, w);
    pos.setXYZ(i, p[0], p[1], p[2]);
  }
  // ExtrudeGeometry não é indexada; o merge exige consistência
  const indexed = toIndexed(geo);
  indexed.computeVertexNormals();
  return indexed;
}

function toIndexed(geo: THREE.BufferGeometry) {
  if (geo.index) return geo;
  const count = geo.getAttribute("position").count;
  const index = Array.from({ length: count }, (_, i) => i);
  geo.setIndex(index);
  return geo;
}

/** Clavícula + escápula (corpo, acrômio, espinha, coracoide, glenoide). */
function girdle(q: Quality) {
  const parts: THREE.BufferGeometry[] = [];
  parts.push(
    loft(
      [JOINTS.sc, [-1.1, 0.36, 0.6], [-0.6, 0.42, 0.32], [-0.25, 0.46, 0.06], [-0.05, 0.47, -0.02]],
      {
        ref: [0, 1, 0],
        rx: [[0, 0.085], [0.2, 0.062], [0.6, 0.052], [0.85, 0.048], [1, 0.048]],
        ry: [[0, 0.09], [0.2, 0.068], [0.6, 0.062], [0.85, 0.088], [1, 0.1]],
        cap: 0.04,
        segments: 36,
      },
      q,
    ),
  );
  parts.push(scapulaBody(q));
  // espinha da escápula → acrômio
  parts.push(
    loft(
      [scap(1.0, 0.08, 0.03), scap(0.6, 0.15, 0.1), scap(0.28, 0.26, 0.16), [-0.36, 0.38, -0.5], [-0.12, 0.45, -0.28], [0.06, 0.45, -0.06], [0.12, 0.42, 0.06]],
      {
        ref: [0, 1, 0],
        rx: [[0, 0.03], [0.3, 0.06], [0.6, 0.045], [1, 0.035]],
        ry: [[0, 0.03], [0.35, 0.05], [0.6, 0.1], [0.85, 0.11], [1, 0.08]],
        cap: 0.05,
        segments: 40,
      },
      q,
    ),
  );
  // processo coracoide
  parts.push(
    loft([[-0.42, 0.12, -0.28], [-0.38, 0.3, -0.12], [-0.24, 0.28, 0.12]], { rx: [[0, 0.06], [0.6, 0.045], [1, 0.035]], ref: [0, 1, 0], cap: 0.1, segments: 18 }, q),
  );
  // colo da escápula
  parts.push(
    loft([[GLENOID[0] - F.x * 0.05, 0, GLENOID[2] - F.z * 0.05], [SCAP_O.x, SCAP_O.y, SCAP_O.z], scap(0.15, -0.02, 0)], { rx: [[0, 0.13], [0.5, 0.1], [1, 0.12]], ry: [[0, 0.16], [0.5, 0.11], [1, 0.12]], cap: 0.06, segments: 12 }, q),
  );
  // fossa glenoide
  parts.push(ellipsoid([0.05, 0.19, 0.13], [GLENOID[0] - F.x * 0.05, 0, GLENOID[2] - F.z * 0.05], q, [0, -Math.atan2(F.z, F.x), 0]));
  return merge(parts);
}

/** Labrum: anel fibrocartilaginoso em volta da glenoide (destacável separadamente). */
function labrum(q: Quality) {
  return torusArc(0.135, 0.022, Math.PI * 2, q, (g) => {
    g.scale(1, 1.35, 1);
    g.rotateY(Math.PI / 2);
    g.rotateY(-Math.atan2(F.z, F.x));
    g.translate(GLENOID[0] + F.x * 0.01, 0, GLENOID[2] + F.z * 0.01);
  });
}

function humerus(q: Quality) {
  const [ex, ey, ez] = JOINTS.elbow;
  const parts: THREE.BufferGeometry[] = [
    ellipsoid([0.25, 0.25, 0.24], HEAD_CENTER, q),
    ellipsoid([0.12, 0.15, 0.13], [0.19, 0.03, 0.0], q),
    ellipsoid([0.08, 0.09, 0.08], [0.07, -0.05, 0.17], q),
    loft(
      [[0.1, -0.02, 0], [0.1, -0.4, 0], [0.07, -1.4, 0], [0.05, -2.4, -0.01], [0.05, -2.9, 0.02]],
      {
        rx: [[0, 0.19], [0.06, 0.15], [0.16, 0.12], [0.45, 0.105], [0.75, 0.11], [0.9, 0.12], [1, 0.12]],
        ry: [[0, 0.2], [0.06, 0.16], [0.16, 0.125], [0.45, 0.11], [0.72, 0.14], [0.86, 0.22], [0.95, 0.3], [1, 0.3]],
        cap: 0.03,
        segments: 56,
      },
      q,
    ),
    // capítulo (articula com o rádio)
    ellipsoid([0.1, 0.1, 0.1], [ex + 0.13, ey + 0.01, ez + 0.03], q),
    // epicôndilos
    ellipsoid([0.09, 0.07, 0.06], [ex - 0.29, ey + 0.12, ez - 0.03], q),
    ellipsoid([0.06, 0.06, 0.06], [ex + 0.25, ey + 0.1, ez - 0.01], q),
  ];
  // tróclea: carretel (lathe) com eixo médio-lateral
  const trochlea = new THREE.LatheGeometry(
    [
      [0.02, -0.105], [0.1, -0.1], [0.12, -0.075], [0.09, -0.02], [0.085, 0],
      [0.09, 0.02], [0.115, 0.06], [0.105, 0.09], [0.02, 0.1],
    ].map(([x, y]) => new THREE.Vector2(x, y)),
    Math.round(18 * q.sphere),
  );
  trochlea.deleteAttribute("uv");
  trochlea.rotateZ(Math.PI / 2);
  trochlea.translate(ex - 0.06, ey, ez);
  parts.push(trochlea);
  return merge(parts);
}

function ulna(q: Quality) {
  return merge([
    loft(
      [[-0.06, 0.16, -0.12], [-0.07, 0.0, -0.08], [-0.08, -0.35, -0.03], [-0.1, -1.4, 0], [-0.13, -2.45, 0], [-0.13, -2.6, 0]],
      {
        rx: [[0, 0.07], [0.05, 0.1], [0.12, 0.09], [0.25, 0.07], [0.7, 0.055], [0.93, 0.06], [1, 0.065]],
        ry: [[0, 0.07], [0.06, 0.08], [0.2, 0.06], [0.7, 0.045], [0.93, 0.06], [1, 0.065]],
        cap: 0.03,
        segments: 48,
      },
      q,
    ),
    // incisura troclear: o "gancho" que abraça a tróclea
    torusArc(0.125, 0.035, 4.0, q, (g) => {
      g.rotateZ(-Math.PI);
      g.rotateY(Math.PI / 2);
      g.translate(-0.06, 0, 0);
    }),
    ellipsoid([0.075, 0.1, 0.08], [-0.06, 0.12, -0.13], q), // olécrano
    ellipsoid([0.045, 0.04, 0.06], [-0.07, -0.1, 0.09], q), // coronoide
    ellipsoid([0.07, 0.06, 0.07], [-0.13, -2.58, 0], q), // cabeça da ulna
    ellipsoid([0.025, 0.04, 0.025], [-0.16, -2.66, -0.03], q), // estiloide
  ]);
}

function radius(q: Quality) {
  return merge([
    loft(
      [[0.13, -0.08, 0.03], [0.13, -0.3, 0.04], [0.16, -1.2, 0.04], [0.19, -2.2, 0.03], [0.17, -2.62, 0.02]],
      {
        rx: [[0, 0.1], [0.035, 0.1], [0.07, 0.06], [0.15, 0.055], [0.3, 0.065], [0.65, 0.07], [0.88, 0.09], [1, 0.1]],
        ry: [[0, 0.1], [0.035, 0.1], [0.07, 0.055], [0.3, 0.06], [0.65, 0.065], [0.88, 0.11], [1, 0.16]],
        cap: 0.04,
        segments: 48,
      },
      q,
    ),
    ellipsoid([0.04, 0.07, 0.04], [0.1, -0.4, 0.07], q), // tuberosidade do rádio
    ellipsoid([0.035, 0.05, 0.035], [0.31, -2.64, 0.02], q), // estiloide
  ]);
}

/** Mão em posição relaxada, palma para frente (espaço do punho). */
function hand(q: Quality) {
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const parts: THREE.BufferGeometry[] = [];
  // carpo
  const carpals: [Vec3, Vec3][] = [
    [[0.07, 0.06, 0.06], [0.17, -0.07, 0]],
    [[0.065, 0.06, 0.065], [0.05, -0.07, 0]],
    [[0.06, 0.055, 0.06], [-0.07, -0.08, -0.01]],
    [[0.04, 0.04, 0.04], [-0.12, -0.1, 0.06]],
    [[0.06, 0.055, 0.06], [0.2, -0.21, 0.03]],
    [[0.05, 0.05, 0.05], [0.1, -0.22, 0]],
    [[0.065, 0.08, 0.065], [-0.01, -0.23, -0.01]],
    [[0.065, 0.065, 0.065], [-0.13, -0.22, 0]],
  ];
  for (const [r, at] of carpals) parts.push(ellipsoid(r, at, { ...q, sphere: q.sphere * 0.6 }));

  const fingers = [
    { base: v(0.13, -0.32, 0), head: v(0.17, -0.98, 0.04), r: 0.04, len: [0.4, 0.24, 0.17] },
    { base: v(0.02, -0.33, 0), head: v(0.04, -0.98, 0.04), r: 0.042, len: [0.44, 0.28, 0.19] },
    { base: v(-0.08, -0.32, 0), head: v(-0.09, -0.9, 0.04), r: 0.037, len: [0.41, 0.27, 0.18] },
    { base: v(-0.17, -0.3, 0), head: v(-0.22, -0.82, 0.04), r: 0.034, len: [0.33, 0.19, 0.16] },
  ];
  const curl = [8, 14, 10].map((d) => THREE.MathUtils.degToRad(d));
  const xAxis = v(1, 0, 0);
  for (const f of fingers) {
    parts.push(capsule(f.base, f.head, f.r, q));
    const dir = f.head.clone().sub(f.base).normalize();
    let p = f.head.clone().addScaledVector(dir, 0.02);
    f.len.forEach((len, i) => {
      dir.applyAxisAngle(xAxis, -curl[i]);
      const next = p.clone().addScaledVector(dir, len);
      parts.push(capsule(p, next, f.r * (0.85 - i * 0.12), q));
      p = next;
    });
  }
  // polegar
  parts.push(capsule(v(0.24, -0.28, 0.06), v(0.42, -0.62, 0.22), 0.04, q));
  parts.push(capsule(v(0.42, -0.62, 0.22), v(0.53, -0.88, 0.34), 0.035, q));
  parts.push(capsule(v(0.53, -0.88, 0.34), v(0.59, -1.08, 0.43), 0.03, q));
  return merge(parts);
}

/** Contexto: hemitórax direito (costelas e esterno), bem discreto. */
function context(q: Quality) {
  const parts: THREE.BufferGeometry[] = [];
  const cx = -1.75;
  const cz = -0.2;
  const a = [0.55, 0.85, 1.05, 1.17, 1.24, 1.28, 1.28, 1.25, 1.2];
  const b = [0.45, 0.65, 0.78, 0.86, 0.9, 0.92, 0.92, 0.9, 0.88];
  const rq = { ...q, radial: 6 };
  a.forEach((ai, i) => {
    const yPost = 0.55 - i * 0.36;
    const drop = 0.35 + i * 0.05;
    const t0 = -Math.PI / 2;
    const t1 = Math.PI * 0.36;
    const pts: Vec3[] = [];
    for (let k = 0; k <= 8; k++) {
      const th = t0 + ((t1 - t0) * k) / 8;
      const s = (th - t0) / (t1 - t0);
      pts.push([cx + ai * Math.cos(th), yPost - drop * Math.sin((s * Math.PI) / 2), cz + b[i] * Math.sin(th)]);
    }
    parts.push(loft(pts, { rx: 0.028, ry: 0.04, ref: [0, 1, 0], cap: 0.02, segments: 28 }, rq));
  });
  parts.push(loft([[cx, 0.3, 0.55], [cx, -0.6, 0.68], [cx, -1.8, 0.72]], { rx: 0.035, ry: [[0, 0.16], [0.3, 0.11], [1, 0.13]], cap: 0.05, segments: 16 }, rq));
  return merge(parts);
}

export type Skeleton = ReturnType<typeof buildSkeleton>;

export function buildSkeleton(q: Quality) {
  return {
    girdle: girdle(q),
    labrum: labrum(q),
    humerus: humerus(q),
    ulna: ulna(q),
    radius: radius(q),
    hand: hand(q),
    context: context(q),
    scanRing: torusArc(0.34, 0.006, Math.PI * 2, q, (g) => g.rotateX(Math.PI / 2)),
  };
}

/* ------------------------------------------------------------------ */
/* Partes moles (tendões, músculos e nervo) — recalculadas a cada pose */
/* ------------------------------------------------------------------ */

export type Frame = "girdle" | "humerus" | "forearm" | "radius";
export type HighlightKey = "cuff" | "labrum" | "biceps" | "lateral" | "medial" | "nerve" | "olecranon";

export type SoftTissue = {
  id: string;
  highlight: HighlightKey;
  /** Visibilidade quando não destacado (0–1) */
  rest: number;
  points: [Frame, Vec3][];
  rx: [number, number][] | number;
  segments: number;
};

export const softTissues: SoftTissue[] = [
  {
    id: "supraspinatus",
    highlight: "cuff",
    rest: 0.4,
    points: [["girdle", scap(0.78, 0.26, 0.06)], ["girdle", scap(0.45, 0.28, 0.1)], ["girdle", [-0.3, 0.34, -0.3]], ["humerus", [0.02, 0.27, -0.06]], ["humerus", [0.18, 0.17, 0.0]]],
    rx: [[0, 0.07], [0.35, 0.08], [0.7, 0.05], [1, 0.035]],
    segments: 28,
  },
  {
    id: "infraspinatus",
    highlight: "cuff",
    rest: 0.4,
    points: [["girdle", scap(0.75, -0.45, 0.06)], ["girdle", scap(0.4, -0.25, 0.12)], ["humerus", [-0.08, -0.02, -0.3]], ["humerus", [0.12, 0.04, -0.2]], ["humerus", [0.21, 0.04, -0.08]]],
    rx: [[0, 0.1], [0.4, 0.09], [0.75, 0.05], [1, 0.035]],
    segments: 28,
  },
  {
    id: "teres-minor",
    highlight: "cuff",
    rest: 0.4,
    points: [["girdle", scap(0.55, -0.8, 0.05)], ["girdle", scap(0.3, -0.5, 0.1)], ["humerus", [0.0, -0.14, -0.28]], ["humerus", [0.17, -0.08, -0.14]]],
    rx: [[0, 0.06], [0.5, 0.055], [1, 0.03]],
    segments: 24,
  },
  {
    id: "subscapularis",
    highlight: "cuff",
    rest: 0.4,
    points: [["girdle", scap(0.7, -0.35, -0.08)], ["girdle", scap(0.3, -0.2, -0.14)], ["humerus", [-0.14, -0.06, 0.24]], ["humerus", [0.06, -0.05, 0.2]]],
    rx: [[0, 0.11], [0.5, 0.09], [0.8, 0.05], [1, 0.035]],
    segments: 24,
  },
  {
    id: "biceps",
    highlight: "biceps",
    rest: 0.3,
    points: [["girdle", [GLENOID[0], 0.19, GLENOID[2]]], ["humerus", [-0.02, 0.24, 0.08]], ["humerus", [0.11, 0.08, 0.19]], ["humerus", [0.11, -0.25, 0.18]], ["humerus", [0.1, -1.2, 0.26]], ["humerus", [0.08, -2.2, 0.24]], ["radius", [0.11, -0.38, 0.09]]],
    rx: [[0, 0.025], [0.25, 0.03], [0.4, 0.07], [0.55, 0.12], [0.7, 0.1], [0.85, 0.04], [1, 0.03]],
    segments: 56,
  },
  {
    id: "triceps",
    highlight: "olecranon",
    rest: 0.28,
    points: [["humerus", [0.03, -1.6, -0.22]], ["humerus", [0.04, -2.5, -0.2]], ["humerus", [0.0, -2.85, -0.16]], ["forearm", [-0.06, 0.16, -0.17]]],
    rx: [[0, 0.12], [0.4, 0.11], [0.75, 0.07], [1, 0.05]],
    segments: 28,
  },
  {
    id: "extensors",
    highlight: "lateral",
    rest: 0.3,
    points: [["humerus", [0.31, -2.9, 0.03]], ["forearm", [0.3, -0.3, 0.0]], ["radius", [0.25, -1.0, -0.04]], ["radius", [0.22, -1.7, -0.05]]],
    rx: [[0, 0.035], [0.3, 0.08], [0.7, 0.065], [1, 0.03]],
    segments: 28,
  },
  {
    id: "flexors",
    highlight: "medial",
    rest: 0.3,
    points: [["humerus", [-0.27, -2.88, 0.02]], ["forearm", [-0.22, -0.3, 0.09]], ["forearm", [-0.14, -1.0, 0.12]], ["forearm", [-0.1, -1.7, 0.1]]],
    rx: [[0, 0.035], [0.3, 0.08], [0.7, 0.065], [1, 0.03]],
    segments: 28,
  },
  {
    id: "ulnar-nerve",
    highlight: "nerve",
    rest: 0.08,
    points: [["humerus", [-0.12, -1.8, -0.16]], ["humerus", [-0.22, -2.6, -0.1]], ["humerus", [-0.27, -2.92, -0.06]], ["forearm", [-0.18, -0.25, -0.04]], ["forearm", [-0.14, -1.3, 0.04]], ["forearm", [-0.1, -2.3, 0.06]]],
    rx: 0.02,
    segments: 40,
  },
];

export type Hotspot = {
  key: string;
  label: string;
  group: "shoulder" | "elbow";
  highlight?: HighlightKey;
  frame: Frame;
  at: Vec3;
};

export const hotspots: Hotspot[] = [
  { key: "cuff", label: "Manguito rotador", group: "shoulder", highlight: "cuff", frame: "humerus", at: [0.2, 0.2, 0.02] },
  { key: "acromion", label: "Acrômio", group: "shoulder", highlight: "cuff", frame: "girdle", at: [0.08, 0.47, 0.0] },
  { key: "labrum", label: "Labrum e glenoide", group: "shoulder", highlight: "labrum", frame: "girdle", at: [GLENOID[0] + 0.02, 0.16, GLENOID[2] + 0.02] },
  { key: "biceps", label: "Tendão do bíceps", group: "shoulder", highlight: "biceps", frame: "humerus", at: [0.12, -0.15, 0.2] },
  { key: "lateral", label: "Epicôndilo lateral", group: "elbow", highlight: "lateral", frame: "humerus", at: [0.32, -2.9, 0.03] },
  { key: "medial", label: "Epicôndilo medial", group: "elbow", highlight: "medial", frame: "humerus", at: [-0.29, -2.88, 0.0] },
  { key: "olecranon", label: "Olécrano", group: "elbow", highlight: "olecranon", frame: "forearm", at: [-0.06, 0.2, -0.18] },
  { key: "nerve", label: "Nervo ulnar", group: "elbow", highlight: "nerve", frame: "humerus", at: [-0.27, -2.75, -0.1] },
];
