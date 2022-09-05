import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react'

function Home() {
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    fetch('https://le-marche-server.herokuapp.com/category')
      .then(res => res.json())
      .then(data =>{
        if(data.length > 0){
          let filterCategory = data.filter((item,i)=>{
            return item.banner == 1;
          })
          setCategory(filterCategory);
        }else{
          console.log("Error motherfucker!!")
        }
      })
      .catch(err => console.error(err))
  },[])

  return (
    <div>
      <Header />
      {category &&
        category.map((item, i)=>
          <Banner key={i+'asd'} title={item.title} description={item.description} path={item.img_path?`images/${item.img_path}`:"images/default-placeholder.png"} id={item.id} />
        )
      }
      <Footer />
    </div>
  );
}

export default Home;
