
const isString=function(value){
    if(typeof value==="string")
    return true
    return false
}

const isNotEmpty = function (value) {
    if (value.trim().length != 0) return true;
    return false;
}


const isWrong = function (value) {
    if (value.match(/^[a-z]{2,10}$/i)) return true;
    return false;
}

const isValidCollege=function(value){
    if (value.match(/([A-Z][^\s,.]+[.]?\s[(]?)*[^,\d]*(?=,|\d)/
    )) return true;
    return false;
}

const isvalidLink=function(value){
    if (value.match(/^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/)) return true;
    return false;
}
module.exports={isString,isNotEmpty,isWrong, isValidCollege,isvalidLink}