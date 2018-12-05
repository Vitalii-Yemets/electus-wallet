export const toHex = (value, isPrefix = true) => {
    return isPrefix ? `0x${Number(value).toString(16)}` : Number(value).toString(16)
}