import React from 'react'
import CausesCatCard from '../components/CausesCatCard'
import { CatCardInfo,CausesHead } from '../constants/Constants.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import MainCauses from '../components/MainCauses.jsx'
import Footer from '../components/footer/Footer.jsx'

const Causes = () => {
  return (
   <div>
    <PageHeader page={CausesHead.page} title={CausesHead.title} subtitle={CausesHead.subtitle}/>
       
     <div className='bg-gray/100'> 
        <div className='custom-container flex xl:flex-row flex-col justify-center items-center gap-10 xl:py-[60px] py-10 '>
          {
             CatCardInfo.map((e,i)=>{
              return(
             <CausesCatCard key={e.id} icon={e.icon} title={e.title} subtitle={e.subtitle}/>
           )
             })
           }
          </div>
         </div>
      <div>
        <MainCauses cardsnumber={9} displayButton={false} displaySearch={true}/>
      </div>
      <Footer/>
      </div>
  )
}

export default Causes
