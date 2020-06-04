# 腾讯新闻增长团队常用的工具方法

在日常工作中，我们积累了很多的工具方法，帮助我们提升效率。

## 安装

使用 npm:

```shell
$ npm install gh-qqnews-utils
```

使用 bower:

```shell
$ bower install gh-qqnews-utils
```

使用 yarn:

```shell
$ yarn add gh-qqnews-utils
```

使用 jsDelivr 的 CDN 地址:

```html
<script src="https://cdn.jsdelivr.net/npm/gh-qqnews-utils"></script>
```

使用 unpkg 的 CDN 地址:

```html
<script src="https://unpkg.com/gh-qqnews-utils"></script>
```

## 如何使用

html 格式的文档在 docs 文件夹中：[docs](./docs/index.html)

### 操作 cookie

```javascript
import { setCookie, getCookie, delCookie } from "gh-qqnews-utils/cookie";

setCookie("name", "skeetershi", 30); // 设置cookie，有效期为30天
getCookie("name"); // 获取cookie
delCookie("name"); // 删除cookie
```

### 关于日期的方法

引入：

```javascript
import * as date from "gh-qqnews-utils/date";

// 或单独按照方法分别引用也可以
import { isSameDay, formatTime } from "gh-qqnews-utils/date";
```

#### 判断两个日期或时间戳是否在同一天

第二个参数缺省时则使用当前时刻的时间戳进行比较。

```javascript
isSameDay("2020/05/06", "2020/05/07"); // 判断两个日期是否是同一天
isSameDay(1591283730344, 1591283720344); // 判断两个毫秒级的时间戳是否在同一天
isSameDay(1591283730344); // 判断此时间戳与当前时刻是否是同一天
```

#### 格式化时间戳

根据输入的格式，格式化时间戳。

```javascript
/**
 * 格式化时间，时间戳->格式化
 * @param timestamp 传入的时间戳，单位（毫秒）
 * @param format 格式：yyyy/MM/dd hh:mm:ss
 * yyyy/MM/dd hh:mm:ss 分别表示年/月/日 时:分:秒
 */
formatTime(1591283730344, "yyyy/MM/dd hh:mm:ss"); // 2020/06/04 23:15:30
formatTime(1591283730344, "yyyy年MM月dd日 hh时mm分ss秒"); // 2020年06月04日 23时15分30秒
formatTime(1591283730344, "hh:mm:ss"); // 23:15:30
```

#### 获取给定时间戳的周一和周日的时间

格式的要求跟上面的一样。

```javascript
/**
 * 获取当前星期的起始日期和结束日期
 * @param {string} startFormat 周一的时间格式
 * @param {string} endFormat   周日的时间格式
 * @param {number} timestamp   所在周的时间戳，若不传入，则默认使用当前时刻的时间戳
 * @returns {string, string} {startDate, endDate} 返回的数据
 */

getWeekStartAndEnd("MM月dd日", "MM月dd日", 1591283730344);
/**
 * startDate: "06月01日"
 * endDate: "06月07日"
 */
```

#### 延迟一段时间后执行

```javascript
sleep(1000).then(() => {
    console.log("1000ms 后执行当前代码");
});

async function fn() {
    await sleep(800);
    console.log("800ms 后执行");
}
```
