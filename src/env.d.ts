/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
// 作用：让 TypeScript 认识 .vue 模块。以后跑 npm run type-check 时不会报错。
