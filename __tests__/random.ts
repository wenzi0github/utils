import { randomStr, randomNumber, randomInt } from "../src/random";

describe("random.randomInt", () => {
    test("randomInt", () => {
        const result = randomInt(12, 20);
        expect(result).toBeGreaterThanOrEqual(12);
        expect(result).toBeLessThan(20);
    });
    test("randomInt", () => {
        const result = randomInt(12, 2);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThan(12);
    });
    test("randomInt", () => {
        const result = randomInt(12, 13);
        expect(result).toEqual(12);
    });
});

describe("random.randomNumber", () => {
    test("randomNumber", () => {
        const result = randomNumber(12, 20);
        expect(result).toBeGreaterThanOrEqual(12);
        expect(result).toBeLessThan(20);
    });
    test("randomNumber", () => {
        const result = randomNumber(12, 2);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThan(12);
    });
});

describe("random.randomStr", () => {
    test("randomStr", () => {
        expect(randomStr(15)).toHaveLength(15);
    });
    test("randomStr no upper case", () => {
        expect(
            randomStr(15, {
                uppercase: false
            })
        ).toMatch(/[a-z0-9]{15}/);
    });
    test("randomStr no lower case", () => {
        expect(
            randomStr(15, {
                lowercase: false
            })
        ).toMatch(/[A-Z0-9]{15}/);
    });
    test("randomStr no numbers", () => {
        expect(
            randomStr(15, {
                number: false
            })
        ).toMatch(/[A-Za-z]{15}/);
    });
    test("randomStr only lower case", () => {
        expect(
            randomStr(15, {
                uppercase: false,
                number: false
            })
        ).toMatch(/[a-z]{15}/);
    });
    test("randomStr add underline", () => {
        expect(
            randomStr(15, {
                underline: true
            })
        ).toMatch(/[A-Za-z0-9_]{15}/);
    });
    test("randomStr add throughline", () => {
        expect(
            randomStr(15, {
                throughline: true
            })
        ).toMatch(/[A-Za-z0-9-]{15}/);
    });
});
