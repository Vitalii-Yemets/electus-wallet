
export const generateExtraEntropy = lengthExtraEntropy => {
    const MAXLEN = lengthExtraEntropy;
    const MINLEN = lengthExtraEntropy;

    const genString = () => {
        let array = new Uint8Array(MAXLEN);
        window.crypto.getRandomValues(array);
        array = Array.apply([], array);
        array = array.filter((x) => (x > 32 && x < 127));
        return String.fromCharCode.apply(String, array);
    }

    let tmp = genString();
    while (tmp.length < MINLEN) {
        tmp += genString();
    }

    return tmp.substr(0, lengthExtraEntropy);
}