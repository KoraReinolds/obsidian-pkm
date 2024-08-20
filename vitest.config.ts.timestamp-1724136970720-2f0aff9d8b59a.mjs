// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import {
  mergeConfig,
  defineConfig as defineConfig2,
  configDefaults
} from "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/node_modules/vitest/dist/config.js";

// vite.config.ts
import { fileURLToPath, URL as URL2 } from "node:url";
import { exec } from "child_process";
import { defineConfig } from "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { babel } from "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/node_modules/@rollup/plugin-babel/dist/es/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    {
      name: "move-file-after-build",
      closeBundle() {
        exec(
          "node moveFile.js",
          (error, stdout, stderr) => {
            if (error) {
              console.error(
                `Error moving file: ${error.message}`
              );
              return;
            }
            if (stderr) {
              console.error(`Error: ${stderr}`);
              return;
            }
            console.log(stdout);
          }
        );
      }
    }
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    minify: false,
    lib: {
      entry: {
        main: "./src/main.ts",
        log: "./src/log.ts",
        weeklyNote: "./src/weeklyNote.ts",
        createProducts: "./src/createProducts.ts"
      },
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ["cjs"]
    },
    rollupOptions: {
      external: ["vue", "obsidian"],
      output: {
        format: "cjs",
        globals: {
          vue: "Vue"
        }
      },
      plugins: [
        babel({
          babelHelpers: "bundled",
          exclude: "node_modules/**",
          extensions: [".js", ".ts", ".vue"]
        })
      ]
    },
    outDir: "./public",
    target: "esnext"
  }
});

