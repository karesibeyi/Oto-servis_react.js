import React, { useEffect, useState } from 'react';
import Tablo from '../Tablo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { API_URL } from '../constants';


const TableHeader = ["Fatura No","Fatura Tarihi", "Tutar",  "Cari Adi", "Telefon"]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
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
      marginTop:"0.6%"
    },
  }));

export default function CustomizedTables(props) {
    const classes = useStyles();
    props.setTitle('Fatura');
    const [selectedOption, setSelectedOption] = useState(null);


    const [aracKarti, setAracKarti] = useState([]);
    const [faturalar, setFaturalar] = useState([]);

    useEffect(() => {
      axios.get(API_URL + '/arac/arackayit').then((resp) => {
        setAracKarti(resp.data.data);
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })
      
      axios.get(API_URL + '/arac/faturalar').then((resp) => {
        resp.data.data.map((d,index) => {
            faturalar.push([d.Fatura_ID,d.Tarih,  d.Genel_Toplam + " ₺", d.Ad, d.Gsm ])

        })
        setFaturalar([...faturalar])
        console.log(faturalar.length)
      }).catch((err) => {
        console.log("Axios GET Error --> ", err)
      })

    }, [])
    
    
    return (
        <div>
             <Paper className={classes.paper} style={{padding:1}}>
                <Autocomplete
                  id="plaka"
                  options={aracKarti}
                  getOptionLabel={(option) => option.Plaka}
                  className={classes.textFieldTheme}
                  onChange={(event, option) => {
                    try {
                      setSelectedOption(option["id"])
                    } catch (err) {
                      setSelectedOption(null)
                    }

                  }}
                  renderInput={(params) => <TextField  {...params} label="Plaka " variant="outlined" />}
                />
                </Paper>
             {
                 faturalar.length ?  <Tablo hidden={true} addButton={false} tableHeader={TableHeader} tableRows={faturalar} /> : null
             }
        </div>

    );
}