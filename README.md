# 微前端 monorepo 项目样例

![](https://visitor-badge.glitch.me/badge?page_id=cjy0208.mono-micro-project)

### 在线预览

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mono-micro-project)

[StackBlitz](http://stackblitz.com/) 对 pnpm 支持不太好所以换用 lerna 来支持 workspace 功能

## 启动方式

```bash
pnpm run init # 初始化，安装依赖
pnpm run dev # 启动 dev 命令，默认基座在 8080 端口
pnpm run build # 构建
pnpm run serve # 产物预览
```

## 给特定子项目安装依赖

```bash
npm install -g pnpm # 全局安装 pnpm
pnpm add xxx --filter @modules/xxx-1 --filter @modules/xxx-2
```

## 创建子项目

```bash
npm run create -- --name=<模块名> --template=<模板名>
```

目前可用模板有：

1. `micro-react-vite` **(默认)**: 基于 vite 的 react（17） 子项目
2. `micro-vue-vite`：基于 vite 的 vue3 子项目
3. 待增加

### 踩坑记录

1. React.lazy 组件在 vite 中无法热更新

   相关资料：
   https://github.com/vitejs/vite/issues/2719
   https://github.com/facebook/react/issues/21181

   解决方式

   - 组件文件中仅保留 export default 部分，不要有 export const ... 导出
   - export default 导出具名函数，不要匿名导出，避免 export default () => <div>...</div>

2. 路由建议

   基座用 Browser 路由，子应用使用 Hash 路由，互不冲突，若存在多应用协同共存且有各自路由需求，建议使用 Memory 路由

3. 父子路由、子子路由冲突

   要点：让子路由的 history 操作仅限在特定地址条件下生效，可能需要改 node_modules 中关键处的源码，用 patch-package 保存改动
