import React, { Component, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputPhone from '../InputPhone';
import { Form } from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { API_URL } from '../constants';
import InputTC from '../InputTC';

const ref = React.createRef();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,

  },
  textFieldTheme: {
    margin: theme.spacing(1),
    width: '30ch',
    height: '7ch',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const classes = useStyles();
  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };

  const [{ currency, currency2 }, setCurrency] = React.useState('');



  const GetCustomDateTime = () => {
    var date  = new Date();
    let month = (parseInt(date.getMonth()) + 1).toString().length === 1 ? '0' + (parseInt(date.getMonth()) + 1).toString() : (parseInt(date.getMonth()) + 1)
    let day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString(); 
    let hours = date.getHours().toString().length === 1 ?  '0' + date.getHours() : date.getHours() ;
    let min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    let dateString = date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + min;
    console.log(dateString);
    return  dateString;
  }

  const [newRowCount, setNewRowCount] = React.useState([{ id: 1, value: '' }]);
  const [newFormCount, setNewFormCount] = React.useState([{ takilanParcaId: 0, birimFiyat: '', adet: 1, iscilikCheck: false }])
  const [prevData, setPrevData] = React.useState({ parcaToplami: '', iscilikBedeli: 0, kdv: 0.18, kdvTutari: 0, genelToplam: 0 })
  const [aracBilgisi, setAracBilgisi] = React.useState({
    marka: '',
    model: '',
    modelyil: '',
    saseno: '',
    motorno: '',
    arackm: '',
    adres: '',
    musteriAdi: '',
    musteriGsm: '',
    vergidairesi: '',
    vergino: '',
    araccinsid: 0,
    teslimalanad: '',
    teslimalangsm: '',
    teslimalantc: '',
    yakitturid: 0,
    trafikCikisTarih: GetCustomDateTime(),
    teslimtarihi: GetCustomDateTime(),
    plaka: 0,
  });

  const [sOptions, setSOptions] = React.useState({ options1: 0, options2: 0, options3: 0, options4: 0 });

  const handleNewRow = () => {
    let tempField = { id: newRowCount.length + 1, value: '' };
    setNewRowCount([...newRowCount, tempField]);
  }

  const handleNewForm = () => {
    let tempNewForm = { birimFiyat: '', adet: 1, iscilikCheck: false };
    setNewFormCount([...newFormCount, tempNewForm]);

  }

  const handleRemoveRow = (index) => {
    let tempField = [];
    newRowCount.map((data, i) => {
      if (i !== index) {
        tempField.push(data);
      }
    })

    setNewRowCount([...tempField])

  }

  const handleTempFieldValue = (event, id) => {
    let tempField = []
    newRowCount.map((data) => {
      if (data.id !== id) {
        tempField.push(data);
      }
      else {
        tempField.push({
          id: id,
          value: event.target.value
        });
      }
    })
    setNewRowCount([...tempField,]);
  }

  const handleFormField = (takilanParcaEvent, takilanParcaOption, birimFiyatEvent, adetEvent, iscilik, index) => {
    let tempField = newFormCount;

    if (takilanParcaEvent !== null) {
      tempField[index] = { ...newFormCount[index], takilanParcaId: takilanParcaOption !== null ? takilanParcaOption.ID : 0 }
    }

    if (birimFiyatEvent !== null) {
      tempField[index] = { ...newFormCount[index], birimFiyat: birimFiyatEvent.target.value }
    }

    if (adetEvent !== null) {
      tempField[index] = { ...newFormCount[index], adet: adetEvent.target.value }
    }

    if (iscilik !== null) {
      tempField[index] = { ...newFormCount[index], iscilikCheck: iscilik }
    }
    setNewFormCount([...tempField])

  }

  const handleRemoveForm = (index) => {
    let tempForm = [];
    newFormCount.map((data, i) => {
      if (i !== index) {
        tempForm.push(data);

      }
    })

    setNewFormCount([...tempForm])

  }

  const _prevData = () => {
    let parcaFiyati = 0;
    newFormCount.map((form, index) => {
      parcaFiyati += (form.birimFiyat * form.adet)
    })

    let tmpKdvTutari = ((parseFloat(parcaFiyati) + parseFloat(prevData.iscilikBedeli)) * parseFloat(prevData.kdv)).toFixed(2);
    let tmpGenelToplam = (parseFloat(parcaFiyati) + parseFloat(prevData.iscilikBedeli) + parseFloat(tmpKdvTutari)).toFixed(2);
    setPrevData({ ...prevData, parcaToplami: parcaFiyati, kdvTutari: tmpKdvTutari, genelToplam: tmpGenelToplam })
  }


  useEffect(() => {
    _prevData();
  }, [newFormCount])

  const handleKdvChange = (kdvc) => {
    let tmpKdvTutari = ((parseFloat(prevData.parcaToplami) + parseFloat(prevData.iscilikBedeli)) * parseFloat(kdvc)).toFixed(2);
    let tmpGenelToplam = (parseFloat(prevData.parcaToplami) + parseFloat(prevData.iscilikBedeli) + parseFloat(tmpKdvTutari)).toFixed(2);
    setPrevData({ ...prevData, kdv: kdvc, kdvTutari: tmpKdvTutari, genelToplam: tmpGenelToplam })

  }

  const handleIscilikBedeliChange = (e) => {
    let tmpKdvTutari = ((parseFloat(prevData.parcaToplami) + parseFloat(e.target.value)) * parseFloat(prevData.kdv)).toFixed(2);
    let tmpGenelToplam = (parseFloat(prevData.parcaToplami) + parseFloat(e.target.value) + parseFloat(tmpKdvTutari)).toFixed(2);

    setPrevData({ ...prevData, iscilikBedeli: e.target.value, kdvTutari: tmpKdvTutari, genelToplam: tmpGenelToplam })
  }
  const [isOk, setIsOk] = React.useState(false);
  const [customInputTC, setCustomInputTC] = React.useState('');
  const [customInputValue, setCustomInputValue] = React.useState('+90 ');
  const handleSaveModal = () => {
    if (isOk) {
      axios.post(API_URL + '/arac/teslim', {
        teslimedenpersonelId: aracBilgisi.teslimedenpersonelId,
        teslimalanad: aracBilgisi.teslimalanad,
        teslimalangsm: aracBilgisi.teslimalangsm,
        teslimalantc: aracBilgisi.teslimalantc,
        teslimtarihi: aracBilgisi.teslimtarihi,
        plaka: aracBilgisi.plaka,

        musteriTalep: newRowCount,
        takilanParcalar: newFormCount,
        toplam: prevData
      }).then((resp) => {

        console.log(resp.data);
        setAracBilgisi({
          marka: '',
          model: '',
          modelyil: '',
          saseno: '',
          motorno: '',
          arackm: '',
          adres: '',
          musteriAdi: '',
          musteriGsm: '',
          vergidairesi: '',
          vergino: '',
          araccinsid: 0,
          teslimedenpersonelId: '',
          teslimalanad: '',
          teslimalangsm: '',
          teslimalantc: '',
          yakitturid: 0,
          trafikCikisTarih: GetCustomDateTime(),
          teslimtarihi: GetCustomDateTime(),
          plaka: 0,
        })

      }).catch((err) => {
        setDataWait(false);
        console.log("Axios GET Error --> ", err)
      })
    }
    else {
      axios.post(API_URL + '/arac/yenikayit', {
        teslimedenpersonelId: aracBilgisi.teslimedenpersonelId,
        teslimalanad: aracBilgisi.teslimalanad,
        teslimalangsm: aracBilgisi.teslimalangsm,
        teslimtarihi: aracBilgisi.teslimtarihi,
        teslimalantc: aracBilgisi.teslimalantc,
        plaka: aracBilgisi.plaka,
        araccinsid: aracBilgisi.araccinsid.ID,
        yakitturid: aracBilgisi.yakitturid.ID,
        marka: aracBilgisi.marka,
        model: aracBilgisi.model,
        modelyil: aracBilgisi.modelyil,
        saseno: aracBilgisi.saseno,
        motorno: aracBilgisi.motorno,
        arackm: aracBilgisi.arackm,
        trafikCikisTarih: aracBilgisi.trafikCikisTarih,
        musteriTalep: newRowCount,
        takilanParcalar: newFormCount,
        toplam: prevData
      }).then((resp) => {

        setAracBilgisi({
          marka: '',
          model: '',
          modelyil: '',
          saseno: '',
          motorno: '',
          arackm: '',
          adres: '',
          musteriAdi: '',
          musteriGsm: '',
          vergidairesi: '',
          vergino: '',
          araccinsid: 0,
          teslimalanad: '',
          teslimalangsm: '',
          teslimalantc: '',
          yakitturid: 0,
          trafikCikisTarih: GetCustomDateTime(),
          teslimtarihi: GetCustomDateTime(),
          plaka: 0,
        })


      }).catch((err) => {
        setDataWait(false);
        console.log("Axios GET Error --> ", err)
      })
    }

props.setOpen(false);

  }

  const [dataWait, setDataWait] = React.useState(false);


  const handlePlakaChange = (option) => {
    if (option !== null) {
      setAracBilgisi({ ...aracBilgisi, plaka: option.ID })

      setDataWait(true);
      ///
      axios.post(API_URL + '/arac/aracbilgisipost', { PLAKA_ID: option.ID }, {/*timeout: 10*/ }).then((resp) => {
        let tempData = resp.data.data[0];
        setIsOk(tempData.Arac_Marka !== null ? true : false);

        setDataWait(false);
        setAracBilgisi({
          ...aracBilgisi,
          plaka: parseInt(option.ID),
          marka: tempData.Arac_Marka || '',
          model: tempData.Arac_Model || '',
          modelyil: tempData.Model_yil || '',
          saseno: tempData.Sase_No || '',
          motorno: tempData.Motor_No || '',
          arackm: tempData.Arac_KM || '',
          trafikCikisTarih: tempData.Tr_Cikis_Tarih || aracBilgisi.trafikCikisTarih,
          musteriAdi: tempData.Ad || '',
          musteriGsm: tempData.Gsm || '',
          adres: tempData.Adres || '',
          vergidairesi: tempData.Vergi_Dairesi || '',
          vergino: tempData.Vergi_No || '',
          araccinsid: props.araccins[parseInt(tempData.Arac_Cinsi_ID) - 1],
          yakitturid: props.aracyakittur[parseInt(tempData.Yakit_Tur_ID) - 1]
        })

      }).catch((err) => {
        setDataWait(false);
        console.log("Axios GET Error --> ", err)
      })
    }
    else {
      setAracBilgisi({
        marka: '',
        model: '',
        modelyil: '',
        saseno: '',
        motorno: '',
        arackm: '',
        adres: '',
        musteriAdi: '',
        musteriGsm: '',
        vergidairesi: '',
        vergino: '',
        araccinsid: 0,
        yakitturid: 0,
        teslimedenpersonelId: 0,
        teslimalanad: '',
        teslimalangsm: '',
        teslimalantc: '',
        trafikCikisTarih: GetCustomDateTime(),
        teslimtarihi: GetCustomDateTime(),
        plaka: 0,
      })

      setSOptions({ options1: '', options2: '', options3: '', options4: '' });
    }
  }


  ///
  return (
    <div>
      <Dialog
        maxWidth={true}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle align="center" id="responsive-dialog-title">{<b>Oto Servis İş Emri Formu</b>}</DialogTitle>
        <DialogContent ref={ref}>
          <DialogContentText>
            <Grid container>

              <Grid item xs={3}  >


                <Autocomplete
                  id="plaka"
                  options={props.aracKarti}
                  getOptionLabel={(option) => option.Plaka}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => handlePlakaChange(option)}
                  renderInput={(params) => <TextField  {...params} label="Plaka " variant="outlined" />}
                />
                <Autocomplete
                  id="cinsi"
                  disabled={dataWait}
                  options={props.araccins}
                  value={aracBilgisi.araccinsid}
                  getOptionLabel={(option) => option.Ad}
                  onChange={(event, option) => {
                    if (option !== null) {
                      setAracBilgisi({ ...aracBilgisi, araccinsid: props.araccins[parseInt(option.ID) - 1] })
                    }
                    else {
                      setAracBilgisi({ ...aracBilgisi, araccinsid: 0 })
                    }

                  }}
                  className={classes.textFieldTheme}
                  renderInput={(params) => <TextField  {...params} label="Cinsi" variant="outlined" />}
                />


                <TextField
                  id="marka"
                  label="Marka"
                  disabled={dataWait}
                  variant="outlined"
                  value={aracBilgisi.marka}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, marka: e.target.value })}
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="model"
                  disabled={dataWait}
                  label="Model"
                  value={aracBilgisi.model}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, model: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="modelyil"
                  disabled={dataWait}
                  label="Model Yılı"
                  value={aracBilgisi.modelyil}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, modelyil: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="saseno"
                  label="Şase No"
                  disabled={dataWait}
                  value={aracBilgisi.saseno}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, saseno: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="motorno"
                  label="Motor No"
                  disabled={dataWait}
                  value={aracBilgisi.motorno}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, motorno: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="AracKM"
                  label="Arac KM"
                  disabled={dataWait}
                  type="number"
                  variant="outlined"
                  value={aracBilgisi.arackm}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, arackm: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textFieldTheme}
                />

                <form className={classes.container} noValidate>
                  <TextField
                    id="Trafikcikis"
                    label="Trafige Cikis Tarihi"
                    disabled={dataWait}
                    variant="outlined"
                    type="datetime-local"
                    defaultValue={aracBilgisi.trafikCikisTarih}
                    value={aracBilgisi.trafikCikisTarih}
                    onChange={(e) => {
                      setAracBilgisi({ ...aracBilgisi, trafikCikisTarih: e.target.value })
                    }}
                    className={classes.textFieldTheme}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <Autocomplete
                  id="yakittur"
                  disabled={dataWait}
                  value={aracBilgisi.yakitturid}
                  options={props.aracyakittur}
                  getOptionLabel={(option) => option.Ad}
                  onChange={(event, option) => {
                    if (option !== null) {
                      setAracBilgisi({ ...aracBilgisi, yakitturid: props.aracyakittur[parseInt(option.ID) - 1] })
                    }
                    else {
                      setAracBilgisi({ ...aracBilgisi, yakitturid: 0 })
                    }

                  }}
                  className={classes.textFieldTheme}
                  renderInput={(params) => <TextField  {...params} label="Yakıt Türü" variant="outlined" />}
                />

              </Grid>
              <Grid item xs={3} >
                <TextField
                  id="musteriAdi"
                  label="Müşteri Adı"
                  disabled={dataWait}
                  value={aracBilgisi.musteriAdi}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <TextField
                  id="musteriGsm"
                  label="Müşteri Gsm"
                  disabled={dataWait}
                  value={aracBilgisi.musteriGsm}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, musteriGsm: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="adres"
                  label="Adres"
                  variant="outlined"
                  disabled={dataWait}
                  value={aracBilgisi.adres}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, adres: e.target.value })}
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="vergino"
                  disabled={dataWait}
                  label="Vergi Numarası"
                  variant="outlined"
                  value={aracBilgisi.vergino}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, vergino: e.target.value })}
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <TextField
                  id="vergidairesi"
                  disabled={dataWait}
                  label="Vergi Dairesi"
                  value={aracBilgisi.vergidairesi}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, vergidairesi: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <Autocomplete
                  id="personel"
                  disabled={dataWait}
                  options={props.personelAd}
                  getOptionLabel={(option) => option.Ad}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => {
                    if (option !== null) {
                      setAracBilgisi({ ...aracBilgisi, teslimedenpersonelId: option.ID })
                    }
                    else {
                      setAracBilgisi({ ...aracBilgisi, teslimedenpersonelId: 0 })
                    }

                  }}
                  renderInput={(params) => <TextField  {...params} label="Teslim Eden Personel" variant="outlined" />}
                />
                <TextField
                  id="teslimalanad"
                  label="Teslim Alan Ad"
                  value={aracBilgisi.teslimalanad}
                  onChange={(e) => setAracBilgisi({ ...aracBilgisi, teslimalanad: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <InputTC className={classes.textFieldTheme} label={'Teslim Alan TC'}
                  onChange={(e) => { setCustomInputTC(e); setAracBilgisi({ ...aracBilgisi, teslimalantc: e }); }}
                  value={customInputTC}
                />
                <InputPhone className={classes.textFieldTheme} label={'Teslim Alan Gsm'}
                  onChange={(e) => { setCustomInputValue(e); setAracBilgisi({ ...aracBilgisi, teslimalangsm: e }) }}
                  value={customInputValue} />
              </Grid>

              <Grid item xs={6} >

                {
                  newRowCount.map((data, index) => {
                    return (
                      <>
                        <TextField
                          id="musteritalep"
                          key={index}
                          label="Müşteri Talepleri"
                          variant="outlined"
                          value={data.value}
                          onChange={(e) => handleTempFieldValue(e, data.id)}
                          color="secondary"
                          style={{ width: "80%" }}
                          className={classes.textFieldTheme}
                        />
                        {
                          index === 0 ? (
                            <Tooltip title="Yeni Satır Ekle" placement="top">
                              <Button variant="contained" color="primary" style={{ marginTop: 17 }} onClick={() => handleNewRow()}> + </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Satır Sil" placement="top">
                              <Button variant="contained" color="secondary" style={{ marginTop: 17 }} onClick={() => handleRemoveRow(index)}> - </Button>
                            </Tooltip>
                          )
                        }
                        <br />
                      </>
                    )
                  })
                }


                <Paper style={{ padding: 5, marginTop: "1%", marginBottom: "1%" }}>
                  { //XC 
                    newFormCount.map((data, index) => {
                      return (
                        <Form key={index}>
                          <Grid container>
                            <Grid item xs={5} justify='center'>
                              <Autocomplete
                                id="parca"
                                options={props.stok}
                                getOptionLabel={(option) => option.Stok_Adi}
                                className={classes.textFieldTheme}
                                style={{ width: "255px", textAlign: "left" }}
                                onChange={(e, option) => handleFormField(e, option, null, null, null, index)}
                                renderInput={(params) => <TextField  {...params} label="Parça Adi" variant="outlined" />}
                              />

                            </Grid>
                            <Grid item xs={7}>
                              <TextField
                                id="birimfiyat"
                                label="Birim Fiyat ₺"
                                variant="outlined"
                                type="number"
                                style={{ width: "120px", textAlign: "left", marginLeft: "-20px" }}
                                className={classes.textFieldTheme}
                                color="secondary"
                                value={data.birimFiyat}
                                onChange={(e) => handleFormField(null, null, e, null, null, index)}
                              />
                              <TextField
                                id="adet"
                                label="Adet"
                                type="number"
                                variant="outlined"
                                style={{ width: 100, marginLeft: "1%" }}
                                className={classes.textFieldTheme}
                                color="secondary"
                                value={data.adet}
                                onChange={(e) => handleFormField(null, null, null, e, null, index)}

                              />
                              <FormControl component="fieldset" style={{ width: 80, height: 80 }}>
                                <FormGroup aria-label="position" row >
                                  <FormControlLabel
                                    value="top"
                                    control={<Checkbox color="primary" checked={data.iscilikCheck} onChange={() => handleFormField(null, null, null, null, !data.iscilikCheck, index)} />}
                                    label="İşçilik"
                                    labelPlacement="top"
                                  />
                                </FormGroup>
                              </FormControl>
                              {
                                index === 0 ? (
                                  <Tooltip title="Yeni Satır Ekle" placement="top" >
                                    <Button variant="contained" color="primary" style={{ marginTop: 15, marginLeft: "-3px" }} onClick={() => handleNewForm()}> + </Button>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Satır Sil" placement="top" >
                                    <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={() => handleRemoveForm(index)}> - </Button>
                                  </Tooltip>
                                )
                              }
                            </Grid>
                          </Grid>


                        </Form>
                      )
                    })
                  }
                </Paper>
                <Paper style={{ padding: 10, marginTop: "2%", marginBottom: "1%" }}>
                  <TextField
                    id="parcatoplam"
                    label="Parça Toplamı ₺"
                    value={prevData.parcaToplami}
                    onChange={(e) => setPrevData({ ...prevData, parcaToplami: e.target.value })}
                    type="number"
                    variant="outlined"
                    style={{ width: 120, }}
                    color="secondary"
                  />

                  <TextField
                    id="iscilik"
                    label="İşçilik Bedeli ₺"
                    value={prevData.iscilikBedeli}
                    onChange={(e) => handleIscilikBedeliChange(e)}
                    type="number"
                    variant="outlined"
                    style={{ width: 140, marginLeft: "2%" }}
                    color="secondary"
                  />

                  <TextField
                    id="kdv"
                    select
                    label="KDV Oranı %"
                    style={{ width: 100, marginLeft: "2%" }}
                    value={prevData.kdv}
                    onChange={(e) => handleKdvChange(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"

                  >
                    <option key="1" value="0.01">1</option>
                    <option key="2" value="0.08">8</option>
                    <option key="3" value="0.18">18</option>
                  </TextField>
                  <TextField
                    id="kdvtutar"
                    label="KDV Tutarı ₺"
                    value={prevData.kdvTutari}
                    disabled
                    type="number"
                    variant="outlined"
                    style={{ width: 120, marginLeft: "2%" }}
                    color="secondary"
                  />
                  <TextField
                    id="geneltoplam"
                    value={prevData.genelToplam}
                    disabled
                    label="Genel Toplam ₺"
                    type="number"
                    variant="outlined"
                    style={{ width: 150, marginLeft: "2%" }}
                    color="secondary"
                  />
                </Paper>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={() => {
            setAracBilgisi({
              marka: '',
              model: '',
              modelyil: '',
              saseno: '',
              motorno: '',
              arackm: '',
              adres: '',
              musteriAdi: '',
              musteriGsm: '',
              vergidairesi: '',
              vergino: '',
              araccinsid: 0,
              teslimalanad: '',
              teslimalangsm: '',
              teslimalantc: '',
              yakitturid: 0,
              trafikCikisTarih: GetCustomDateTime(),
              teslimtarihi: GetCustomDateTime(),
              plaka: 0,
            })
            setCustomInputTC('');
            setCustomInputValue('+90 ');
            props.setOpen(false)
          }} color="primary">
            İPTAL
          </Button>
          <Button onClick={() => handleSaveModal()} color="primary" autoFocus>
            KAYDET
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}