import React, { useEffect, useState } from 'react'
import { Typography, withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { API_URL } from '../constants';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,

  },
  grid: {
    marginTop: '1%',
  },
  
}));

const columns = [
  { field: 'Plaka', headerName: "Plaka", width: 100 },
  { field: 'Giris_Tarih', headerName: "Giris Tarihi", width: 160},
  { field: 'Teslim_Eden_Ad', headerName: "Teslim Eden Ad", width: 160 },
  { field: 'Teslim_Eden_Tc', headerName: "Teslim Eden TC", width: 160 },
  { field: 'Teslim_Eden_Gsm', headerName: "Teslim Eden Gsm", width: 175 },
  { field: 'Teslim_Alan_Personel_Ad', headerName: "Teslim Alan Personel", width: 200 },
//  { field: 'servistipi', headerName: " Servis Tipi", width: 250 },
//  { field: 'servisdurumu', headerName: "Servis Durumu", width: 200 },

];


const columns2 = [
  { field: 'Plaka', headerName: "Plaka", width: 100 },
  { field: 'Giris_Tarih', headerName: "Giris Tarihi", width: 160},
  { field: 'Teslim_Eden_Ad', headerName: "Teslim Eden Ad", width: 160 },
  { field: 'Teslim_Eden_Tc', headerName: "Teslim Eden TC", width: 160 },
  { field: 'Teslim_Eden_Gsm', headerName: "Teslim Eden Gsm", width: 175 },
  { field: 'Teslim_Alan_Personel_Ad', headerName: "Teslim Alan Personel", width: 200 },
  { field: 'Teslim_Alan_Ad', headerName: "Teslim Alan Ad", width: 160, },
  { field: 'Teslim_Alan_Tc', headerName: "Teslim Alan TC", width: 160 },
  { field: 'Teslim_Alan_Gsm', headerName: "Teslim Alan Gsm", width: 175 },
  { field: 'Cikis_Tarih', headerName: "Çıkış Tarihi", width: 160 },
  { field: 'Teslim_Eden_Personel_Ad', headerName: "Teslim Eden Personel", width: 200 },

];



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}



export default function ServistekiArac(props) {
  props.setTitle('Servisteki Araç Listesi');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [servis, setServis] = useState([]);
  const [servisRow, setServisRow] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/servis').then((resp) => {
      setServis(resp.data.data);
      let tempArrayRow = [];

      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id:rows.ID, Plaka: rows.Plaka, Giris_Tarih: rows.Giris_Tarih, Teslim_Eden_Ad: rows.Teslim_Eden_Ad,
          Teslim_Eden_Tc: rows.Teslim_Eden_Tc, Teslim_Eden_Gsm: rows.Teslim_Eden_Gsm, Teslim_Alan_Personel_Ad: rows.Teslim_Alan_Personel_Ad,
          Teslim_Alan_Ad: rows.Teslim_Alan_Ad,Teslim_Alan_Tc: rows.Teslim_Alan_Tc,Teslim_Alan_Gsm: rows.Teslim_Alan_Gsm,
          Cikis_Tarih: rows.Cikis_Tarih,Teslim_Eden_Personel_Ad:rows.Teslim_Eden_Personel_Ad};
      })
      setServisRow(tempArrayRow);
      
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
/////////////
  const[serviste,setServiste]=useState([]);
  const [servisteRow, setServisteRow] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/serviste').then((resp) => {
      setServiste(resp.data.data);
      let tempArrayRow = [];

      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id:rows.ID, Plaka: rows.Plaka, Giris_Tarih: rows.Giris_Tarih, Teslim_Eden_Ad: rows.Teslim_Eden_Ad,
          Teslim_Eden_Tc: rows.Teslim_Eden_Tc, Teslim_Eden_Gsm: rows.Teslim_Eden_Gsm, Teslim_Alan_Personel_Ad: rows.Teslim_Alan_Personel_Ad};
      })
      setServisteRow(tempArrayRow);
      
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])



  return (
    <div>
      <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={servisteRow} columns={columns} checkboxSelection 
          className={classes.dataGridHeaderStyle}
            rowHeight={30}
            localeText={{
              columnMenuSortAsc: 'Alfabetik Sırala',
              columnMenuSortDesc: 'Tersten Sırala',
              columnMenuFilter: 'Filtrele',
              columnMenuUnsort: 'Filtrelemeyi Temizle',
              columnMenuHideColumn: 'Sütunu Gizle',
              columnMenuShowColumns: 'Tümünü Göster',
              filterPanelColumns: 'Başlıklar',
              filterPanelOperators: 'İşlemler',
              filterPanelInputLabel: 'Sözcük Arama',
              filterPanelInputPlaceholder: 'Aranacak Sözcük...',
              filterOperatorEquals: 'Eşleştir',
              filterOperatorContains: 'İçerikte Ara',
              filterOperatorStartsWith: 'Baştan Ara',
              filterOperatorEndsWith: 'Sondan Ara',
            }}
            components={{
              Toolbar: CustomToolbar,
            }} />
        </div>
      </Grid>
      <Paper align="center" style={{ marginTop: '2%', marginBottom: '2%', padding: '1%', height: 'auto' }}>
        <Typography >
          <b style={{ color: "darkblue" }}>Araçların Giriş Çıkışları</b>
        </Typography>
      </Paper>
      <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={servisRow} columns={columns2} checkboxSelection
            rowHeight={30}
            localeText={{
              columnMenuSortAsc: 'Alfabetik Sırala',
              columnMenuSortDesc: 'Tersten Sırala',
              columnMenuFilter: 'Filtrele',
              columnMenuUnsort: 'Filtrelemeyi Temizle',
              columnMenuHideColumn: 'Sütunu Gizle',
              columnMenuShowColumns: 'Tümünü Göster',
              filterPanelColumns: 'Başlıklar',
              filterPanelOperators: 'İşlemler',
              filterPanelInputLabel: 'Sözcük Arama',
              filterPanelInputPlaceholder: 'Aranacak Sözcük...',
              filterOperatorEquals: 'Eşleştir',
              filterOperatorContains: 'İçerikte Ara',
              filterOperatorStartsWith: 'Baştan Ara',
              filterOperatorEndsWith: 'Sondan Ara',
            }}
            components={{
              Toolbar: CustomToolbar,
            }} />
        </div>
      </Grid>

    </div>
  )
}
