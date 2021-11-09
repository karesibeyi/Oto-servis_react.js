import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import İsEmriModal from '../Modals/IsEmriModal';
import axios from 'axios';
import { API_URL } from '../constants';


const TableHeader = ["Cinsi", "Parça Adi", "Miktar", "Birim Fiyat", "Tutar", "Acıklama", "Tarih"]
const TableRows = [
    [
        "Data1", "Data2", "Data3", "Data4", "Data5", "Data6", "Datetime",
    ]
]
const TableHeader2 = ["Tarih", "Fason Cari Adı","Fason Masraf Adı","Net Fiyat","Açıklama"]
const TableRows2 = [
  [
    "Data1", "Data2", "Data3","Data4","Data5"
  ]
]
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    TextFieldTheme: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Satis(props) {
    const [AutoSelectID, setAutoSelectID] = useState(["Satis"]);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    props.setTitle('Satış & İş Emri');

    const [aracKarti, setAracKarti] = useState([]);
    useEffect(() => {
      axios.get(API_URL + '/arac/arackayit').then((resp) => {
        setAracKarti(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])
    const [aracyakittur, setAracYakitTur] = useState([]);
    useEffect(() => {

      axios.get(API_URL + '/arac/yakittur').then((resp) => {
        setAracYakitTur(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])
    const [araccins, setAracCins] = useState([]);
    useEffect(() => {
      axios.get(API_URL + '/arac/araccins').then((resp) => {
        setAracCins(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])
    const [cariAd, setcariAd] = useState([]);
    useEffect(() => {
      axios.get(API_URL + '/arac/cariAd').then((resp) => {
        setcariAd(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])
    const [personelAd, setPersonelAd] = useState([]);
    useEffect(() => {
      axios.get(API_URL + '/arac/personel', {}).then((resp) => {
        setPersonelAd(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])
    const [stok, setStok] = useState([]);
    useEffect(() => {
      axios.get(API_URL + '/arac/stok').then((resp) => {
        setStok(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
    }, [])

    return (
        <div>
<Grid container  justify="center">
       <Grid item xs={12} sm={11} > </Grid>
          <Grid item  >
            <İsEmriModal open={open} setOpen={setOpen} aracKarti={aracKarti} personelAd={personelAd} aracyakittur={aracyakittur} stok={stok} araccins={araccins} cariAd={cariAd} />
            <Tooltip  title="Yeni İş Emri Oluştur" placement="left" >
              <Fab color="primary" className={classes.absolute} onClick={() => setOpen(true)}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>

           
                <Paper className={classes.paper} style={{backgroundColor:"gray", marginTop: '2%' }}>
                    <Button style={{ width: '100%', height:"100%", color:"white" ,fontFamily:"tahoma"}}><b>SATIŞ YAP</b></Button>
                </Paper>
           
        </div>
    )
}
