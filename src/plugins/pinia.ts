// 导入工具函数
import { createPinia } from 'pinia'

// 导入类型定义
import type { InstallPlugin } from '@/types'

export const install: InstallPlugin = app => {
  const pinia = createPinia()

  app.use(pinia)
}