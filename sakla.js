var fs = require("fs");
exports.okut = function (dosya) {
    var okunan = fs.readFileSync(dosya, "utf8");
    if (okunan.split("\n").filter(satır => /(.*)=(.*)/.test(satır) == false).length == 0) {
        return JSON.parse('{' + okunan.split("\n").map(değişken => "\"" + /(.*)=(.*)/.exec(değişken)[1] + "\":\"" + /(.*)=(.*)/.exec(değişken)[2] + "\"").join(',') + '}')
    } else {
        return "HATA: dosya boş veya bozuk: tüm satırların X=Y şeklinde olması gerekir.";
    }
}
exports.ekle = function (_dosya, _json) {
    for (o in Object.entries(JSON.parse(String(_json)))[0]) {
        var okunan = fs.appendFileSync(_dosya, fs.readFileSync(_dosya, "utf8") !== "" ? "\n" + Object.entries(JSON.parse(String(_json))).map(d => d[0][o] + '=' + d[1][o]).join('\n') : Object.entries(JSON.parse(String(_json))).map(d => d[0][o] + '=' + d[1][o]).join('\n'));
        return okut(_dosya);
    }
}
exports.sil = function (__dosya, __isim) {
    var okunanDosya = fs.readFileSync(__dosya, "utf8");
    if (okunanDosya.split("\n").filter(satır => /(.*)=(.*)/.exec(satır)[1] == __isim)) {
        var _e = okut(__dosya);
        var _y = delete _e[__isim];
        üzerineYaz(__dosya, JSON.stringify(_e));
        return okut(__dosya);
    } else {
        return "HATA: değişken yok: yalnızca daha önceden tanımlanmış değişkenler silinebilir."
    }
}
exports.üzerineYaz = function (___dosya, ___json) {
    for (o in Object.entries(JSON.parse(String(___json)))[0]) {
        var okunan = fs.writeFileSync(___dosya, Object.entries(JSON.parse(String(___json))).map(d => d[0][o] + '=' + d[1][o]).join('\n'));
        return okut(___dosya);
    }
}