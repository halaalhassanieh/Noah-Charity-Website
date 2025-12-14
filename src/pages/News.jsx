
import PageHeader from '../components/ui/PageHeader'
import {NewsHead } from '../constants/Constants.jsx'
import LatestNews from '../components/LatestNews.jsx';
import Footer from '../components/footer/Footer.jsx';

const News = () => {

  return (
    <div>
      <PageHeader page={NewsHead.page} title={NewsHead.title} subtitle={NewsHead.subtitle}/>
      <LatestNews blogsnumber={9} displayButton={false} displaySearch={true}/>  
      <Footer/>
    </div>
  )
}

export default News
