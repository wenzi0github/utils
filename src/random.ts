/**
 * get random number
 * @param {number} min min number
 * @param {number} max max number
 * @returns {number}
 */
export const randomNumber = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
};

/**
 * get random int number
 * @param {number} min min number
 * @param {number} max max number
 * @returns {number}
 */
export const randomInt = (min: number, max: number): number => {
    return Math.floor(randomNumber(min, max));
};

interface RandomStrOpts {
    number?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    throughline?: boolean;
    underline?: boolean;
}

const randomStrDefaultOpts = {
    number: true,
    lowercase: true,
    uppercase: true,
    throughline: false,
    underline: false
};

/**
 * get len string
 * @param {number} len get the string length
 * @param {RandomStrOpts} opts options
 */
export const randomStr = (len: number, opts: RandomStrOpts = randomStrDefaultOpts) => {
    const st = {
        uppercase: "ABCDEFGHJKMNPQRSTWXYZ",
        lowercase: "abcdefhijkmnprstwxyz",
        number: "012345678",
        throughline: "---",
        underline: "___"
    };

    const config = { ...randomStrDefaultOpts, ...opts };
    let possible = "";
    let key: keyof RandomStrOpts;
    let result = "";

    for (key in config) {
        if (config[key]) {
            possible += st[key];
        }
    }
    const poslen = possible.length;
    while (len--) {
        result += possible.charAt(Math.floor(Math.random() * poslen));
    }
    return result;
};
