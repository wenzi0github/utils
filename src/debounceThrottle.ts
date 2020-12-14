// 防抖和节流
// 防抖可以类比影魔的大招，每次影魔摇大时被打断，都会重新开始摇。
// 防抖的效果也这样，我们设定一定的时间后触发某个时间，当事件一直产生时，
// 则时间重置
// 在短时间内多次触发同一个函数，只执行最后一次
// http://alloween.top/2018/04/16/%E9%98%B2%E6%8A%96%E3%80%81%E8%8A%82%E6%B5%81/

/**
 * 防抖函数
 *
 * @param {Function} fn
 * @param {number} delay 延迟的时间
 */
export const debounce = function (fn: Function, delay: number) {
    // 维护一个 timer
    let timer: any = null;

    return function () {
        // 获取函数的作用域和变量
        // @ts-ignore
        const context = this;
        const args: any = arguments;

        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

/**
 * 节流函数
 * 在一段时间内只允许函数执行一次
 *
 * @param {Function} fn 回调函数
 * @param {number} timeout 时间间隔
 */
export const throttle = function (
    fn: Function,
    timeout: number,
    options?: {
        immediate: boolean;
    }
) {
    let timer: any = null;
    const immediate = options && options.immediate;

    return function () {
        // @ts-ignore
        const context = this;
        const args: any = arguments;
        if (!timer) {
            // 是否立即执行
            if (immediate) {
                // @ts-ignore
                fn.apply(this, arguments);
            }

            // 第一次时产生timer，然后过滤掉之后所有的回调
            // 一定时间后才执行一次的回调
            timer = setTimeout(function () {
                if (!immediate) {
                    fn.apply(context, args);
                }
                timer = null;
            }, timeout);
        }
    };
};

// 防抖存在的一个缺点是：若动作无限触发，则可能永远无法触发回调
// 例如在向下滚动的图片懒加载过程中，若用户无限向下滚动，则图片永远无法加载
// 因此这里防抖和节流进行结合，一定时间内，一定会触发一次回调

/**
 * 防抖和节流函数的结合
 *
 * @param {Function} fn 回调函数
 * @param {number} delay 取消执行事件的时间
 * @param {number} timeout 一定时间内肯定会执行一次，timeout > delay
 */
export const debounceThrottle = (fn: Function, delay: number, timeout: number) => {
    let timer: any = null;
    let previous = 0;

    return function () {
        // @ts-ignore
        const context = this;
        const args: any = arguments;

        let now = Date.now();
        if (now - previous > timeout) {
            // 超过一定的时间，一定会执行一次
            fn.apply(context, args);
            timer = null;
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
                timer = null;
                previous = 0;
            }, delay);
        }
    };
};
