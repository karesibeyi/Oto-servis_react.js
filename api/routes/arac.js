var express = require('express');
var router = express.Router();
var SqlQuery = require('../helpers/db');

/////
router.get('/', function (req, res, next) {
    SqlQuery("SELECT ID, PLAKA, convert(varchar, TARIH, 2) AS TARIH FROM tb_arac", (data) => {
        res.send(data);
    });

});
/////
router.get('/servisTipi', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Servis_Tipi", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    });
});


router.get('/cariAd', function (req, res, next) {
    SqlQuery("SELECT ID,Ad FROM tb_Cari", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/cari', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Cari  Where Aktif = 1", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/personel', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Personel Where Aktif = 1", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/arackayit', function (req, res, next) {
    SqlQuery("SELECT ID, Plaka FROM tb_Arac_Karti", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/faturalar', function (req, res, next) {
    SqlQuery("Select tb_Satis.ID as Fatura_ID, tb_Satis.Tarih, tb_Satis.Genel_Toplam, Cari.Ad, Cari.Gsm from tb_Satis inner join tb_Cari Cari ON Cari.Arac_ID = tb_Satis.Plaka_ID ORDER BY Fatura_ID Desc", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/kalibrasyontakograf', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Kalibrasyon_Takograf", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/kalibrasyonbelgetur', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Kalibrasyon_Belge_Tur", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/lpgcins', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Lpg_Cins", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/lpgmarka', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Lpg_Marka", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/lpgtip', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Lpg_Tip", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/yakittur', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Arac_Yakit_Tur", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/araccins', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Arac_Cinsi", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/randevu', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Randevu Where Aktif = 1", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/stok', function (req, res, next) {
    SqlQuery("SELECT * FROM tb_Stok Where Aktif = 1", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.get('/tedarikci', function (req, res, next) {
    SqlQuery("Select ID,AD from tb_Cari where Cari_Tur = 'Tedarikçi'", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/serviste', function (req, res, next) {
    SqlQuery("Select tb_Arac_Giris_Cikis.*, AracKarti.Plaka, Personel.Ad as Teslim_Alan_Personel_Ad from tb_Arac_Giris_Cikis inner join tb_Arac_Karti AracKarti ON tb_Arac_Giris_Cikis.Arac_ID = AracKarti.ID inner join tb_Personel Personel ON tb_Arac_Giris_Cikis.Teslim_Alan_Personel_ID = Personel.ID Where tb_Arac_Giris_Cikis.Cikis_Tarih = '0'", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

router.get('/servis', function (req, res, next) {
    SqlQuery("SELECT tb_Arac_Giris_Cikis.*, p1.Ad as Teslim_Eden_Personel_Ad, p2.Ad as Teslim_Alan_Personel_Ad, tb_Arac_Karti.Plaka FROM tb_Arac_Giris_Cikis inner join tb_Personel p1 ON tb_Arac_Giris_Cikis.Teslim_Eden_Personel_ID = p1.ID inner join tb_Personel p2 ON tb_Arac_Giris_Cikis.Teslim_Alan_Personel_ID = p2.ID inner join tb_Arac_Karti ON tb_Arac_Giris_Cikis.Arac_ID = tb_Arac_Karti.ID", (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});

/////////// Examples
router.post('/ekle', function (req, res, next) {
    var plaka = req.body.plaka;
    var cariAdi = req.body.cariAdi;

    console.log([
    ]);
    res.send({ status: 'success' })

    SqlQuery(`INSERT INTO tb_arac(PLAKA,CARI_ADI) VALUES('${plaka}','${cariAdi}')`, (data) => {
        res.send(data);
    });
});

router.post('/aracgiris', function (req, res, next) {
    var plakaId = req.body.plakaId;
    var alinantarih = req.body.alinantarih;
    var teslimedenad = req.body.teslimedenad;
    var teslimedentc = req.body.teslimedentc;
    var teslimedengsm = req.body.teslimedengsm;
    var Cikis_Tarih ='0';
    var personel = req.body.personel;

    SqlQuery(`DECLARE @Servistemi bit = (select Servistemi from tb_Arac_Karti  where ID = '${plakaId}') IF (@Servistemi > 0) SELECT 1 as Message
    ELSE INSERT INTO tb_Arac_Giris_Cikis
    (Arac_ID,Giris_Tarih,Teslim_Eden_Ad, Teslim_Eden_Tc,Teslim_Eden_Gsm,Teslim_Alan_Personel_ID,Cikis_Tarih) 
    VALUES('${plakaId}','${alinantarih}','${teslimedenad}','${teslimedentc}','${teslimedengsm}','${personel}','${Cikis_Tarih}')`, 
    (data) => {
        res.send(data);
    });
})
router.post('/randevu', function (req, res, next) {
    var randevutarih = req.body.randevutarih;
    var isim = req.body.isim;
    var gsm = req.body.gsm;
    SqlQuery(`INSERT INTO tb_Randevu(Tarih_Saat,İsim,GSM) VALUES('${randevutarih}','${isim}','${gsm}')`, 
    (data) => {
        res.send(data);
    });
})
router.post('/stokgiris', function (req, res, next) {
    var stokKodu = req.body.stokKodu;
    var barkodNo = req.body.barkodNo;
    var stokAdi = req.body.stokAdi;
    var stokAdedi = req.body.stokAdedi;
    var alimFiyat = req.body.alimFiyat;
    var tedarikciAdi = req.body.tedarikciAdi;
    var satisFiyat = req.body.satisFiyat;

    SqlQuery(`INSERT INTO tb_Stok(Stok_Kodu,Barkod_No,Stok_Adi,Stok_Adet,Alim_Fiyat,Tedarikci_Adi,Satis_Fiyat)
     VALUES('${stokKodu}','${barkodNo}','${stokAdi}','${stokAdedi}','${alimFiyat}','${tedarikciAdi}','${satisFiyat}')`, 
    (data) => {
        res.send(data);
    });
})

router.post('/aracbilgisipost', function (req, res, next) {
    var plakaId = req.body.PLAKA_ID;

    SqlQuery(`select 
	Model_yil,
	Sase_No,
	Motor_No,
	Arac_KM,
    Tr_Cikis_Tarih,
	Arac_Cinsi_ID, 
    Arac_Marka,
	Arac_Model,
	Yakit_Tur_ID,
	Ad,
	Gsm,
	Vergi_No,
	Vergi_Dairesi,
	Adres
    from tb_Arac_Karti
    inner join tb_Cari
    on tb_Arac_Karti.Cari_ID = tb_Cari.ID 
    Where tb_Arac_Karti.ID = '${plakaId}'`, (data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    });
});

router.post('/teslim', function (req, res, next) {
    var teslimedenpersonelId= req.body.teslimedenpersonelId;
    var teslimalanad= req.body.teslimalanad;
    var teslimalangsm= req.body.teslimalangsm;
    var teslimalantc= req.body.teslimalantc;
    var plaka = req.body.plaka;
    var teslimtarihi = req.body.teslimtarihi;
    var musteriTalep = req.body.musteriTalep; //2
    var satilanParcalar = req.body.takilanParcalar; //1
    var toplam = req.body.toplam; //1

//update
SqlQuery(`UPDATE tb_Arac_Giris_Cikis SET 
Teslim_Eden_Personel_ID='${teslimedenpersonelId}',Teslim_Alan_Ad='${teslimalanad}',
Teslim_Alan_Gsm='${teslimalangsm}',Teslim_Alan_Tc='${teslimalantc}',Cikis_Tarih='${teslimtarihi}' WHERE Arac_ID='${plaka}'`, (data) => {
        SqlQuery(`insert into tb_Satis(Plaka_ID,Tarih,Genel_Toplam,Kdv_Tutar,Kdv_Oran) OUTPUT Inserted.ID values ('${plaka}','${teslimtarihi}','${toplam.genelToplam}','${toplam.kdvTutari}','${toplam.kdv}')`, (data) => {
            let sonSatisId = data.recordsets[0][0].ID;

            musteriTalep.map((data) => {
                let talep = data.value;
                let queryString = `insert into tb_Musteri_Talep(Musteri_Talep,Satis__ID) values ('${talep}','${sonSatisId}')`;
                SqlQuery(queryString, (data) => {
                    
                })
            })
            
            satilanParcalar.map((data) => {
                let takilanParcaId = data.takilanParcaId;
                let birimFiyat = data.birimFiyat;
                let adet = data.adet;
                let iscilikCheck = data.iscilikCheck;

                let queryString = `insert into tb_Satilan_Parca(Stok_ID,Birim_Fiyat_ID,Adet,Iscilikcheck,Satis_ID) values ('${takilanParcaId}','${birimFiyat}','${adet}','${iscilikCheck}','${sonSatisId}')`;
                SqlQuery(queryString, (data) => {
                    
                })
            })
            res.send({
                status: 'success'
            })

        })
    })
})

//#region Personel Trans
router.post('/personelGuncelle', function(req,res,next) {
    var { personelId, personelAd, personelAdres, gsm , tc } = req.body;
    SqlQuery(`UPDATE tb_Personel SET Ad = '${personelAd}', Gsm = '${gsm}', TC = '${tc}', Adres = '${personelAdres}' WHERE ID = ${personelId}`, (data) => {
        res.send({
            status: 'success'
        })
    })
})

router.post('/personelSil', function(req, res, next) {
    var ids = req.body.ids;
    ids.map((id) => {
        let intId = parseInt(id);
        SqlQuery(`UPDATE tb_Personel SET Aktif = 0 WHERE ID = ${intId}`, (data) => { })
    })
    
    res.send({
        status: 'success'
    })
})

////#endregion
//#region cari Trans
router.post('/cariGuncelle', function(req,res,next) {
    var { id, cariAdi, Gsm, Tc,cariAdres,cariVergiNo, cariVergiDairesi , cariTur } = req.body;
    SqlQuery(`UPDATE tb_Cari SET Ad = '${cariAdi}', Gsm = '${Gsm}', Tc = '${Tc}', Vergi_No = '${cariVergiNo}', Vergi_Dairesi = '${cariVergiDairesi}', Adres = '${cariAdres}', Cari_Tur = '${cariTur}' WHERE ID = ${id}`, (data) => {
        res.send({
            status: 'success'
        })
    })
})

router.post('/cariSil', function(req, res, next) {
    var ids = req.body.ids;
    ids.map((id) => {
        let intId = parseInt(id);
        SqlQuery(`UPDATE tb_Cari SET Aktif = 0 WHERE ID = ${intId}`, (data) => { })
    })
    
    res.send({
        status: 'success'
    })
})

////#endregion
//#region Randevu Trans
router.post('/randevuGuncelle', function(req,res,next) {
    var { randevutarih, isim, gsm, id, } = req.body;
    SqlQuery(`UPDATE tb_Randevu SET Tarih_Saat = '${randevutarih}', İsim = '${isim}', GSM = '${gsm}' WHERE ID = ${id} `, (data) => {
        res.send({
            status: 'success'
        })
    })
})

router.post('/randevuSil', function(req, res, next) {
    var ids = req.body.ids;
    ids.map((id) => {
        let intId = parseInt(id);
        SqlQuery(`UPDATE tb_Randevu SET Aktif = 0 WHERE ID = ${intId}`, (data) => { })
    })
    
    res.send({
        status: 'success'
    })
})

////#endregion


router.post('/yenikayit', function (req, res, next) {
    var teslimedenpersonelId= req.body.teslimedenpersonelId;
    var teslimalanad= req.body.teslimalanad;
    var teslimalangsm= req.body.teslimalangsm;
    var teslimalantc= req.body.teslimalantc;
    var plaka = req.body.plaka;
    var araccinsid= req.body.araccinsid;
    var yakitturid=req.body.yakitturid;
    var marka=req.body.marka;
    var model=req.body.model;
    var modelyil=req.body.modelyil;
    var saseno=req.body.saseno;
    var motorno=req.body.motorno;
    var arackm=req.body.arackm;
    var trafikCikisTarih=req.body.trafikCikisTarih;
    var teslimtarihi = req.body.teslimtarihi;

    var musteriTalep = req.body.musteriTalep;
    var takilanParcalar = req.body.takilanParcalar;
    var toplam = req.body.toplam;

    SqlQuery(`insert into tb_Arac_Giris_Cikis(Teslim_Eden_Personel_ID,Teslim_Alan_Ad,Teslim_Alan_Gsm,Teslim_Alan_Tc,Arac_ID,) values ('${teslimedenpersonelId}','${teslimalanad}','${teslimalangsm}','${teslimalantc}','${plaka}')`, (data) => {
        SqlQuery(`UPDATE tb_Arac_Karti SET Arac_Cinsi_ID = '${araccinsid}', Yakit_Tur_ID = '${yakitturid}', Arac_Marka = '${marka}', Arac_Model = '${model}', Model_Yil = '${modelyil}', Sase_No = '${saseno}', Motor_No = '${motorno}', Arac_KM = '${arackm}', Tr_Cikis_Tarih = '${trafikCikisTarih}', Cikis_Tarih = '${teslimtarihi}' WHERE ID = ${plaka}`, (data) => {
            res.send({
                status: 'success'
            });
        })
    })
})

router.post('/musteribilgisipost', function (req, res, next) {
    var plakaId = req.body.PLAKA_ID;
    SqlQuery(`select Ad, Gsm,Vergi_No, Vergi_Dairesi,Adres from tb_Cari where ID = '${musteriId}'`, (data) => {
      
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    });
});


router.post('/carikayit', function (req, res, next) {
    const {aracPlaka,cariAdi,cariGsm, cariTc, cariAdres, cariVergiNo, cariVergiDairesi, cariTur} = req.body;

    SqlQuery(`IF EXISTS (SELECT * FROM tb_Arac_Karti WHERE PLAKA = '${aracPlaka}') 
    BEGIN SELECT 1 as Error  END ELSE BEGIN IF EXISTS (SELECT ID FROM tb_Cari WHERE Tc = '${cariTc}') 
    BEGIN insert into tb_Arac_Karti(Plaka) values ('${aracPlaka}') DECLARE @ARAC_ID int = (SELECT ID FROM tb_Arac_Karti WHERE Plaka = '${aracPlaka}') SELECT 2 as Message  END ELSE BEGIN insert into tb_Arac_Karti(Plaka) values ('${aracPlaka}')
    DECLARE @ARAC_ID2 int = (SELECT ID FROM tb_Arac_Karti WHERE Plaka = '${aracPlaka}') 
    insert into tb_Cari(Tc,Arac_ID,Ad,Gsm,Adres,Vergi_No,Vergi_Dairesi,Cari_Tur)
 values ('${cariTc}',@ARAC_ID2,'${cariAdi}','${cariGsm}','${cariAdres}','${cariVergiNo}','${cariVergiDairesi}','${cariTur}') SELECT 3 as Message  END END`,(data) => {
        res.send({
            status: 'success',
            data: data.recordsets[0]
        });
    })
});
router.post('/personelkayit', function (req,res,next){

    const {personelTc,personelAd,personelGsm, personelAdres} = req.body;

SqlQuery(`IF EXISTS (SELECT * FROM tb_Personel WHERE TC = '${personelTc}') 
BEGIN SELECT 1 as Error END ELSE BEGIN insert into tb_Personel(TC,Ad,Gsm,Adres) values ('${personelTc}','${personelAd}','${personelGsm}','${personelAdres}')	DECLARE @pers int = (SELECT ID FROM tb_Personel WHERE TC = '${personelTc}')	SELECT 2 as Message END`, (data) =>{
res.send({
    status: 'success',
    data: data.recordsets[0]
})
})
});


//////
router.put('/guncelle', function (req, res, next) {
    var plaka = req.body.plaka;
    var yeniPlaka = req.body.yeniPlaka;
    SqlQuery(`UPDATE tablename SET PLAKA = '${yeniPlaka}' WHERE PLAKA = '${plaka}'`, (data) => {
        res.send(data);
    });

})
////
router.delete('/sil', function (req, res, next) {
    var plaka = req.body.plaka;
    SqlQuery(`DELETE FROM table name WHERE PLAKA = '${plaka}'`, (data) => {
        res.send(data);
    });
})
////
module.exports = router;