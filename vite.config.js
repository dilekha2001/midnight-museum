import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{rollupOptions:{output:{manualChunks:{three:['three'],rendering:['three/addons/postprocessing/EffectComposer.js','three/addons/postprocessing/SSAOPass.js','three/addons/postprocessing/UnrealBloomPass.js']}}}}});
