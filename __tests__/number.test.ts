import { toThousands, getClampNumber } from "../src/number";

describe("toThousands", () => {
    it("int", () => {
        expect(toThousands(12345)).toEqual("12,345");
    });
});
describe("getClampNumber", () => {
    it("reasonable", () => {
        expect(getClampNumber(50, 0, 100)).toEqual(50);
    });
    it("lower min", () => {
        expect(getClampNumber(-1, 0, 100)).toEqual(0);
    });
    it("outer max", () => {
        expect(getClampNumber(101, 0, 100)).toEqual(100);
    });
});
