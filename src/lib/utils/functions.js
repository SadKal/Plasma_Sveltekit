export function getGamePrice(id) {
    const price = Math.round((Math.log(id) + 1) * 4) - .01;
    return parseFloat(price);
}
