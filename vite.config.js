import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PokemonDex/',  // GitHub 저장소 이름과 똑같이
  plugins: [react()],
})
