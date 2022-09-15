
const isString = function (value) {
    if (typeof value === "string") return true
    return false
}

const isNotEmpty = function (value) {
    if (value.trim().length != 0) return true;
    return false;
}

const isWrong = function (value) {
    if (value.match(/^[a-z.]{2,10}$/i)) return true;
    return false;
}

const isValidName = function (value) {
    if (value.match(/^[a-zA-Z ]+$/)) return true;
    return false;
}

const isValidCollege = function (value) {
    if (value.match(/^[a-zA-Z ,.]+$/)) return true;
    return false;
}

const isValidLink = function (value) {
    if (value.match(/(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i)) return true;
    return false;
}

module.exports = { isString, isNotEmpty, isWrong, isValidName, isValidCollege, isValidLink }