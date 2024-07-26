

# http缓存设置

1. 对于 .html 文件，仍然设置为 Cache-Control: no-store，禁止缓存。
2. 对于 .js 文件
   - 通过检查文件名中是否包含 vendor 来区分第三方库和应用代码。第三方库可以安全地缓存一年，因为它们不经常更新且通常稳定。
   - 而应用代码则设置为 Cache-Control: no-cache，以便在更新时能够及时获取最新版本。
3. .css 文件仍然缓存一周，因为通常情况下样式文件更新频率较低。
4. 图片文件保持一个月的缓存时间，这是一个合理的时间范围，可以平衡缓存效益和内容更新。


## no-cache 与 no-store
1. no-cache 用途
   - 强制每次请求都要向服务器验证响应的有效性
   - 即使资源已经缓存，客户端仍然需要向服务器发送请求，以确认缓存的副本是否仍然有效
   - 服务器可以使用 304 Not Modified 响应来告知客户端缓存资源仍然有效，而不必重新传输整个资源。
2. 使用 no-cache 的场景
   - 动态内容: 如用户个人主页，内容频繁更新，但希望减少数据传输。
   - 频繁更新的资源: 如新闻网站的首页。
   - 用户登录状态: 用户信息可能随时变化，需要确认内容的最新状态。
3. no-store 用途
   - 禁止缓存响应。
   - 客户端和代理服务器都不能存储任何关于请求或响应的内容。这包括任何形式的持久缓存和临时缓存
4. 使用 no-store 的场景
   - 敏感数据: 如在线支付页面，用户信用卡信息。
   - 个人信息: 如用户设置页面，包含敏感个人信息。
   - 高度安全性要求: 如身份验证页面，确保每次请求都完全不缓存。


# react回顾

1. React.memo 和函数引用
React.memo 通过对比前后的 props 来决定是否重新渲染组件。如果 props 没有变化，组件不会重新渲染。但是，函数是引用类型，每次渲染都会创建一个新的函数引用，即使函数的内容没有变化。

2. useCallback 的作用
useCallback 会返回一个记住了的函数，只要其依赖项没有变化，函数引用就不会变化。这对于避免传递给子组件的回调函数在父组件每次渲染时都变化是非常有用的。

3. useMemo
通过使用 useMemo，你可以确保只有在依赖项变化时才重新计算，从而提高应用的性能。

4. useState：当状态改变时，组件会重新渲染。

5. useRef：更新 useRef 的值不会触发组件重新渲染。
   
6. useLayoutEffect 
   - useLayoutEffect在 DOM 变更后立即同步执行，阻塞浏览器绘制，用于需要精确控制 DOM 更新顺序的场景。
   - useEffect 在 DOM 变更后异步执行，不阻塞浏览器绘制，适用于大多数副作用操作。


## React Fiber

React Fiber 是 React 中负责处理渲染和更新的核心机制，它通过一系列流程来实现高效的渲染和更新过程。

### 初始化 Fiber 树

初始化 Fiber 树的过程是根据 React 元素树创建 Fiber 树的过程。

### 调度更新任务

调度更新任务是将更新任务按优先级调度的过程，其目的在于优化更新的性能和用户体验。

- 优先级设定：为不同类型的更新任务设定不同的优先级。例如，用户输入的更新优先级高于数据加载的更新。
- 空闲时间调度：利用 `requestIdleCallback` 或 `MessageChannel` 等机制，在浏览器空闲时执行低优先级任务。

### 深度优先遍历

深度优先遍历是比较 Fiber 树的当前节点和新节点，生成 work-in-progress 树的过程。

尽管 BFS 也可以实现 React 组件树的渲染，但在 React Fiber 中，更倾向于使用深度优先遍历来进行渲染和更新，因为它更符合 Fiber 树的结构和渲染顺序。

### 处理副作用

处理副作用的过程是记录需要更新的部分。

### 提交更新

提交更新是将副作用应用到真实 DOM 树上的过程。


## 前端工程化

## 前端代码部署
   1.本地打包
   ```bash
      npm run build
   ```
   2.连接到云服务器
   ```bash
      ssh username@your_server_ip
   ```
   3.上传打包文件到服务器对应目录
   ```bash
      scp -r build/* username@your_server_ip:/var/www/html
   ```
   4.安装配置nginx作为web服务器
   为什么需要web服务器？
   - 提供 HTTP 服务
      Web 服务器（如 Nginx）提供了一个 HTTP 服务，它能够接收浏览器发送的 HTTP 请求，并返回相应的文件（如 HTML、CSS、JavaScript）。如果没有 Web 服务器，浏览器无法与服务器进行这种交互。

   - 文件访问
      普通的文件系统无法直接通过 HTTP 协议访问文件。需要一个 Web 服务器来监听特定端口（如 80 或 443），并根据请求路径返回对应的文件内容。

   ```bash
      sudo apt-get update
      sudo apt-get install nginx
      # 配置
      sudo nano /etc/nginx/sites-available/default
      # 修改
      server {
         listen 80;
         server_name your_domain.com;  # 如果没有域名，可以使用 _ 代替

         root /var/www/html;  # 指向你上传的前端代码所在的目录
         index index.html;

         location / {
            try_files $uri $uri/ /index.html;
         }
      }
      # 重启
      sudo systemctl restart nginx
   ```
   5.通过域名或ip地址访问网站

