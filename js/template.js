function template(id, data) {
    var str = document.getElementById(id).innerHTML
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/

    var patternResulte = null
    while ((patternResulte = pattern.exec(str))){
        str = str.replace(patternResulte[0],data[patternResulte[1]])
    }
    return str
}