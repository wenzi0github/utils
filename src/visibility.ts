/**
 * 由于历史原因，这个 API 还定义了document.hidden属性。该属性只读，返回一个布尔值，表示当前页面是否可见。
 * 当document.visibilityState属性返回visible时，document.hidden属性返回false；其他情况下，都返回true。
 * 该属性只是出于历史原因而保留的，只要有可能，都应该使用document.visibilityState属性，而不是使用这个属性。
 */
/**
 * 获取当前页面的可见性
 * https://www.zhangxinxu.com/wordpress/2012/11/page-visibility-api-introduction-extend/
 */
const keyWithPrefix = (prefix: string, key: string) => {
    if (prefix !== "") {
        // 首字母大写
        return prefix + key.slice(0, 1).toUpperCase() + key.slice(1);
    }
    return key;
};

class PageVisibility {
    private __hidden = "";
    private __state = "";
    private __prefixSupport = "";
    __bindFn = () => {};
    support = false;

    constructor() {
        this.support = this.__isPageVisibilitySupport();
    }

    // 当前浏览器是否支持hidden
    private __isPageVisibilitySupport() {
        let support = false;
        if (typeof window === "undefined") {
            return support;
        }
        ["", "webkit", "moz", "ms", "o"].forEach((item) => {
            let s = keyWithPrefix(item, "hidden");
            if (!support && s in document) {
                this.__hidden = s;
                this.__prefixSupport = item;
                this.__state = keyWithPrefix(item, "visibilityState");
                support = true;
            }
        });
        return support;
    }

    /**
     * 监听页面可见性的变化
     * @param {function} fn 回调方法
     * @param {boolean} usecapture 是否冒泡
     */
    visibilityChange(fn: (visibility: boolean) => void, usecapture: boolean = false) {
        if (this.support && typeof fn === "function") {
            const self = this;

            this.__bindFn = function () {
                fn.call(null, self.isShow());
            }.bind(this);
            return document.addEventListener(this.__prefixSupport + "visibilitychange", this.__bindFn, usecapture);
        }
    }

    // 多次执行时，先去掉之前的事件，防止附加多个change事件
    destory() {
        document.removeEventListener(this.__prefixSupport + "visibilitychange", this.__bindFn);
    }

    /**
     * 获取当前页面的可见性
     *
     * @returns {boolean} 是否可见
     */
    isShow(): boolean {
        // 若不支持，则默认页面一直可见
        if (!this.support) {
            return true;
        }
        if (this.__state in document) {
            return (document as any)[this.__state] === "visible";
        } else if (this.__hidden in document) {
            return !(document as any)[this.__hidden];
        }
        return true;
    }
}

export default PageVisibility;
