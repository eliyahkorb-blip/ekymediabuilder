import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'builder-src');
const publicDir = path.join(root, 'public', 'builder');

await fs.rm(publicDir, { recursive: true, force: true });
await fs.mkdir(publicDir, { recursive: true });

await fs.copyFile(path.join(srcDir, 'src', 'index.html'), path.join(publicDir, 'index.html'));
await fs.cp(path.join(srcDir, 'assets'), path.join(publicDir, 'assets'), { recursive: true });

await esbuild.build({
  entryPoints: [path.join(srcDir, 'src', 'app.jsx')],
  bundle: true,
  outfile: path.join(publicDir, 'app.bundle.js'),
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  sourcemap: false,
  legalComments: 'none',
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

console.log('✓ EKY Builder Web-Bundle erstellt: public/builder');
