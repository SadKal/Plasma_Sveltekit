export function getGamePrice(id) {
    return Math.round((Math.log(id) + 1) * 4) - .01;
}