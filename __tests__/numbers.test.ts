import { toThousands } from "../src/numbers";

describe('toThousands', () => {
    it('int', () => {
        expect(toThousands(12345)).toEqual('12,345');
    })
})
