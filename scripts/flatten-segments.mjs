/**
 * Pós-build da exportação estática (roda sozinho depois de `npm run build`).
 *
 * O Next grava os arquivos de pré-carregamento de navegação em pastas
 * (`__next.conteudos/$d$slug/__PAGE__.txt`), mas o navegador os pede com pontos
 * (`__next.conteudos.$d$slug.__PAGE__.txt`). Em hospedagem estática isso vira 404
 * — a navegação continua funcionando, mas sem o pré-carregamento.
 * Este script cria uma cópia com o nome que o navegador pede.
 */
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
if (!fs.existsSync(out)) process.exit(0);

let copies = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
    else walk(full);
  }
}

/** Copia cada arquivo de `parent/__next.a/b/c.txt` para `parent/__next.a.b.c.txt`. */
function flatten(segDir, parent, prefix) {
  for (const entry of fs.readdirSync(segDir, { withFileTypes: true })) {
    const full = path.join(segDir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, parent, name);
    else {
      fs.copyFileSync(full, path.join(parent, name));
      copies++;
    }
  }
}

walk(out);
console.log(`flatten-segments: ${copies} arquivo(s) de pré-carregamento copiados em out/`);
