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
import InputTC from '../InputTC';
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

export default function PersonelKayitModal(props) {
    const classes = useStyles();
    const [customInputGsm, setCustomInputGsm] = React.useState('+90 ');
    const [customInputTC, setCustomInputTC] = React.useState('');


    const [personelData, setpersonelData] = useState({
        personelAd: '' ,
        personelGsm: '',
        personelTc: customInputTC || '',
        personelAdres: '',
    })

    useEffect(() => {
        if(props.personelData != null) {
            setpersonelData({
                personelId: props.personelData.id || '',
                personelAd: props.personelData.ad  || '',
                personelAdres: props.personelData.adres || '',
            });
            setCustomInputGsm(props.personelData.gsm)
            setCustomInputTC(props.personelData.tc)
        }
    }, [props.personelData,setpersonelData])

    const handleSave = () => {
        axios.post(API_URL + '/arac/personelkayit', { ...personelData }).then((resp) => {
            //API'den gelen hata kodlarına göre if yapısıyla farklı hata mesajları gösterilecek!

            console.log(resp.data);

            //props.setOpen(false)
        }).catch((error) => {
            console.log("Axios Error: ", error);
        })
        props.setOpen(false)
    }

    const handleUpdate = () => {
        axios.post(API_URL + '/arac/personelGuncelle', {...personelData, gsm: customInputGsm, tc: customInputTC }).then((resp) => {
            if(resp.data.status == 'success') {
                props.setOpen(false);
                props.refreshData();
            }else{
                console.log("API Error: 'personel Guncelle' error");
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
                <DialogTitle align="center" id="responsive-dialog-title">{<b>Personel Kayit</b>}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="personelad"
                                    label="Personel Adı"
                                    value={personelData.personelAd}
                                    onChange={(e) => setpersonelData({ ...personelData, personelAd: e.target.value })}
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.textFieldTheme}
                                />
                                <InputPhone className={classes.textFieldTheme}
                                    label={'Personel Gsm'}
                                    onChange={(e) => { setCustomInputGsm(e); setpersonelData({ ...personelData, personelGsm: e }) }}
                                    value={customInputGsm} />

                                <InputTC className={classes.textFieldTheme} label={'Personel TC'}
                                    onChange={(e) => { setCustomInputTC(e); setpersonelData({ ...personelData, personelTc: e }); }}
                                    value={customInputTC} />

                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="Personeladres"
                                    label="Personel Adres"
                                    variant="outlined"
                                    value={personelData.personelAdres}
                                    onChange={(e) => setpersonelData({ ...personelData, personelAdres: e.target.value })}
                                    color="secondary"
                                    style={{ width: "98.1%" }}
                                    className={classes.textFieldTheme}
                                />
                            </Grid>

                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { 
                        props.setOpen(false);
                        setpersonelData({
                            personelAd: '' ,
                            personelAdres: '',
                        })
                        setCustomInputGsm('+90 ')
                        setCustomInputTC('')
                    }} color="primary">
                        İPTAL
                    </Button>
                    {
                        props.personelData ? (
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
