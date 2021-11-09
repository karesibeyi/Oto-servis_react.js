import React, { useState,useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputPhone from '../InputPhone';
import axios from 'axios';
import { API_URL } from '../constants';


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

export default function RandevuOlusturModal(props) {
    const classes = useStyles();
    const [customInputGsm, setCustomInputGsm] = React.useState('+90 ');

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

      const [randevuData, setRandevuData] = useState({
        randevutarih: GetCustomDateTime(),
        isim:'',
        gsm:'',
      })

      useEffect(() => {
        if(props.randevuData != null) {
            setRandevuData({
                id : props.randevuData.id || '',
                randevutarih: props.randevuData.Tarih_Saat || '',
                isim: props.randevuData.İsim  || '',
            });
            setCustomInputGsm(props.randevuData.gsm)
        }
    }, [props.randevuData,setRandevuData])

      const handleSave = () => {
        axios.post(API_URL + '/arac/randevu', {...randevuData}).then((resp) => {
          console.log(resp.data);
          props.refreshData();
        }).catch((error) => {
          console.log("Axios Error: ", error);
        })
        props.setOpen(false)
       
      }
      const handleUpdate = () => {
        axios.post(API_URL + '/arac/randevuGuncelle', {...randevuData, gsm: customInputGsm,}).then((resp) => {
            if(resp.data.status == 'success') {
                props.setOpen(false);
                props.refreshData();
            }else{
                console.log("API Error: 'Randevu Guncelle' error");
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
                <DialogTitle align="center" id="responsive-dialog-title">{<b>Randevu Oluştur</b>}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <Grid container justify="center">
                            <Grid item xs={6}>

                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="randevutarih"
                                        label="Randevu Tarihi"
                                        variant="outlined"
                                        type="datetime-local"
                                        defaultValue={randevuData.randevutarih}
                                        value={randevuData.randevutarih}
                                        className={classes.textFieldTheme}
                                        onChange={(e) => {
                                            setRandevuData({ ...randevuData, randevutarih: e.target.value })
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>

                                <TextField
                                    id="isim"
                                    label="İsim"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={(e) => setRandevuData({...randevuData, isim: e.target.value})}
                                    value={randevuData.isim}
                                    className={classes.textFieldTheme}
                                />

                                <InputPhone className={classes.textFieldTheme} label={'Gsm'}
                                 onChange={(e) => { setCustomInputGsm(e); setRandevuData({...randevuData, gsm: e})}}
                                 value={customInputGsm}/>

                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={() => { 
                        props.setOpen(false);
                        setRandevuData({
                            randevutarih: '' ,
                            isim: '' ,
                        })
                        setCustomInputGsm('+90 ')
                    }} color="primary">
                        İPTAL
                    </Button>
                    {
                        props.randevuData ? (
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
    )
}
