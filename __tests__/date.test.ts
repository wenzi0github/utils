import { isSameDay, formatTime } from "../src/date";

describe("date.isSameDay", () => {
    const now = 1590564078018;
    test(`date.isSameDay true`, () => {
        expect(isSameDay(now, now - 10)).toBeTruthy();
    });
    test(`date.isSameDay false`, () => {
        expect(isSameDay(now, now - 1000 * 60 * 60 * 24)).toBeFalsy();
    });
    test("date.isSameDay formattime and timestamp", () => {
        expect(isSameDay("2020/05/27", now)).toBeTruthy();
    });
    test("date.isSameDay formattime and formattime", () => {
        expect(isSameDay("2020/05/27", "2020/05/28")).toBeFalsy();
    });
});

describe("date.formatTime", () => {
    const now = 1590564078018;
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
