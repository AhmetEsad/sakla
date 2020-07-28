var fs = require("fs");
exports.okut = function (dosya) {
    var okunan = fs.readFileSync(dosya, "utf8");
    if (okunan.split("\n").filter(satır => /(.*)=(.*)/.test(satır) == false).length == 0) {
        return JSON.parse('{' + okunan.split("\n").map(değişken => "\"" + /(.*)=(.*)/.exec(değişken)[1] + "\":\"" + /(.*)=(.*)/.exec(değişken)[2] + "\"").join(',') + '}')
    } else {
        return "HATA: dosya boş veya bozuk: tüm satırların X=Y şeklinde olması gerekir.";
    }
}
exports.ekle = function (dosya, json) {
    for (o in Object.entries(json)[0]) {
        var okunan = fs.appendFileSync(dosya, fs.readFileSync(dosya, "utf8") !== "" ? "\n" + Object.entries(json).map(d => d[0] + '=' + d[1]).join('\n') : Object.entries(json).map(d => d[0] + '=' + d[1]).join('\n'));
        return exports.okut(dosya);
    }
}
exports.sil = function (dosya, isim) {
    var okunanDosya = fs.readFileSync(dosya, "utf8");
    if (okunanDosya.split("\n").filter(satır => /(.*)=(.*)/.exec(satır)[1] == isim)) {
        var _e = exports.okut(dosya);
        var _y = delete _e[isim];
        exports.üzerineYaz(dosya, _e);
        return exports.okut(dosya);
    } else {
        return "HATA: değişken yok: yalnızca daha önceden tanımlanmış değişkenler silinebilir."
    }
}
exports.üzerineYaz = function (dosya, json) {
    for (o in Object.entries(json)[0]) {
        var okunan = fs.writeFileSync(dosya, Object.entries(json).map(d => d[0][o] + '=' + d[1][o]).join('\n'));
        return exports.okut(dosya);
    }
}
