import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    const [customInputValue, setCustomInputValue] = React.useState('+90 ');
    const [customInputTC, setCustomInputTC] = React.useState('');

    const [Tedarikci, setTedarikci] = useState([]);
useEffect(() => {
  axios.get(API_URL + '/arac/tedarikci').then((resp) => {
    setTedarikci(resp.data.data);
  }).catch((err) => {
    console.log("Axios GET Error --> ", err)
  })
}, [])


const [stokgiris, setStokgiris] = useState({
    stokKodu:'',
    barkodNo:'',
    stokAdi:'',
    stokAdedi:'',
    alimFiyat:'',
    tedarikciAdi:'',
    satisFiyat:'',
  })

  const handleSave = () => {
    axios.post(API_URL + '/arac/stokgiris', {...stokgiris}).then((resp) => {
      console.log(resp.data);
      //props.setOpen(false)
    }).catch((error) => {
      console.log("Axios Error: ", error);
    })
    props.setOpen(false)
  }

const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div>
            <Dialog
                maxWidth={true}
                open={props.open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle align="center" id="responsive-dialog-title">{<b>Stok Kayit</b>}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <Grid container justify="center">
                            <Grid item xs={3}>
                                <TextField
                                    id="stokkod"
                                    label="Stok Kodu"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={(e) => setStokgiris({...stokgiris, stokKodu: e.target.value})}
                                    value={stokgiris.stokKodu}
                                    className={classes.textFieldTheme}
                                />
                                <TextField
                                    id="barkod"
                                    label="Barkod No"
                                    variant="outlined"
                                    onChange={(e) => setStokgiris({...stokgiris, barkodNo: e.target.value})}
                                    value={stokgiris.barkodNo}
                                    color="secondary"
                                    className={classes.textFieldTheme}
                                />
                                <TextField
                                    id="stokadi"
                                    label="Stok Adi"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={(e) => setStokgiris({...stokgiris, stokAdi: e.target.value})}
                                    value={stokgiris.stokAdi}
                                    className={classes.textFieldTheme}
                                />
                                <TextField
                                    id="stokadedi"
                                    label="Stok Adedi"
                                    type="number"
                                    variant="outlined"
                                    onChange={(e) => setStokgiris({...stokgiris, stokAdedi: e.target.value})}
                                    value={stokgiris.stokAdedi}
                                    color="secondary"
                                    className={classes.textFieldTheme}
                                />


                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="alimfiyat"
                                    label="Alım Fiyat (₺)"
                                    type="number"
                                    variant="outlined"
                                    onChange={(e) => setStokgiris({...stokgiris, alimFiyat: e.target.value})}
                                    value={stokgiris.alimFiyat}
                                    color="secondary"
                                    className={classes.textFieldTheme}
                                />
                                <Autocomplete
                                    id="tedarikci"
                                    options={Tedarikci}
                                    getOptionLabel={(option) => option.AD}
                                    className={classes.textFieldTheme}
                                    onChange={(event, option) => {
                                        if (option !== null) {
                                            setStokgiris({ ...stokgiris, tedarikciAdi: option.AD })
                                        }
                                        else {
                                            setStokgiris({ ...stokgiris, tedarikciAdi: 0 })
                                        }
                                      }}
                                    renderInput={(params) => <TextField  {...params} label="Tedarikçi Adı " variant="outlined" />}
                                />
                                <TextField
                                    id="satisfiyat"
                                    label="Satış Fiyat (₺)"
                                    type="number"
                                    onChange={(e) => setStokgiris({...stokgiris, satisFiyat: e.target.value})}
                                    value={stokgiris.satisFiyat}
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.textFieldTheme}
                                />
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => props.setOpen(false)} color="primary">
                        İPTAL </Button>
                    <Button onClick={handleSave} color="primary" autoFocus>
                        KAYDET </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
