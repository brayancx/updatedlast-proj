import { useState } from 'react';
import LeftNav from '../../components/LeftNav/LeftNav';
import MainSection from '../../components/MainSection/MainSection';
import TopNav from '../../components/TopNav/TopNav';


export default function MainPage (){
    const [employeeId, setEmployeeId] = useState('')
    return (
        <>
        <TopNav/>
      <LeftNav employeeId={employeeId}/>
      <MainSection setEmployeeId={setEmployeeId}/>
      </>
    )
}