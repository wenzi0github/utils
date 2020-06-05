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
import { isSameDay, formatTime, getWeekStartAndEnd, sleep } from "gh-qqnews-utils/date";
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

### 防抖和节流

防抖可以类比影魔的大招，每次影魔摇大时被打断，都会重新开始摇。

防抖的效果也这样，我们设定一定的时间后触发某个时间，当事件一直产生时，则时间重置，在短时间内多次触发同一个函数，只执行最后一次。

节流，即一定时间间隔，只会触发一次函数，而且一定会触发。

同时还有防抖和节流的结合体：防抖是防止短时间内多次触发，如果用户一直触发某个行为，那函数肯定就会永远也不执行，这里就需要一个节流的概念，当一定时间内还没触发函数，则主动触发一次。

例如在向下滚动的图片懒加载过程中，若用户一直滚动，则图片就永远无法加载，这里我们可以设置防抖的间隔为 100ms，节流的间隔为 1000ms，意思是在用户 100ms 内再次产生滚动行为时，则取消执行加载图片的函数，但到 1000ms 的时候一定要触发一次加载图片的函数。

#### 引入

```javascript
import { debounce, throttle, debounceThrottle } from "gh-qqnews-utils/debounce-throttle";
```

#### 防抖

```javascript
debounce(function () {
    console.log("行为结束后的200ms后触发当前函数");
}, 200);
```

#### 节流

```javascript
throttle(function () {
    console.log("500ms内只执行一次当前函数");
}, 500);
```

#### 防抖和节流

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

### 网站地址中的参数操作（querystring）

#### 引入

```javascript
import { parse, stringify, getQueryString } from "gh-qqnews-utils/querystring";
// 或
import querystring from "gh-qqnews-utils/querystring";
```

#### 解析出所有的参数

默认使用`window.URLSearchParams`进行解析，否则进行字符串的拆分。

```javascript
const querys = querystring.parse(); // 默认解析当前链接中的search部分
console.log(querys);

querystring.parse("?name=abcd&age=123"); // {name: "abcd",age: "123"}
```

#### 将 obj 类型的数据拼接位字符串

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

### 常用的正则表达式

例如，是否正确的手机号/email 邮箱/http 类型的 url。

#### 引入

```javascript
import { isUrl, isPhone, isEmail } from "gh-qqnews-utils/regexp";
```

#### 是否是正确的 URL 地址

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

#### 是否为正确的手机号

```javascript
isPhone("13012345678"); // true
isPhone("1301234567"); // false
isPhone("130123456789"); // false
isPhone("1301234567a"); // false
```

#### 是否为正确的邮箱地址

```javascript
isEmail("123456@qq.com"); // true
isEmail("abcdef@gmail.com"); // true
isEmail("12345c"); // false
```

### 字符串操作

#### 引入

```javascript
import { strReplace, truncate, loadScript } from "gh-qqnews-utils/string";
```

#### 替换字符串中的变量

```javascript
const str = "my name is {name}, my age is {age}"; // 注意，此括号不是ES6中模板字符串的变量

strReplace(str, {
    name: "wenzi",
    age: 24
}); // "my name is wenzi, my age is 24"
```

#### 截取字符串，并添加后缀

按照规定的长度 size 截取字符串，若 size 大于等于字符串的长度，或 size 小于等于 0，则字符串原样返回。

若 size 符合要求，则正常截取字符串，一个中文字符按照 1 个长度计算；结尾默认`...`结束，不过可以自行选择。

```javascript
truncate("hello world", 12); // hello world
truncate("hello world", 11); // hello world
truncate("hello world", 4); // hell...
truncate("hello world", 4, "***"); // hell***
```

#### 加载一个 js 文件

```javascript
loadScript("https://mat1.gtimg.com/libs/jquery/jquery-1.11.1.js")
    .then(() => {
        console.log("load js success");
    })
    .catch(() => {
        console.error("load js failed");
    });
```

### 获取 ua 中的数据

#### 引入

```javascript
import { getSystemInfo, getBrowserInfo } from "gh-qqnews-utils/ua";
```

#### 获取系统级的数据

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
    manufacture: "samsung",
    name: "android",
    version: "5.0"
}
*/
```

#### 获取所在 APP 或者浏览器的数据

```javascript
getBrowserInfo();
/*
// iOS系统
{
    name: "safari",
    version: "604.1"
}

// android
{
    name: "chrome",
    version: "81.0"
}
*/
```

### 操作 url

#### 引入

```javascript
import { parse, stringify, format } from "gh-qqnews-utils/url";
// format与stringify的操作一样
```

#### 解析 url 字符串的各个部分

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

#### 将各个部分组装成一个完成的 url 地址

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
