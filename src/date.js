export const format = (date, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
    const _date = new Date(date);
    const _y = _date.getFullYear();
    const _M = _date.getMonth();
    const _D = _date.getDate();
    const _W = _date.getDay();
    const _H = _date.getHours();
    const _m = _date.getMinutes();
    const _s = _date.getSeconds();
    const _ms = _date.getMilliseconds();

    function s0(str) {
        if (!str.toString().length) return '';
        if (str.toString().length === 1) return '0' + str;
        return str.toString();
    }

    function h12(h) {
        if (h > 12) return h - 12;
        return h;
    }

    const matches = {
        YY: String(_y).slice(-2),
        YYYY: String(_y),
        M: String(_M + 1),
        MM: s0(_M + 1),
        D: _D,
        DD: s0(_D),
        H: String(_H),
        HH: s0(_H),
        h: h12(_H),
        hh: s0(h12(_H)),
        m: String(_m),
        mm: s0(_m),
        s: String(_s),
        ss: s0(_s),
    };

    return formatStr.replace(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, (match, $1) => $1 || matches[match] || '');
};

export default {
    format
}