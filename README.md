# 前端中常用的工具方法

在日常工作中，我们积累了很多的工具方法，帮助我们提升效率。

[![version](https://img.shields.io/npm/v/gh-qqnews-utils?color=brightgreen&style=flat-square)](https://www.npmjs.com/package/gh-qqnews-utils)
![size](https://img.shields.io/bundlephobia/min/gh-qqnews-utils)

## 安装

使用 tnpm:

```shell
$ tnpm install gh-qqnews-utils --save
```

使用 npm:

```shell
$ npm install gh-qqnews-utils --save
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

## 模块的名称

当前工具包中有如下的工具列表，各位开发者可以按需引入：

-   cookie: 操作 cookie；
    -   [setCookie](#cookie): 设置 cookie；
    -   [getCookie](#cookie): 获取 cookie；
    -   [delCookie](#cookie)：删除 cookie；
-   date: 日期和时间的操作；
    -   [isSameDay](#isSameDay): 两个时间戳或格式化的字符串是否在同一天；
    -   [formatTime](#formatTime): 将时间戳转为格式化的字符串；
    -   [getWeekStartAndEnd](#getWeekStartAndEnd): 获取当前星期的起始日期和结束日期
    -   [sleep](#sleep): 延迟一段时间执行；
-   debounceThrottle：防抖和节流；
    -   [debounce](#debounce): 防抖；
    -   [throttle](#throttle): 节流；
    -   [debounceThrottle](#debounceThrottle): 防抖和节流函数的结合；
-   querystring： 链接中的参数；
    -   [parse](#parse): 解析 url 中所有的参数；
    -   [getQueryString](#getQueryString): 获取 url 查询字符串中的参数；
    -   [stringify](#stringify): 将 obj 类型的数据拼接为参数字符串('a=1&b=2')
-   random: 随机数据
    -   [randomNumber](#randomNumber): 产生随机数字（小数）；
    -   [randomInt](#randomInt): 产生随机整数；
    -   [randomStr](#randomStr): 产生随机字符串；
-   number: 数字操作
    -   [toThousands](#toThousands): 添加千分位号；
    -   [getClampNumber](#getClampNumber): 获取合理范围内的数字；
-   regexp：常用的正则表达式；
    -   [isUrl](#isUrl): 是否正确的 url 地址；
    -   [isPhone](#isPhone): 是否正确的手机号码，11 位的数字；
    -   [isEmail](#isEmail): 是否正确的 email 邮箱地址
-   string：字符串操作；
    -   [strReplace](#strReplace): 替换字符串中{key}为具体的数据；
    -   [truncate](#truncate): 截取字符串；
    -   [loadScript](#loadScript): 加载 js 文件；
-   ua：常用的 ua 判断
    -   [getSystemInfo](#getSystemInfo): 获取当前系统和版本号；
    -   [getBrowserInfo](#getBrowserInfo): 获取当前 APP 和版本号；
-   url：URL 操作；
    -   [parse](#parse): 把 url 类型的字符串解析出各个的字段；
    -   [stringify](#stringify): 将几个部分拼接为一个完整的 url；
    -   [format](#format): 将几个部分拼接为一个完整的 url；
    -   [isAbsolute](#isAbsolute): url 是否是绝对地址；
-   [visibility](#visibility)： 页面的可见性；

## 引入

### 直接引入

```javascript
import utils from "gh-qqnews-utils";
utils.cookie.setCookie("name", "wenzi");
```

### 按需引入

```javascript
import { cookie } from "gh-qqnews-utils";
// 其他的还有 date, debounceThrottle, querystring, regexp, string, ua, url, visibility

const { setCookie, getCookie, delCookie } = cookie;
```

### 按模块文件引入

```javascript
import * as cookie from "gh-qqnews-utils/cookie";

cookie.setCookie("name", "wenzi");
```

```javascript
import { setCookie, getCookie, delCookie } from "gh-qqnews-utils/cookie";
setCookie("name", "skeetershi", 30); // 设置cookie，有效期为30天，默认为365天
getCookie("name"); // 获取cookie
delCookie("name"); // 删除cookie
```

## 如何使用

### cookie

操作 cookie

```javascript
import { setCookie, getCookie, delCookie } from "gh-qqnews-utils/cookie";

setCookie("name", "skeetershi", 30); // 设置cookie，有效期为30天，默认为365天
getCookie("name"); // 获取cookie
delCookie("name"); // 删除cookie
```

### date

日期的方法(date)

引入：

```javascript
import * as date from "gh-qqnews-utils/date";

// 或单独按照方法分别引用也可以
import { isSameDay, formatTime, getWeekStartAndEnd, sleep } from "gh-qqnews-utils/date";
```

#### isSameDay

判断两个日期或时间戳是否在同一天

第二个参数缺省时则使用当前时刻的时间戳进行比较。

```javascript
isSameDay("2020/05/06", "2020/05/07"); // 判断两个日期是否是同一天
isSameDay(1591283730344, 1591283720344); // 判断两个毫秒级的时间戳是否在同一天
isSameDay(1591283730344); // 判断此时间戳与当前时刻是否是同一天
```

#### formatTime

格式化时间戳。

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

#### getWeekStartAndEnd

获取给定时间戳的周一和周日的时间

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

#### sleep

延迟一段时间后执行

```javascript
sleep(1000).then(() => {
    console.log("1000ms 后执行当前代码");
});

async function fn() {
    await sleep(800);
    console.log("800ms 后执行");
}
```

### debounceThrottle

防抖和节流。

防抖可以类比影魔的大招，每次影魔摇大时被打断，都会重新开始摇。

防抖的效果也这样，我们设定一定的时间后触发某个时间，当事件一直产生时，则时间重置，在短时间内多次触发同一个函数，只执行最后一次。

节流，即一定时间间隔，只会触发一次函数，而且一定会触发。

同时还有防抖和节流的结合体：防抖是防止短时间内多次触发，如果用户一直触发某个行为，那函数肯定就会永远也不执行，这里就需要一个节流的概念，当一定时间内还没触发函数，则主动触发一次。

例如在向下滚动的图片懒加载过程中，若用户一直滚动，则图片就永远无法加载，这里我们可以设置防抖的间隔为 100ms，节流的间隔为 1000ms，意思是在用户 100ms 内再次产生滚动行为时，则取消执行加载图片的函数，但到 1000ms 的时候一定要触发一次加载图片的函数。

#### 引入

```javascript
import { debounce, throttle, debounceThrottle } from "gh-qqnews-utils/debounce-throttle";
```

#### debounce

防抖

```javascript
debounce(function () {
    console.log("行为结束后的200ms后触发当前函数");
}, 200);
```

#### throttle

节流

```javascript
throttle(function () {
    console.log("500ms内只执行一次当前函数");
}, 500);
```

#### debounceThrottle

防抖和节流

```javascript
debounceThrottle(
    function () {
        console.log("行为结束后的200ms后触发当前函数");
        console.log("若行为一直不结束，则1000ms时也会触发当前函数，然后重新计时");
    },
    200,
    1000
);
```

### querystring

网站地址中的参数操作。

#### 引入

```javascript
import { parse, stringify, getQueryString } from "gh-qqnews-utils/querystring";
// 或
import querystring from "gh-qqnews-utils/querystring";
```

#### parse

解析出所有的参数

默认使用`window.URLSearchParams`进行解析，否则进行字符串的拆分。

```javascript
const querys = querystring.parse(); // 默认解析当前链接中的search部分
console.log(querys);

querystring.parse("?name=abcd&age=123"); // {name: "abcd",age: "123"}
```

#### getQueryString

获取 url 查询字符串中的参数；

```javascript
getQueryString("name"); // abcd
getQueryString("name", "?name=abcd&age=123"); // abcd
```

#### stringify

将 obj 类型的数据拼接位字符串

参数配置：

```javascript
/**
 * 将obj类型的数据，拼接为可识别的url参数字符串
 * @param {object} query 要解析的obj
 * @param {string} sep 分隔符，默认为&
 * @param {string} eq name和value中的连接符，默认为=
 * @param {StringiyOptions} 额外控制的配置
 * @returns {string}
 */
```

用法：

```javascript
querystring.stringify({
    name: "wenzi",
    age: "24"
}); // "name=wenzi&age=24"

querystring.stringify(
    {
        name: "wenzi",
        age: "24"
    },
    "|",
    "*"
); // "name*wenzi|age*24"

querystring.stringify(
    {
        a: 10,
        b: 20
    },
    null,
    null,
    {
        encode: (value) => {
            return value * 2;
        }
    }
); // "a=20&b=40"
```

### random

#### randomNumber

产生随机的数字：大于等于 min，小于 max

```javascript
randomNumber(12, 20); // 17.244502548891298 随机
```

#### randomInt

产生随机的整数：大于等于 min，小于 max

```javascript
randomInt(12, 20); // 16 随机
randomInt(12, 13); // 12 固定
```

#### randomStr

产生随机的字符串，默认使用大写字母，小写字母和数字组成，可以通过第 2 个参数进行相关的配置：

```javascript
randomStr(len, {
    number?: boolean; // 是否有数字，默认为true
    lowercase?: boolean; // 是否有小写字母，默认为true
    uppercase?: boolean; // 是否有大写字母，默认为true
    throughline?: boolean; // 是否有中划线，默认为false
    underline?: boolean; // 是否有下划线，默认为false
})
```

使用：

```javascript
randomStr(15); // e4cMHFrp816pNEZ
randomStr(15, { uppercase: false }); // 7kj175n7ezda4cb 无大写字母
randomStr(15, { lowercase: false }); // 072WF4N34W2CPNA 无小写字母
randomStr(15, { number: false }); // tAPSiQrkNzZzTDY 无数字
randomStr(15, { throughline: true }); // dM6a-s-fpztGZNT 中划线加入到随机字符集中
randomStr(15, { underline: true }); // 0m5mYHtPep_H4ce 下划线加入到随机字符集中
```

### number

#### 引入

```javascript
import { toThousands, getClampNumber } from "gh-qqnews-utils/regexp";
```

#### toThousands

设置千分位

```javascript
toThousands(123456); // '123,456'
```

#### getClampNumber

获取合理范围内的数字，当在设定的范围内，则返回原值；当超出设定的最大或者最小阈值时，则使用边界值。

```javascript
getClampNumber(50, 0, 100); // 50
getClampNumber(-1, 0, 100); // 0
getClampNumber(110, 0, 100); // 100
```

### regexp

常用的正则表达式

例如，是否正确的手机号/email 邮箱/http 类型的 url。

#### 引入

```javascript
import { isUrl, isPhone, isEmail } from "gh-qqnews-utils/regexp";
```

#### isUrl

是否是正确的 URL 地址

```javascript
/**
 * 判断字符串是否为正确的url地址
 * http://, https://, file://均认为是正确的
 *
 * @param {string} url 要判断的字符串
 * @returns {boolean} 是否为正确的url地址
 */

isUrl("https://www.xiabingbao.com"); // true
isurl("http://www.xiabingbao.com"); // true
isUrl("file://"); // true
isUrl("//www.xiabingbao.com"); //false
```

#### isPhone

是否为正确的手机号

```javascript
isPhone("13012345678"); // true
isPhone("1301234567"); // false
isPhone("130123456789"); // false
isPhone("1301234567a"); // false
```

#### isEmail

是否为正确的邮箱地址

```javascript
isEmail("123456@qq.com"); // true
isEmail("abcdef@gmail.com"); // true
isEmail("12345c"); // false
```

### string

字符串操作(string)

#### 引入

```javascript
import { strReplace, truncate, loadScript } from "gh-qqnews-utils/string";
```

#### strReplace

替换字符串中的变量

```javascript
const str = "my name is {name}, my age is {age}"; // 注意，此括号不是ES6中模板字符串的变量

strReplace(str, {
    name: "wenzi",
    age: 24
}); // "my name is wenzi, my age is 24"
```

#### truncate

截取字符串，并添加后缀

按照规定的长度 size 截取字符串，若 size 大于等于字符串的长度，或 size 小于等于 0，则字符串原样返回。

若 size 符合要求，则正常截取字符串，一个中文字符按照 1 个长度计算；结尾默认`...`结束，不过可以自行选择。

```javascript
truncate("hello world", 12); // hello world
truncate("hello world", 11); // hello world
truncate("hello world", 4); // hell...
truncate("hello world", 4, "***"); // hell***
```

#### loadScript

加载一个 js 文件

```javascript
loadScript("https://mat1.gtimg.com/libs/jquery/jquery-1.11.1.js")
    .then(() => {
        console.log("load js success");
    })
    .catch(() => {
        console.error("load js failed");
    });
```

### ua

获取 ua 中的数据(ua)

#### 引入

```javascript
import { getSystemInfo, getBrowserInfo } from "gh-qqnews-utils/ua";
```

| 字段        | 数值                           | 说明                |
| ----------- | ------------------------------ | ------------------- |
| name        | iphone\|ipad\|android\|windows | 操作系统的名称      |
| version     | 6.0.1                          | 版本号              |
| ios         | true                           | 是否是 iOS 系统     |
| android     | false                          | 是否是 Android 系统 |
| manufacture | huawei                         | 手机的品牌          |
| model       | mt7-cl00                       | 型号                |
| build       | mt7-cl00                       | 构建的流水线        |

#### getSystemInfo

获取系统级的数据

```javascript
getSystemInfo();
/*
// iOS系统
{
    android: false,
    ios: true,
    manufacture: "",
    name: "iphone",
    version: "13.2.3"
}

// android系统
{
    android: true,
    ios: false,
    name: "android",
    version: "5.0",
    manufacture: "huawei",
    model: 'mt7-cl00',
    build: 'mt7-cl00'
}
*/
```

#### getBrowserInfo

获取所在 APP 或者浏览器的数据

```javascript
getBrowserInfo();
/*
// iOS系统
{
    name: "safari",
    version: "604.1",
    app: {
        weixin: true,
        qq: false
    }
}

// android
{
    name: "chrome",
    version: "81.0",
    app: {
        weixin: true,
        qq: false
    }
}
*/
```

### url

操作 url

#### 引入

```javascript
import { parse, stringify, format, http2https } from "gh-qqnews-utils/url";
// format与stringify的操作一样
```

#### parse

解析 url 字符串的各个部分

```javascript
// 默认使用window.URL解析，否则创建一个a标签来解析
parse(); // 参数默认为当前的url
/*
{
    hash: "",
    host: "joke.qq.com:8080",
    hostname: "joke.qq.com",
    href: "http://joke.qq.com:8080/works/starlist/rank?a=1&b=2",
    origin: "http://joke.qq.com:8080",
    pathname: "/works/starlist/rank",
    port: "8080",
    protocol: "http:",
    search: "?a=1&b=2"
}
*/
```

#### stringify

将各个部分组装成一个完成的 url 地址

各个部分均可以缺省，然后使用默认值：

```typescript
interface StringIfyOptions {
    protocol?: "http:" | "https:" | "file:";
    port?: string;
    hostname?: string;
    pathname?: string;
    query?: {
        [name: string]: any;
    };
}
```

使用：

```javascript
stringify({
    hostname: "www.xiabingbao.com",
    pathname: "/post/fe/hash-history-router.html"
}); // "https://www.xiabingbao.com/post/fe/hash-history-router.html"

stringify({
    protocol: "http:",
    port: "8080",
    hostname: "www.xiabingbao.com",
    pathname: "/post/fe/hash-history-router.html"
}); // "http://www.xiabingbao.com:8080/post/fe/hash-history-router.html"

stringify({
    hostname: "www.xiabingbao.com",
    query: {
        from: "utils",
        num: 1,
        score: {
            math: 80,
            eng: 90
        }
    }
}); // "https://www.xiabingbao.com?from=utils&num=1&score=%7B%22math%22%3A80%2C%22eng%22%3A90%7D"
```

#### http2https

将`http://`开头的链接改为`https://`的，其他格式的保持不变，原样返回。

```javascript
http2https("http://www.xiabingbao.com"); // https://www.xiabingbao.com
http2https("https://www.xiabingbao.com"); // https://www.xiabingbao.com
http2https("//www.xiabingbao.com"); // //www.xiabingbao.com
```

### visibility

页面可见性的检测

#### 引入

```javascript
import PageVisibility from "gh-qqnews-utils/visibility";
```

#### 使用

```javascript
const visibility = new PageVisibility();

// 监听当前页面的变化
visibility.visibilityChange((isShow) => {
    console.log(isShow); // 可见性切换时触发
});

// 直接获取当前页面的可见性
visibility.isShow(); // 当前页面的可见性

visibility.destory(); // 销毁 visibilityChange 监听事件
```

## 维护者

-   [skeetershi](https://git.code.oa.com/u/skeetershi)
-   [wenzi](https://github.com/wenzi0github)

## 协议

[MIT](./LICENSE)

## ChangeLog

[ChangeLog](./ChangeLog.md)
