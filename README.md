## UIPM项目手机版web前端


## 注意事项

> imagemin图片压缩效果不是很满意。需手动压缩复制目录

> node-sass的问题。改为使用cnpm安装。或单独cnpm安装node-sass



## 开发环境

```
cd nodejs
cnpm i
gulp server
```


## 程序目录

```
├── dist                    # 打包生成的目录
├── img                     # 图片
├── json                    # json
├── js                      # js
│   ├── core.js             # zepto&fastclick&swiper
│   ├── common.js           # 公用js
│   ├── detail.js           # 详情页js
│   ├── index.js            # 首页js文件
│   └── list.js             # 列表页js文件
├── css                     # 样式目录
│   ├── base.scss           # reset
│   │── config.scss         # 配置文件
│   │── keys.scss           # 动画
│   │── swiper.scss         # swiper
│   └── common.css          # gulp生成的样式文件
└── nodejs                  # nodejs
    │── gulpfile.js         # gulpfile配置文件
    └── config.json         # 配置参数
```
