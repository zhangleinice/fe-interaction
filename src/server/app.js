/**
 * http缓存设置
 */

const express = require("express");
const path = require("path");

const app = express();

// 静态资源目录设置为 dist 文件夹
app.use(
  express.static(path.join(__dirname, "dist"), {
    etag: true, // 启用 ETag
    lastModified: true, // 启用 Last-Modified
    setHeaders: (res, filePath) => {
      // 根据文件后缀设置不同的缓存策略
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-store"); // HTML 文件不缓存
      } else if (filePath.endsWith(".js")) {
        // 根据打包设置缓存
        if (filePath.includes("vendor")) {
          res.setHeader("Cache-Control", "public, max-age=31536000"); // 第三方库，缓存一年
        } else {
          res.setHeader("Cache-Control", "no-cache"); // 应用代码，不缓存
        }
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Cache-Control", "public, max-age=604800"); // CSS 文件缓存一周
      } else if (
        filePath.endsWith(".png") ||
        filePath.endsWith(".jpg") ||
        filePath.endsWith(".jpeg")
      ) {
        res.setHeader("Cache-Control", "public, max-age=2592000"); // 图片文件缓存一个月
      }
    },
  })
);

// 监听3000端口
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
