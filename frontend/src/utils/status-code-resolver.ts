const StatusCodeReslover = function (code : number) {
    if(code === 200) {
        return "SUCCESS";
    }
    else {
        return "FAILURE";
    }
}

export default StatusCodeReslover;