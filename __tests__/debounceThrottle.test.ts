import {debounce} from '../src/debounceThrottle';

describe('debounce', () => {
    it('debounce', (done) => {
        let i = 3;
        const timer = setInterval(() => {
            i--;
            console.log(i);
            if (i<=0) {
                clearInterval(timer);
            }
            
            const fn = debounce(() => {
                expect(i).toEqual(1);
                done();
            }, 200);
            fn();
        }, 100);
    })
})