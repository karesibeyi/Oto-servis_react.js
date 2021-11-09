import React from 'react';
import Tablo from '../Tablo';



const TableHeader = ["Genel İndirim (%)", "İndirim Tutarı","Ara Toplam","KDV Oranı(%)","Kdv Tutarı","Genel Toplam"]
const TableRows = [
  [
    "Data1", "Data2", "Data3","Data4","Data5","Data6"
  ]
]

export default function FullWidthGrid() {
 
 
  return (
    <div >
        <Tablo hidden={true} addButton={false} tableHeader={TableHeader} tableRows={TableRows} />
    </div>
  );
}