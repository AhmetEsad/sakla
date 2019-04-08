sakla
=
Her şeyi kaydedebileceğiniz ufak veritabanı. Kolayca okunabilir. JSON olarak size geri döner. İstediğiniz dosya türünü kullanabilirsiniz. Ayrıca modül kurulumu da gerektirmez.

```js
const sakla = require("sakla");
```

**Okuma**
```js
sakla.okut("./test.sakla"); // a=b
// {"a": "b"}
```

**Ekleme**
```js
/* test.sakla dosyasının içeriğini:
a=b
c=d
olarak varsayalım. */
sakla.ekle("./test.sakla", {"x": "y"});
/* test.sakla dosyası:
a=b
c=d
x=y
olur. Aynı zamanda size {"a": "b", "c": "d", "x": "y"} olarak döner. */
```

**Üzerine Yazma**
```js
sakla.üzerineYaz("./test.sakla", {"a": "b"});
// test.sakla dosyası a=b olur.
```

**Silme**
```js
/* test.sakla dosyasının içeriğini:
a=b
c=d
olarak varsayalım. */
sakla.sil("./test.sakla", "a");
// yeni dosya içeriği c=d olur ve size {"c": "d"} olarak döndürür.
```

Bilinen Hata(lar)
=
- Silme fonksiyonu dosyada yalnızca bir değişken varsa çalışmıyor. Kısaca dosyanızda hep bir tane fazladan değişken tutmalısınız.
