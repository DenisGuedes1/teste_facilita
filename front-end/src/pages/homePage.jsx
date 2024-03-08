import React from 'react';
import '../App.css'
import { ClienteList } from '../components/clients';
export const HomePage = ()=>{
    return(
    <div className='conteinerDiv'>
        <ClienteList/>
    </div>
    )
}