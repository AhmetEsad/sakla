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
    for (o in Object.entries(_json)[0]) {
        var okunan = fs.appendFileSync(_dosya, fs.readFileSync(_dosya, "utf8") !== "" ? "\n" + Object.entries(_json).map(d => d[0] + '=' + d[1]).join('\n') : Object.entries(_json).map(d => d[0] + '=' + d[1]).join('\n'));
        return exports.okut(_dosya);
    }
}
exports.sil = function (__dosya, __isim) {
    var okunanDosya = fs.readFileSync(__dosya, "utf8");
    if (okunanDosya.split("\n").filter(satır => /(.*)=(.*)/.exec(satır)[1] == __isim)) {
        var _e = exports.okut(__dosya);
        var _y = delete _e[__isim];
        exports.üzerineYaz(__dosya, _e);
        return exports.okut(__dosya);
    } else {
        return "HATA: değişken yok: yalnızca daha önceden tanımlanmış değişkenler silinebilir."
    }
}
exports.üzerineYaz = function (___dosya, ___json) {
    for (o in Object.entries(___json)[0]) {
        var okunan = fs.writeFileSync(___dosya, Object.entries(___json).map(d => d[0][o] + '=' + d[1][o]).join('\n'));
        return exports.okut(___dosya);
    }
}
