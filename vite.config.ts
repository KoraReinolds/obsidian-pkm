import { fileURLToPath, URL } from 'node:url'
import { exec } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { babel } from '@rollup/plugin-babel'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    {
      name: 'move-file-after-build',
      closeBundle() {
        exec(
          'node moveFile.js',
          (error, stdout, stderr) => {
            if (error) {
              console.error(
                `Error moving file: ${error.message}`
              )
              return
            }
            if (stderr) {
              console.error(`Error: ${stderr}`)
              return
            }
            console.log(stdout)
          }
        )
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false,
    lib: {
      entry: {
        main: './src/main.ts'
      },
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['vue', 'obsidian'],
      output: {
        format: 'cjs',
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          extensions: ['.js', '.ts', '.vue']
        })
      ]
    },
    outDir: './public',
    target: 'es2015'
  }
})
