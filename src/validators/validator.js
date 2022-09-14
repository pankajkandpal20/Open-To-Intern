
const isString=function(value){
    if(typeof value==="string")
    return true
    return false
}


const isWrong = function (value) {
    if (value.match(/^[A-Za-z]{2,10}+$/)) return true;
    return false;
}

module.exports={isString,isWrong}