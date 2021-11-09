import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { API_URL } from '../constants';
import CariKayitModal from '../Modals/CariKayitModal';
import {
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import WrongModal from '../Modals/WrongModal';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const columns = [
  { field: 'Ad', headerName: "Cari Adı", width: 158 },
  { field: 'Gsm', headerName: "Cari Gsm", width: 150 },
  { field: 'Tc', headerName: "Cari TC", width: 130 },
  { field: 'Vergi_No', headerName: "Vergi No", width: 150 },
  { field: 'Vergi_Dairesi', headerName: "Vergi Dairesi", width: 250 },
  { field: 'Adres', headerName: "Cari Adres", width: 350 },
  { field: 'Cari_Tur', headerName: "Cari Türü", width: 120 },
];


export default function Cari(props) {
  props.setTitle('Cari');
  const classes = useStyles();


 /* useEffect(() => {
    axios.get(API_URL + '/arac/cari').then((resp) => {
      setcari(resp.data.data);
      let tempArrayRow = [];

      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id:rows.ID, Ad: rows.Ad, Gsm: rows.Gsm, Tc: rows.Tc, Vergi_No: rows.Vergi_No, Vergi_Dairesi: rows.Vergi_Dairesi, Adres: rows.Adres, Cari_Tur: rows.Cari_Tur};
      })

      setCariRow(tempArrayRow);
      
    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }, [])
*/

  ////
const [cari, setcari] = useState([]);

const [editButtonDisabled, setEditButtonDisabled ] = useState(true);
const [deleteButtonDisabled, setDeleteButtonDisabled ] = useState(true);
const [selectedRowIDs, setSelectedRowIDs ] = useState([]);

const [open, setOpen] = React.useState(false);
const [cariData, setCariData] = useState(null)
const [wrongModalOpen, setWrongModalOpen] = React.useState(false);
const [cariRow, setCariRow] = useState([]);


const handleRowEdit = () => {
  cariRow.map((data, index) => {
      if(data.id == selectedRowIDs[0]) {
        setCariData({id:data.id, Ad: data.Ad, Gsm: data.Gsm, Tc: data.Tc, Vergi_No: data.Vergi_No, Vergi_Dairesi: data.Vergi_Dairesi, Adres: data.Adres, Cari_Tur: data.Cari_Tur})
      }
  })
  setOpen(true)
}

const handleRowDelete = () => {
  if(!wrongModalOpen) {
    setWrongModalOpen(true)
  }else{
    axios.post(API_URL + '/arac/cariSil', {ids: selectedRowIDs}).then((resp) => {
      if(resp.data.status == 'success') {
        setWrongModalOpen(false);
        GetAllCari();
      }
      else{
        console.log('Axios Cari Post Error!');
      }
    }).catch((error) => {
      console.log('Axios Error: ', error)
    })
  }
}
////

function CustomToolbar() {
  return (
    <GridToolbarContainer>
        <Tooltip title="Düzenle">
        <IconButton disabled={editButtonDisabled}>
          <EditIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }}  onClick={() => handleRowEdit()}  />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sil" style={{ padding: 10 }}>
        <IconButton disabled={deleteButtonDisabled}>
          <DeleteIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => handleRowDelete()}  />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  );
}


useEffect(() => {
  GetAllCari()
}, [])

const GetAllCari = () => {
  axios.get(API_URL + '/arac/cari').then((resp) => {
    let tempArrayRow = [];

    resp.data.data.map((rows, index) => {
      tempArrayRow[index] = { id:rows.ID, Ad: rows.Ad, Gsm: rows.Gsm, Tc: rows.Tc, Vergi_No: rows.Vergi_No, Vergi_Dairesi: rows.Vergi_Dairesi, Adres: rows.Adres, Cari_Tur: rows.Cari_Tur };
    })

    setCariRow(tempArrayRow);

  }).catch((err) => {
    console.log("Axios GET Error --> ", err)
  })
}

  return (
    <div className={classes.root}>
      <Grid container  justify="center">
       <Grid item xs={12} sm={11} > </Grid>
          <Grid item  >
            <CariKayitModal open={open} setOpen={setOpen} cariData={cariData} refreshData={() => GetAllCari()}  />
            <WrongModal 
              wrongModalOpen={wrongModalOpen}   
              setWrongModalOpen={setWrongModalOpen} 
              title={'Cari Sil'} 
              content={'Cari kaydını silmek istediğinize emin misiniz?'} 
              onClick={() => handleRowDelete()} 
          />
            <Tooltip  title=" Cari Kaydı Oluştur " placement="left" >
              <Fab color="primary" className={classes.absolute} onClick={() => {setCariData(null); setOpen(true)}}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>

      <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={cariRow} columns={columns} checkboxSelection
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
            }} 
            onSelectionModelChange ={(newSelection) => {
              if(newSelection.selectionModel.length != 0) {
                setDeleteButtonDisabled(false);
                if(newSelection.selectionModel.length > 1 ) {
                  setEditButtonDisabled(true)
                }
                else{
                  setEditButtonDisabled(false)
                }
              }
              else{
                setDeleteButtonDisabled(true);
                setEditButtonDisabled(true)
              }
              setSelectedRowIDs(newSelection.selectionModel)
            }}
            />
          
        </div>
      </Grid>

    </div>
  )
}
