import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PokemonDex/',  // 저장소 이름과 정확히 일치해야 함
  plugins: [react()],
})
