import React, { Component, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputPhone from '../InputPhone';
import InputTC from '../InputTC';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { API_URL } from '../constants';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
  paper: {
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  },
  absolute: {
    position: 'absolute',
    right: theme.spacing(6),
  },
}));



export default function AlertDialog(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.setOpen(false);
  };
  const [value, setValue] = React.useState(0);
  const [{ currency, currency3,  currency5 }, setCurrency] = React.useState('Mekanik');
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };


  const [customInputValue, setCustomInputValue] = React.useState('+90 ');
  const [customInputTC, setCustomInputTC] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modalPlaka, setModalPlaka] = React.useState('');
  const [cariPlaka, setcariPlaka] = React.useState('');

  const GetCustomDateTime = () => {
    var date  = new Date();
    let month = (parseInt(date.getMonth()) + 1).toString().length === 1 ? '0' + (parseInt(date.getMonth()) + 1).toString() : (parseInt(date.getMonth()) + 1)
    let day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString(); 
    let hours = date.getHours().toString().length === 1 ?  '0' + date.getHours() : date.getHours() 
    let min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    let dateString = date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + min;
    console.log(dateString);
    return  dateString;
  }

  const [aracgirisdata, setAracGirisData] = useState({
    plakaId: '',
    personel: '',
    alinantarih:  GetCustomDateTime(),
    teslimedenad: '',
    teslimedentc: customInputTC || '',
    teslimedengsm: '',
  })

  const handleSave = () => {
    axios.post(API_URL + '/arac/aracgiris', {...aracgirisdata}).then((resp) => {
      console.log(resp.data);
     
    }).catch((error) => {
      console.log("Axios Error: ", error);
    })
    props.setOpen(false);
  }
  
  return (
    <div>
      <Dialog
        maxWidth={true}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper align="center" style={{ marginBottom: "2%" }}>
          <DialogTitle id="alert-dialog-title">{<b>Araç Giriş Kaydı</b>}</DialogTitle>
        </Paper>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Grid container spacing={3} justify="center"  >
              <Grid item xs={2.6}>

                <Paper className={classes.paper} style={{padding:1}}>
                <Autocomplete
                  id="plaka"
                  options={props.aracKarti}
                  getOptionLabel={(option) => option.Plaka}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => { setAracGirisData({...aracgirisdata, plakaId: option !== null ? option.ID : ''}) }}
                  renderInput={(params) => <TextField  {...params} label="Plaka " variant="outlined" />}
                />

                 </Paper>
                 <Paper className={classes.paper}>
                <Autocomplete
                  id="personel"
                  options={props.personel}
                  getOptionLabel={(option) => option.Ad}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => {
                    if(option !== null) { 
                      setAracGirisData({ ...aracgirisdata, personel: option.ID })
                    }
                    else{
                      setAracGirisData({ ...aracgirisdata, personel: 0 })
                    }

                  }}
                  renderInput={(params) => <TextField  {...params} label="Personel " variant="outlined" />}
                />
                </Paper>
                 <Paper className={classes.paper}>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="alinantarih"
                      label="Teslim Al. Tarih-Saat"
                      variant="outlined"
                      type="datetime-local"
                      defaultValue={aracgirisdata.alinantarih}
                      value={aracgirisdata.alinantarih}
                      className={classes.textFieldTheme}
                      onChange={(e) => {
                        setAracGirisData({...aracgirisdata, alinantarih: e.target.value})
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Paper>
               {/* <Paper classname={classes.paper}>
                <Autocomplete
                  id="servistip"
                 // disableCloseOnSelect
                 // multiple
                  options={props.servisTipi}
                  getOptionLabel={(option) => option.Ad}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => {
                    try {
                      setSelectedOption(option["id"])
                    } catch (err) {
                      setSelectedOption(null)
                    }

                  }}
                  renderInput={(params) => <TextField  {...params} label="Servis Tipi " variant="outlined" />}
                />
                </Paper> */}
          
               

              </Grid>

              <Grid item xs={2.6}  >
                
                <Paper className={classes.paper}>
                  <TextField
                    id="teslimedenad"
                    label="Teslim Edenin Adı"
                    onChange={(e) => setAracGirisData({...aracgirisdata, teslimedenad: e.target.value})}
                    value={aracgirisdata.teslimedenad}
                    variant="outlined"
                    color="secondary"
                    className={classes.textFieldTheme}
                  />
                </Paper>

                <Paper className={classes.paper}>
                  <InputTC className={classes.textFieldTheme} label={'Teslim Eden TC'} 
                 onChange={(e) => { setCustomInputTC(e); setAracGirisData({...aracgirisdata, teslimedentc: e});}}
                   value={customInputTC} 
                   />
                </Paper>
                <Paper className={classes.paper}>
                  <InputPhone className={classes.textFieldTheme} label={'Teslim Eden Gsm'} 
                   onChange={(e) => { setCustomInputValue(e); setAracGirisData({...aracgirisdata, teslimedengsm: e})}}
                  value={customInputValue} />
                </Paper>
              </Grid>
            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}