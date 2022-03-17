// 导入工具函数
import path from 'path'
import { defineConfig } from 'vite'

// 导入插件
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { VenoUiResolver } from 'veno-ui'
import Markdown from '@veno-ui/vite-plugin-markdown'
import Icons from '@veno-ui/vite-plugin-icons'
import { viteMockServe as Mock } from 'vite-plugin-mock'

// 解析路径成绝对路径
const resolve = (...args: string[]) => path.resolve(__dirname, ...args)

// 配置项文档
// https://vitejs.dev/config/
export default defineConfig(env => {
  return {
    css: { preprocessorOptions: { scss: { charset: false } } },
    resolve: {
      alias: [
        { find: '@', replacement: resolve('./src') },
      ]
    },
    plugins: [
      // plugin-vue
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),

      // 自动注册页面到路由
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        dirs: [
          { dir: 'src/pages', baseRoute: '' },
          // demos 仅展示一些演示页面供参考，可移除
          { dir: 'src/demos', baseRoute: 'demos' },
        ],
        extensions: ['vue', 'md']
      }),

      // 自动注册布局
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default'
      }),

      // 自动注册组件
      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          VenoUiResolver(),
        ],
        dts: 'src/components.d.ts',
      }),

      // 自动注册图标
      // https://github.com/qq15725/veno-ui/tree/master/packages/vite-plugin-icons
      Icons({
        include: [/\.vue$/, /\.vue\?vue/, /.svg$/, /\.md$/],
      }),

      // markdown 文件解析支持
      // https://github.com/qq15725/veno-ui/tree/master/packages/vite-plugin-markdown
      Markdown(),

      // 模拟接口数据
      // https://github.com/vbenjs/vite-plugin-mock
      Mock({
        ignore: /index\.ts$/,
        mockPath: 'mock',
        localEnabled: env.command === 'serve',
        prodEnabled: env.command !== 'serve',
        injectCode: `
          import { setupProdMockServer } from '../mock/index'
          setupProdMockServer()
        `,
      }),
    ]
  }
})
