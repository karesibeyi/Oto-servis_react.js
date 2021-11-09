import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputPhone from '../InputPhone';
import InputTC from '../InputTC';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { API_URL } from '../constants';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';



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
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = useState(null);
  const [customInputGsm, setCustomInputGsm] = React.useState('+90 ');
  const [currency, setCurrency] = React.useState('musteri');
  const [customInputTC, setCustomInputTC] = React.useState('');
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });



  const [cariData, setCariData] = useState({
    cariAdi: '',
    cariGsm: '',
    cariTc: customInputTC || '',
    cariAdres: '',
    cariVergiNo: '',
    cariVergiDairesi: '',
    cariTur: false, /* False: Müşteri, True: Tedarikçi */
    aracPlaka: '',
  })
  useEffect(() => {
    if (props.cariData != null) {
      setCariData({
        id: props.cariData.id || '',
        cariAdi: props.cariData.Ad || '',
        cariAdres: props.cariData.Adres || '',
        cariVergiDairesi: props.cariData.Vergi_Dairesi || '',
        cariVergiNo: props.cariData.Vergi_No || '',
        cariTur: props.cariData.Cari_Tur || '',
      });
      setCustomInputGsm(props.cariData.Gsm)
      setCustomInputTC(props.cariData.Tc)
    }
  }, [props.cariData, setCariData])

  const handleSave = () => {
    axios.post(API_URL + '/arac/carikayit', { ...cariData }).then((resp) => {
      //API'den gelen hata kodlarına göre if yapısıyla farklı hata mesajları gösterilecek!

      console.log(resp.data);

      //props.setOpen(false)
    }).catch((error) => {
      console.log("Axios Error: ", error);
    })
    props.setOpen(false)
  }

  const handleUpdate = () => {
    axios.post(API_URL + '/arac/cariGuncelle', { ...cariData, Gsm: customInputGsm, Tc: customInputTC, }).then((resp) => {
      if (resp.data.status == 'success') {
        props.setOpen(false);
        props.refreshData();
      } else {
        console.log("API Error: 'cariGuncelle' error");
      }

    }).catch((error) => {
      console.log("Axios Error: ", error);
    })
  }


  return (
    <div>
      <Dialog
        maxWidth={true}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle align="center" style={{ marginLeft: '-80px' }} id="responsive-dialog-title">{<b>Cari Kayit</b>}</DialogTitle>
        <DialogContent>
          <DialogContentText>

            <Grid container justify="center">
              <Grid item xs={3}  >
                <TextField
                  id="cariadi"
                  label="Cari Adı"
                  value={cariData.cariAdi}
                  onChange={(e) => setCariData({ ...cariData, cariAdi: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <InputPhone
                  className={classes.textFieldTheme}
                  label={'Cari Gsm'}
                  onChange={(e) => { setCustomInputGsm(e); setCariData({ ...cariData, cariGsm: e }) }}
                  value={customInputGsm}
                />
                <InputTC
                  className={classes.textFieldTheme}
                  label={'Cari TC'}
                  onChange={(e) => { setCustomInputTC(e); setCariData({ ...cariData, cariTc: e }); }}
                  value={customInputTC}
                />

              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="vergino"
                  label="Vergi No"
                  value={cariData.cariVergiNo}
                  onChange={(e) => setCariData({ ...cariData, cariVergiNo: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />
                <TextField
                  id="vergidairesi"
                  label="Vergi Dairesi"
                  value={cariData.cariVergiDairesi}
                  onChange={(e) => setCariData({ ...cariData, cariVergiDairesi: e.target.value })}
                  variant="outlined"
                  color="secondary"
                  className={classes.textFieldTheme}
                />

                <TextField
                  id="CariTur"
                  select
                  label="Cari Tür"
                  value={cariData.cariTur}
                  onChange={(e) => setCariData({ ...cariData, cariTur: e.target.value })}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  className={classes.textFieldTheme}
                >
                  <option key="musteri" value="Müşteri">
                    Müşteri
                    </option>
                  <option key="tedarikci" value="Tedarikçi">
                    Tedarikçi
                    </option>
                </TextField>

              </Grid>
              <Grid container justify="center">
                <Grid item xs={6}>

                  <TextField
                    id="cariadres"
                    label="Cari Adres"
                    variant="outlined"
                    value={cariData.cariAdres}
                    onChange={(e) => setCariData({ ...cariData, cariAdres: e.target.value })}
                    color="secondary"
                    style={{ width: "86%", marginLeft: 7 }}
                  />

                </Grid>
              </Grid>

              <Grid item xs={3} justify="center">

                <TextField
                  id="plaka"
                  /*error*/
                  label="Arac Plaka"
                  variant="outlined"
                  /*helperText="Incorrect entry."*/
                  value={cariData.aracPlaka}
                  onChange={(e) => setCariData({ ...cariData, aracPlaka: e.target.value })}
                  color="secondary"
                  className={classes.textFieldTheme}
                />
              </Grid>
            </Grid>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={() => { 
                        props.setOpen(false);
                        setCariData({
                            cariAdi: '' ,
                            cariAdres: '',
                            cariTur: '',
                            cariVergiDairesi: '',
                            cariVergiNo: '',
                            
                        })
                        setCustomInputGsm('+90 ')
                        setCustomInputTC('')
                    }} color="primary">
                        İPTAL
                    </Button>
          {
            props.cariData ? (
              <Button onClick={() => handleUpdate()} color="primary" autoFocus>
                Güncelle
              </Button>
            ) : (
              <Button onClick={() => handleSave()} color="primary" autoFocus>
                KAYDET
              </Button>
            )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}