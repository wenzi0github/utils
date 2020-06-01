# 腾讯新闻增长团队常用的工具方法

在日常工作中，我们积累了很多的工具方法，帮助我们提升效率。

## 安装

使用 npm:

```shell
$ npm install gh-qqnews-report
```

使用 bower:

```shell
$ bower install gh-qqnews-report
```

使用 yarn:

```shell
$ yarn add gh-qqnews-report
```

## 如何使用

### 操作 cookie

```javascript
import { setCookie, getCookie, delCookie } from "gh-qqnews-utils/cookie";

setCookie("name", "skeetershi", 30); // 设置cookie，有效期为30天
getCookie("name"); // 获取cookie
delCookie("name");
```

### 关于日期的方法

```javascript
import { isSameDay } from "gh-qqnews-utils/date";
isSameDay("2020/05/06", "2020/05/07"); // false
```
