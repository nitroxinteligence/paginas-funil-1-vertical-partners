17:54:03.532 Running build in Washington, D.C., USA (East) – iad1
17:54:03.532 Build machine configuration: 2 cores, 8 GB
17:54:03.550 Cloning github.com/nitroxinteligence/lp-funil1-vx-company (Branch: main, Commit: c4eb841)
17:54:03.691 Previous build caches not available
17:54:09.031 Cloning completed: 5.480s
17:54:12.842 Running "vercel build"
17:54:13.267 Vercel CLI 48.2.9
17:54:14.063 Installing dependencies...
17:54:15.278 npm warn ERESOLVE overriding peer dependency
17:54:15.279 npm warn While resolving: @monogrid/gainmap-js@3.1.0
17:54:15.279 npm warn Found: three@0.150.1
17:54:15.280 npm warn node_modules/three
17:54:15.280 npm warn   three@"^0.150.0" from the root project
17:54:15.280 npm warn   9 more (@react-spring/three, @react-three/drei, ...)
17:54:15.280 npm warn
17:54:15.290 npm warn Could not resolve dependency:
17:54:15.290 npm warn peer three@">= 0.159.0" from @monogrid/gainmap-js@3.1.0
17:54:15.290 npm warn node_modules/@react-three/drei/node_modules/@monogrid/gainmap-js
17:54:15.290 npm warn   @monogrid/gainmap-js@"^3.0.6" from @react-three/drei@9.122.0
17:54:15.290 npm warn   node_modules/@react-three/drei
17:54:15.290 npm warn
17:54:15.290 npm warn Conflicting peer dependency: three@0.180.0
17:54:15.290 npm warn node_modules/three
17:54:15.290 npm warn   peer three@">= 0.159.0" from @monogrid/gainmap-js@3.1.0
17:54:15.290 npm warn   node_modules/@react-three/drei/node_modules/@monogrid/gainmap-js
17:54:15.290 npm warn     @monogrid/gainmap-js@"^3.0.6" from @react-three/drei@9.122.0
17:54:15.290 npm warn     node_modules/@react-three/drei
17:54:15.301 npm warn ERESOLVE overriding peer dependency
17:54:15.301 npm warn While resolving: three-mesh-bvh@0.7.8
17:54:15.301 npm warn Found: three@0.150.1
17:54:15.301 npm warn node_modules/three
17:54:15.301 npm warn   three@"^0.150.0" from the root project
17:54:15.301 npm warn   9 more (@react-spring/three, @react-three/drei, ...)
17:54:15.301 npm warn
17:54:15.301 npm warn Could not resolve dependency:
17:54:15.301 npm warn peer three@">= 0.151.0" from three-mesh-bvh@0.7.8
17:54:15.301 npm warn node_modules/@react-three/drei/node_modules/three-mesh-bvh
17:54:15.301 npm warn   three-mesh-bvh@"^0.7.8" from @react-three/drei@9.122.0
17:54:15.302 npm warn   node_modules/@react-three/drei
17:54:15.302 npm warn
17:54:15.302 npm warn Conflicting peer dependency: three@0.180.0
17:54:15.302 npm warn node_modules/three
17:54:15.302 npm warn   peer three@">= 0.151.0" from three-mesh-bvh@0.7.8
17:54:15.302 npm warn   node_modules/@react-three/drei/node_modules/three-mesh-bvh
17:54:15.302 npm warn     three-mesh-bvh@"^0.7.8" from @react-three/drei@9.122.0
17:54:15.302 npm warn     node_modules/@react-three/drei
17:54:15.697 
17:54:15.698 added 1 package in 1s
17:54:15.698 
17:54:15.698 98 packages are looking for funding
17:54:15.699   run `npm fund` for details
17:54:15.731 Running "npm run build"
17:54:15.838 
17:54:15.838 > lp-funil-vx-company@0.0.0 build
17:54:15.838 > tsc && vite build
17:54:15.839 
17:54:19.947 src/components/sections/DiagnosticSection.tsx(13,26): error TS2307: Cannot find module '@/lib/supabase' or its corresponding type declarations.
17:54:19.970 Error: Command "npm run build" exited with 2