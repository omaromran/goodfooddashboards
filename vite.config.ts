import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-static-pages',
      configureServer(server) {
        const serveGoodfoodPage = (req: any, res: any, next: () => void) => {
          const path = req.url?.split('?')[0] ?? ''
          const staticPages: [string, string][] = [
            ['/goodfood-from-the-world', 'public/goodfood-from-the-world/index.html'],
            ['/recipe-classics', 'public/recipe-classics/index.html'],
            ['/ai-strategy', 'public/ai-strategy/index.html'],
          ]
          for (const [route, filePath] of staticPages) {
            if (path === route || path === route + '/') {
              const file = resolve(__dirname, filePath)
              const html = readFileSync(file, 'utf-8')
              res.setHeader('Content-Type', 'text/html')
              res.end(html)
              return
            }
          }
          next()
        }
        server.middlewares.stack.unshift({ route: '', handle: serveGoodfoodPage })
      },
    },
  ],
})
