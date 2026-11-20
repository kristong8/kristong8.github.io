# Kris 的 3D 书桌

点桌上的空顶跑步帽或「跑步」标签，镜头会移向帽子并打开 `/running`。按 Esc 回到书桌。在右下角可以切换中英语言。

## 本地预览

使用 Node.js 22 的最新维护版本。在本目录运行：

```sh
npm ci
npm run dev
```

打开终端显示的地址。点 **Turn on the lights**，再点 **Click anywhere to begin** 进入书桌。用 `npm run check` 做类型检查和生产构建。

## 更新内容

| 文件 | 修改内容 |
| --- | --- |
| `src/content/running.ts` | 赛事名称、参赛照片和完赛证书，填日期时从新到旧展示 |
| `src/content/site.ts` | 名字、介绍、地点及联系方式 |
| `src/content/projects.ts` | 投影仪里的项目 |
| `src/content/experience.ts` | 打字机里的经历与教育 |
| `src/content/notes.ts`、`src/content/board.ts` | 笔记本和软木板 |

赛事名称 `name` 可以是单语言文字或 `{ en, zh }`。素材放在 `public/running-media/`，每张照片在 `photos` 里填写 `src` 和 `alt`。有证书时填写 `certificate.src`，图片的 `certificate.kind` 填 `image`，PDF 填 `pdf`。日期可选，格式为 `YYYY-MM-DD`。

## 部署

GitHub Pages 使用 `.github/workflows/pages.yml`。在仓库的 Settings → Pages 中将 Source 设为 GitHub Actions，推送到 `main` 后自动构建和发布。部署到仓库子路径时，子页面使用 `#/projects` 一类的地址，刷新和直接打开链接都能正常进入。

Cloudflare Workers 配置在 `wrangler.jsonc`。登录你自己的 Cloudflare 账号，运行：

```sh
npm run check
npx wrangler deploy
```

也可以连接自己的 GitHub 仓库，设置构建命令 `npm run build`、部署命令 `npx wrangler deploy`。使用其他静态托管时，发布 `dist/` 并配置客户端路径回退到 `index.html`，这样直接打开 `/running` 或项目链接也能加载页面。

原模板由 [Tianqi Zhao](https://github.com/hitianqi/desk-portfolio) 开源，MIT 许可，见 [LICENSE](LICENSE) 与 [NOTICE.md](NOTICE.md)。