## 什么是持续集成/持续部署（CI/CD）
   1. 概念：说白了就是把代码测试、打包、发布等工作交给一些工具来自动完成。这样可以提高效率，减少失误，开发人员只需要关心开发和提交代码到git就可以了。
   2. GitLab CI
      - 负责定义任务和工作流。通过 .gitlab-ci.yml 文件，你可以指定每个阶段（例如安装、测试、构建、部署）需要执行的脚本和条件
      - 只要在你的仓库根目录下创建一个.gitlab-ci.yml 文件， 并为该项目指派一个Runner
      - 当有合并请求或者Push操作时，你写在.gitlab-ci.yml中的构建脚本就会开始执行。
   3. GitLab Runner
      - GitLab CI负责yml文件中各种阶段流程的执行，而GitLab Runner就是具体的负责执行每个阶段的脚本执行
      - 一般来说GitLab Runner需要安装在单独的机器上通过其提供的注册操作跟GitLab CI进行绑定
   4. 持续集成/部署环境
      - 持续集成是程序开发人员在提交代码之后，能有相应的环境能对其提交的代码自动执行构建(Build)、测试(Test),然后根据测试结果判断新提交的代码能否合并加入主分支当中
      - 持续部署也就是在持续集成之后自动将代码部署(Deploy)到生成环境上
   5. 开启GitLab CI功能
      - 配置一个.gitlab-ci.yml文件，定义你的 CI/CD 流程
   6. 安装GitLab Runner
      - 下载对应GitLab 版本的GitLab Runner
      ```bash
         sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64
         sudo chmod +x /usr/local/bin/gitlab-runner
      ```
      - 注册GitLab Runner
      ```bash
         sudo gitlab-ci-multi-runner register
      ```
      - 启动GitLab Runner
      ```bash
         sudo  gitlab-ci-multi-runner start
      ```

## doker
   1. Docker 是一种开源的容器化平台。
      - 可以在电脑上同时安装不同版本的nodej、msyql、nginx 等而且是互相隔离独立同时运行，不需要你手动来回切换
   2. 镜像（Image）
      - 程序的安装包，里面包含了程序运行所需要的一切。
   3. 容器（Container）
      - 容器是从镜像创建的，它是应用程序实际运行的地方。每个容器是相互隔离的，可以独立运行多个容器而不会互相影响
   4. Dockerfile
      - Dockerfile 是一个文本文件，里面写着如何创建 Docker 镜像的指令
   5. 常用指令
      ```bash
         # 搜索镜像
         docker search [images_name:tag]

         # 下载镜像（：指定版本）
         docker pull [images_name:tag]

         # 查看本地下载的镜像
         docker images

         # 自己构建镜像
         # 根据dockerfile的路径或者url构建镜像
         docker build [OPTIONS] PATH|URL|-

         # 查看镜像的构建历史
         docker history [images_name]

         # 删除镜像
         # 需要先删除以此镜像为基础的容器
         docker rmi [images_name]
      ```  
      ```bash
         # 查看运行中的容器
         # 可以查看容器ID、基础镜像、容器名称、运行状态、端口映射等
         docker ps

         # 查看所有容器：包括停止的
         docker ps -a

         # 查看容器的信息
         # 例如端口号的映射、目录挂载
         docker inspect [images_name/images_id]

         # 启动和停止容器
         docker start/stop [container_name/container_id]

         #  重启容器
         #  使用场景实例：
         #  在加入新的npm包依赖需要重新编译的时候使用重启运行编译
         #  nginx容器的配置更新后需要重启生效
         docker restart [container_name/container_id]

         # 进入容器
         # ps:有些容器没有bash,需要改成/bin/sh，例如mysq、mongodb的
         # 退出人容器输入exit 回车键
         docker exec -it [container_name/container_id] /bin/bash

         # 删除容器
         # 在容器停止的状态才能删
         docker rm [container_name/container_id]

         # 容器主机文件拷
         # 将容器文件拷贝到主机
         docker cp [container_id/container_name] : [文件目录] [主机目录]

         # 将主机的目录拷贝到容器
         docker cp [主机目录] [container_id/container_name] : [文件目录]
      ```

###  JSBridge
   1. JSBridge 是一种技术，用于在 JavaScript 和原生平台（如 Android 和 iOS）之间进行通信。它允许 JavaScript 调用原生代码，也允许原生代码调用 JavaScript。

### bff