// vitest.config.ts
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/reino/Documents/Obsidian/kora/.obsidian/plugins/obsidian-pkm/vitest.config.ts";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2))
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJlaW5vXFxcXERvY3VtZW50c1xcXFxPYnNpZGlhblxcXFxrb3JhXFxcXC5vYnNpZGlhblxcXFxwbHVnaW5zXFxcXG9ic2lkaWFuLXBrbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccmVpbm9cXFxcRG9jdW1lbnRzXFxcXE9ic2lkaWFuXFxcXGtvcmFcXFxcLm9ic2lkaWFuXFxcXHBsdWdpbnNcXFxcb2JzaWRpYW4tcGttXFxcXHZpdGVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3JlaW5vL0RvY3VtZW50cy9PYnNpZGlhbi9rb3JhLy5vYnNpZGlhbi9wbHVnaW5zL29ic2lkaWFuLXBrbS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHtcbiAgbWVyZ2VDb25maWcsXG4gIGRlZmluZUNvbmZpZyxcbiAgY29uZmlnRGVmYXVsdHNcbn0gZnJvbSAndml0ZXN0L2NvbmZpZydcbmltcG9ydCB2aXRlQ29uZmlnIGZyb20gJy4vdml0ZS5jb25maWcnXG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxuICB2aXRlQ29uZmlnLFxuICBkZWZpbmVDb25maWcoe1xuICAgIHRlc3Q6IHtcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgZXhjbHVkZTogWy4uLmNvbmZpZ0RlZmF1bHRzLmV4Y2x1ZGUsICdlMmUvKionXSxcbiAgICAgIHJvb3Q6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSlcbilcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccmVpbm9cXFxcRG9jdW1lbnRzXFxcXE9ic2lkaWFuXFxcXGtvcmFcXFxcLm9ic2lkaWFuXFxcXHBsdWdpbnNcXFxcb2JzaWRpYW4tcGttXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyZWlub1xcXFxEb2N1bWVudHNcXFxcT2JzaWRpYW5cXFxca29yYVxcXFwub2JzaWRpYW5cXFxccGx1Z2luc1xcXFxvYnNpZGlhbi1wa21cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3JlaW5vL0RvY3VtZW50cy9PYnNpZGlhbi9rb3JhLy5vYnNpZGlhbi9wbHVnaW5zL29ic2lkaWFuLXBrbS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IHsgYmFiZWwgfSBmcm9tICdAcm9sbHVwL3BsdWdpbi1iYWJlbCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWdWVEZXZUb29scygpLFxuICAgIHtcbiAgICAgIG5hbWU6ICdtb3ZlLWZpbGUtYWZ0ZXItYnVpbGQnLFxuICAgICAgY2xvc2VCdW5kbGUoKSB7XG4gICAgICAgIGV4ZWMoXG4gICAgICAgICAgJ25vZGUgbW92ZUZpbGUuanMnLFxuICAgICAgICAgIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIGBFcnJvciBtb3ZpbmcgZmlsZTogJHtlcnJvci5tZXNzYWdlfWBcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7c3RkZXJyfWApXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coc3Rkb3V0KVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHtcbiAgICAgICAgbWFpbjogJy4vc3JjL21haW4udHMnLFxuICAgICAgICBsb2c6ICcuL3NyYy9sb2cudHMnLFxuICAgICAgICB3ZWVrbHlOb3RlOiAnLi9zcmMvd2Vla2x5Tm90ZS50cycsXG4gICAgICAgIGNyZWF0ZVByb2R1Y3RzOiAnLi9zcmMvY3JlYXRlUHJvZHVjdHMudHMnXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQsIGVudHJ5TmFtZSkgPT4gYCR7ZW50cnlOYW1lfS5qc2AsXG4gICAgICBmb3JtYXRzOiBbJ2NqcyddXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWyd2dWUnLCAnb2JzaWRpYW4nXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBmb3JtYXQ6ICdjanMnLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGx1Z2luczogW1xuICAgICAgICBiYWJlbCh7XG4gICAgICAgICAgYmFiZWxIZWxwZXJzOiAnYnVuZGxlZCcsXG4gICAgICAgICAgZXhjbHVkZTogJ25vZGVfbW9kdWxlcy8qKicsXG4gICAgICAgICAgZXh0ZW5zaW9uczogWycuanMnLCAnLnRzJywgJy52dWUnXVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0sXG4gICAgb3V0RGlyOiAnLi9wdWJsaWMnLFxuICAgIHRhcmdldDogJ2VzbmV4dCdcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVosU0FBUyxpQkFBQUEsc0JBQXFCO0FBQ3JiO0FBQUEsRUFDRTtBQUFBLEVBQ0EsZ0JBQUFDO0FBQUEsRUFDQTtBQUFBLE9BQ0s7OztBQ0w0WSxTQUFTLGVBQWUsT0FBQUMsWUFBVztBQUN0YixTQUFTLFlBQVk7QUFDckIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsYUFBYTtBQUw2TyxJQUFNLDJDQUEyQztBQVFwVCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sY0FBYztBQUNaO0FBQUEsVUFDRTtBQUFBLFVBQ0EsQ0FBQyxPQUFPLFFBQVEsV0FBVztBQUN6QixnQkFBSSxPQUFPO0FBQ1Qsc0JBQVE7QUFBQSxnQkFDTixzQkFBc0IsTUFBTSxPQUFPO0FBQUEsY0FDckM7QUFDQTtBQUFBLFlBQ0Y7QUFDQSxnQkFBSSxRQUFRO0FBQ1Ysc0JBQVEsTUFBTSxVQUFVLE1BQU0sRUFBRTtBQUNoQztBQUFBLFlBQ0Y7QUFDQSxvQkFBUSxJQUFJLE1BQU07QUFBQSxVQUNwQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJQyxLQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFVBQVUsQ0FBQyxRQUFRLGNBQWMsR0FBRyxTQUFTO0FBQUEsTUFDN0MsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLE9BQU8sVUFBVTtBQUFBLE1BQzVCLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFVBQ0osY0FBYztBQUFBLFVBQ2QsU0FBUztBQUFBLFVBQ1QsWUFBWSxDQUFDLE9BQU8sT0FBTyxNQUFNO0FBQUEsUUFDbkMsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7OztBRHRFb1EsSUFBTUMsNENBQTJDO0FBUXRULElBQU8sd0JBQVE7QUFBQSxFQUNiO0FBQUEsRUFDQUMsY0FBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUcsZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUM3QyxNQUFNQyxlQUFjLElBQUksSUFBSSxNQUFNRix5Q0FBZSxDQUFDO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZmlsZVVSTFRvUGF0aCIsICJkZWZpbmVDb25maWciLCAiVVJMIiwgIlVSTCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgImRlZmluZUNvbmZpZyIsICJmaWxlVVJMVG9QYXRoIl0KfQo=
