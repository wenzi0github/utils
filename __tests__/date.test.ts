import { isSameDay, formatTime, getWeekStartAndEnd, sleep } from "../src/date";

describe("date.isSameDay", () => {
    const now = 1590564078018;
    test("ellipsis second param", () => {
        expect(isSameDay(now)).toBeFalsy();
    });
    test("true", () => {
        expect(isSameDay(now, now - 10)).toBeTruthy();
    });
    test("false", () => {
        expect(isSameDay(now, now - 1000 * 60 * 60 * 24)).toBeFalsy();
    });
    test("formattime and timestamp", () => {
        expect(isSameDay("2020/05/27", now)).toBeTruthy();
    });
    test("formattime and formattime", () => {
        expect(isSameDay("2020/05/27", "2020/05/28")).toBeFalsy();
    });
});

describe("date.formatTime", () => {
    const now = 1590564078018;
    test(`ellipsis second param`, () => {
        expect(formatTime(now)).toBe("2020/05/27 15:21:18");
    });
    test(`yyyy/MM/dd hh:mm:ss`, () => {
        expect(formatTime(now, "yyyy/MM/dd hh:mm:ss")).toBe("2020/05/27 15:21:18");
    });
    test(`yyyy/MM/dd`, () => {
        expect(formatTime(now, "yyyy/MM/dd")).toBe("2020/05/27");
    });
    test(`hh:mm:ss`, () => {
        expect(formatTime(now, "hh:mm:ss")).toBe("15:21:18");
    });
    test(`yyyy年MM月dd日`, () => {
        expect(formatTime(now, "yyyy年MM月dd日")).toBe("2020年05月27日");
    });
});

describe("date.getWeekStartAndEnd", () => {
    const now = 1590564078018;
    test("get this week first day and last day", () => {
        expect(getWeekStartAndEnd("yyyy/MM/dd", "yyyy/MM/dd", now)).toMatchObject({
            startDate: "2020/05/25",
            endDate: "2020/05/31"
        });
    });
    test("today is sunday", () => {
        expect(getWeekStartAndEnd("yyyy/MM/dd", "MM-dd", new Date("2020/06/07 01:00").getTime())).toMatchObject({
            startDate: "2020/06/01",
            endDate: "06-07"
        });
    });
});

describe("date.sleep", () => {
    test("sleep less then 18", async () => {
        const now = performance.now();
        await sleep(6);
        // 低于17毫秒，则使用requestAnimationFrame来实现
        expect(performance.now() - now).toBeGreaterThan(16);
    });
    test("sleep more then 18", async () => {
        const now = performance.now();
        await sleep(120);
        expect(performance.now() - now).toBeGreaterThan(120);
    });
    test("sleep not exist requestAnimationFrame", async () => {
        const now = performance.now();
        await sleep(6);
        expect(performance.now() - now).toBeGreaterThan(16);
    });
});
