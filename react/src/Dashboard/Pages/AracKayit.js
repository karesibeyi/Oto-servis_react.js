import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ImageGridList from './AracFotolari';
import KalibrasyonBilgileri from './KalibrasyonBilgileri';
import LpgBilgileri from './LpgBilgileri';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import MainPageModal from '../Modals/MainPageModal';
import axios from 'axios';
import { API_URL } from '../constants';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

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




export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [AutoSelectID, setAutoSelectID] = useState(["PlakaID"]);
  props.setTitle('Araç Giriş');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const callBack = (data) => {
    console.log("Callback:", data)
    return true;
  }
  //#region api işlemleri
  const [cariListe, setCariListe] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/cariTurListe').then((resp) => {
      setCariListe(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [servisTipi, setServistipi] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/servisTipi').then((resp) => {
      setServistipi(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [personel, setPersonel] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/personel').then((resp) => {
      setPersonel(resp.data.data);
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
  const [aracKarti, setAracKarti] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/arackayit').then((resp) => {
      setAracKarti(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [KalibrasyonTakograf, setKalibrasyonTakograf] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/kalibrasyontakograf').then((resp) => {
      setKalibrasyonTakograf(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  
  const [kalibrasyonbelgetur, setKalibrasyonBelgeTur] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/kalibrasyonbelgetur').then((resp) => {
      setKalibrasyonBelgeTur(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [lpgcins, setLpgCins] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/lpgcins').then((resp) => {
      setLpgCins(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [lpgtip, setLpgTip] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/lpgtip').then((resp) => {
      setLpgTip(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  const [lpgmarka, setLpgMarka] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/lpgmarka').then((resp) => {
      setLpgMarka(resp.data.data);
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
  //#region Table Data
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className={classes.root}>

      <Grid container spacing={3} justify="center"  >
        <Grid item xs={6}>
        <Grid container justify="center"  >
          <Grid item >
            <MainPageModal open={open} setOpen={setOpen} cariList={cariListe} cariAd={cariAd} servisTipi={servisTipi} personel={personel} cariAd={cariAd} aracKarti={aracKarti} />
            <Tooltip title="Araç Giriş Kayıt" placement="left" >
              <Fab color="primary" className={classes.absolute} onClick={() => setOpen(true)}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
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
      <AppBar position="static" color="default" style={{ marginTop: '2%' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >

          <Tab label="Araç Fotoğrafları" {...a11yProps(0)} />
          <Tab disabled label="Kalibrasyon Bilgileri" {...a11yProps(1)} />
          <Tab disabled label="LPG BİLGİLERİ"{...a11yProps(2)} />
         
        </Tabs>
      </AppBar>


      <TabPanel value={value} index={0}>
        <ImageGridList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <KalibrasyonBilgileri KalibrasyonTakograf={KalibrasyonTakograf} kalibrasyonbelgetur={kalibrasyonbelgetur}  />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LpgBilgileri lpgcins={lpgcins} lpgtip={lpgtip} lpgmarka={lpgmarka} />
      </TabPanel>
    </div>
  );
}