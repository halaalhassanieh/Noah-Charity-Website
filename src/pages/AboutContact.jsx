import React from 'react'
import PageHeader from '../components/ui/PageHeader'
import { AboutUsHead ,hero3Info } from '../constants/Constants'
import InfoBlock2 from '../components/InfoBlock2'
import sideimg2 from "/assets/sideimg2.jpeg"
import Footer from '../components/footer/Footer'
import FeedbackForm from '../components/FeedbackForm'

const AboutUs = () => {
  return (
    
    <div>
      <PageHeader page={AboutUsHead.page} title={AboutUsHead.title} subtitle={AboutUsHead.subtitle}/>
       <InfoBlock2 sideimg={sideimg2} title={hero3Info.title} subtitle1={hero3Info.subtitle1} subtitle2={hero3Info.subtitle2}/>
       <FeedbackForm/>
       <Footer/>
    </div>
  )
}

export default AboutUs
