import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pokemon/', // ← '저장소 이름'으로 설정
  plugins: [react()],
})
