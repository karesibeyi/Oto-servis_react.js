import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { API_URL } from '../constants';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import StokGirisModal from '../Modals/StokGirisModal';
import WrongModal from '../Modals/WrongModal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';



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
  { field: 'Stok_Kodu', headerName: "Stok Kodu", width: 130 },
  { field: 'Barkod_No', headerName: "Barkod No", width: 130 },
  { field: 'Stok_Adi', headerName: "Stok Adi", width: 130 },
  { field: 'Stok_Adet', headerName: "Stok Adedi", width: 130 },
  { field: 'Alim_Fiyat', headerName: "Alım Fiyatı", width: 130 },
  { field: 'Satis_Fiyat', headerName: "Satış Fiyat", width: 130 },
  { field: 'Tedarikci_Adi', headerName: "Tedarikçi Adi", width: 200 },

];


export default function StokKarti(props) {
  props.setTitle('Stok Karti');
  const classes = useStyles();

  const [stok, setStok] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/arac/stok').then((resp) => {
      setStok(resp.data.data);
      let tempArrayRow = [];
  
      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id:rows.ID, Stok_Kodu: rows.Stok_Kodu, Barkod_No: rows.Barkod_No, Stok_Adi: rows.Stok_Adi,
          Stok_Adet: rows.Stok_Adet, Alim_Fiyat: rows.Alim_Fiyat, Tedarikci_Adi: rows.Tedarikci_Adi, Satis_Fiyat: rows.Satis_Fiyat};
      })
      setStokRow(tempArrayRow);
      
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

  ///
  const [editButtonDisabled, setEditButtonDisabled ] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled ] = useState(true);
  const [selectedRowIDs, setSelectedRowIDs ] = useState([]);
  const [stokData, setStokData] = useState(null)

  const [open, setOpen] = React.useState(false);
  const [wrongModalOpen, setWrongModalOpen] = React.useState(false);
  const [stokRow, setStokRow] = useState([]);
  

  const handleRowEdit = () => {
    stokRow.map((data, index) => {
        if(data.id == selectedRowIDs[0]) {
          setStokData({id: data.id, ad: data.Ad, gsm: data.Gsm, tc: data.TC, adres: data.Adres})
        }
    })
    setOpen(true)
  }

  const handleRowDelete = () => {
    if(!wrongModalOpen) {
      setWrongModalOpen(true)
    }else{
      axios.post(API_URL + '/arac/stokSil', {ids: selectedRowIDs}).then((resp) => {
        if(resp.data.status == 'success') {
          setWrongModalOpen(false);
          GetAllStok();
        }
        else{
          console.log('Axios Personel Post Error!');
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
    GetAllStok()
  }, [])

  const GetAllStok = () => {
    axios.get(API_URL + '/arac/stok').then((resp) => {
      let tempArrayRow = [];

      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id: rows.ID, Stok_Kodu: rows.Stok_Kodu, Barkod_No: rows.Barkod_No,
       Stok_Adi: rows.Stok_Adi, Stok_Adet: rows.Stok_Adet, Alim_Fiyat: rows.Alim_Fiyat, Satis_Fiyat: rows.Satis_Fiyat,
       Tedarikci_Adi: rows.Tedarikci_Adi};
      })

      setStokRow(tempArrayRow);

    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }


  return (
    <div className={classes.root} >
      <Grid container justify="center">
        <Grid item xs={12} sm={11} > </Grid>
        <Grid item  >
          <StokGirisModal open={open} setOpen={setOpen} />
          <WrongModal 
              wrongModalOpen={wrongModalOpen}   
              setWrongModalOpen={setWrongModalOpen} 
              title={'Stok Sil'} 
              content={'Stok Kaydını Silmek İstediğinize Emin Misiniz?'} 
              onClick={() => handleRowDelete()} 
          />
          <Tooltip title=" Stok Giriş " placement="left" >
            <Fab color="primary" className={classes.absolute} onClick={() => {setStokData(null); setOpen(true)}}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>


      <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={stokRow} columns={columns} checkboxSelection
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
            onSelectionModelChange={(newSelection) => {
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
