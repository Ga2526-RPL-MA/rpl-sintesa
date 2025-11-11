export default class Random {
    static int(max = 0, min = 0) {
        if (!Number.isInteger(max) || !Number.isInteger(min))
            throw new TypeError('Parameter must be an Integer');
        if (max < 0 || min < 0)
            throw new RangeError(
                'Max and Min must be greater than or equal to 0',
            );
        if (max < min)
            throw new RangeError('Max must be greater than or equal to Min');
        if (max === min) return max;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static evenInt(max = 0, min = 0) {
        const number = Random.int(max, min);
        return number - (number & 1);
    }
}
