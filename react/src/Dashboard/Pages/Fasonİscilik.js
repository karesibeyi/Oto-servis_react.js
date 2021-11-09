import React, { Component } from 'react'
import Tablo from '../Tablo';



const TableHeader = ["Tarih", "Fason Cari Adı","Fason Masraf Adı","Net Fiyat","Açıklama"]
const TableRows = [
  [
    "Data1", "Data2", "Data3","Data4","Data5"
  ]
]
export default class Fasonİscilik extends Component {
    render() {
        return (
            <div>
                <Tablo hidden={true} addButton={false} tableHeader={TableHeader} tableRows={TableRows} />
            </div>
        )
    }
}
