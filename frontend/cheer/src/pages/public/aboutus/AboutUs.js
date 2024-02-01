import React,{useState, useEffect }from 'react'
import './AboutUs.css'
import text from '../../../resources/text/aboutus.txt'
import ph2 from '../../../resources/images/placeholder2.jpg'


function Aboutus() {

    const [aboutus_text, set_aboutus_text] = useState("")

    useEffect(()=>{
        fetch(text).then(r=>r.text()).then(data=> {set_aboutus_text(data); console.log(data)})
    })    

  return (
    <div className='aboutus_main_container'>
        <h1 className='aboutus_main_header'>
            About Us
        </h1>
        <h2 className='aboutus_main_subheader'>
            Our Mission
        </h2>

        
        
        <div className='aboutus_subcontainer1'>
            <img className='aboutus_main_img'  src={ph2} alt='placeholder2'/>
            <pre className='aboutus_description'>
                {aboutus_text}
            </pre>
        </div>
        {/* <pre className='aboutus_description'>
            {aboutus_text}
        </pre> */}

        <h2 className='aboutus_main_subheader'>
            
        </h2>

    </div>
  )
}




export default Aboutus