/Users/mateusmpz/.zshrc:6: no such file or directory: /usr/local/bin/brew
mateusmpz@Mateuss-MacBook-Pro Landing Page - Vertical Partners (FUNIL 1) % cd lps-funis-vp
mateusmpz@Mateuss-MacBook-Pro lps-funis-vp % npm run build

> vertical-partners-landing@0.1.0 build
> next build

⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of /Users/mateusmpz/Documents/Vertical Partners - Agentes/Landing Page - Vertical Partners (FUNIL 1)/package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it's not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles: 
   * /Users/mateusmpz/Documents/Vertical Partners - Agentes/Landing Page - Vertical Partners (FUNIL 1)/lps-funis-vp/package-lock.json

▲ Next.js 16.1.1 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 2.3s
  Running TypeScript  .Failed to compile.

./src/app/lp-funil/api-server.ts:2:21
Type error: Cannot find module 'express' or its corresponding type declarations.

  1 | // Force restart: 2025-10-14 00:45
> 2 | import express from 'express';
    |                     ^
  3 | import dotenv from 'dotenv';
  4 | import diagnosticHandler from './api/generate-diagnostic.js';
  5 | import instagramLookupHandler from './api/instagram-lookup.js';
Next.js build worker exited with code: 1 and signal: null
mateusmpz@Mateuss-MacBook-Pro lps-funis-vp % 






