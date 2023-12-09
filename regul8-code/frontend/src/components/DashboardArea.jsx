import React, { useState } from 'react'
import './DashboardArea.css'
import mapboxgl from 'mapbox-gl'
import Map from 'react-map-gl';
import './ChatBox.css';
import axios from 'axios';
import Plot from 'react-plotly.js'
const DashboardArea = (probs) => {

    const [selected,setSelected] = useState(false);
    const [selectedFor,setSelectedFor] = useState('');
    const [chatBoxOn,setChatBoxOn] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([{ text: 'Welcome to the chat!', fromBot: true }]);
    const latitude = 25.35;
    const longitude = 51.18;
    const mapurl =`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${latitude},${longitude}+(My%20Business%20Name)&amp;t=&amp;z=7&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
    console.log(mapurl)
    const data1 = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: 4,
        gauge: {
          axis: {
            range: [0, 5],
            tickvals: [0, 1, 2, 3, 4, 5],
            ticktext: ["", "Limited", "Transitioning", "Advanced", "Leading", ""],
            tickwidth: 1,
            tickcolor: "darkblue"
          },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "lightblue" },
            { range: [1, 2], color: "deepskyblue" },
            { range: [2, 3], color: "dodgerblue" },
            { range: [3, 4], color: "royalblue" },
            { range: [4, 5], color: "navy" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 4
          }
        }
      }
    ];
    const data2 = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: 4,
        gauge: {
          axis: {
            range: [0, 5],
            tickvals: [0, 1, 2, 3, 4, 5],
            ticktext: ["", "Limited", "Transitioning", "Advanced", "Leading", "Accelerated"],
            tickwidth: 1,
            tickcolor: "darkblue"
          },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "lightblue" },
            { range: [1, 2], color: "deepskyblue" },
            { range: [2, 3], color: "dodgerblue" },
            { range: [3, 4], color: "royalblue" },
            { range: [4, 5], color: "navy" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 4
          }
        }
      }
    ];
  
    const layout = {
      
      title: { text: "G5 Benchmark Level", font: { size: 24 } },
      // paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" },
      annotations: [
        {
          text: "Leading",
          font: { size: 36 },
          showarrow: false,
          x: 0.5,
          y: 0.5
        }
      ]
    };
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
      };
    
      const handleSendMessage = async () => {
        if (userInput.trim() !== '') {
          setMessages([...messages, { text: userInput, fromBot: false }]);
          setUserInput('');
        }
        const requestBody = {
            input: {
              question:userInput,
              chat_history:[]
            }
          };
        const response = await axios.post("http://localhost:8000/invoke",requestBody);
        setMessages([...messages, { text: JSON.stringify(response.data.output), fromBot: true }]);
        setUserInput('');
      };

  return !selected?(
    <div className='d-flex flex-column '>
        <h1 className='pt-3 ps-3 text-primary text-center'  >Welcome to RegAI 👩‍⚖️📚⚡ ! </h1>
        <h3 className='pt-2 ps-3 text-primary text-center'  >Your Gateway to Global Connectivity for Education!</h3>
        
        <div className="d-flex flex-column mt-5 px-5 justify-content-center">
            <p>RegAI serves as a specialized instrument meticulously crafted to streamline and enhance the exploration of telecommunications regulations across diverse nations, ensuring a seamless and effective research experience.</p>
            <h1>How It Works</h1>
            <p>Talk to our chatbot on the right</p>
            <button onClick={()=>setSelected(true)} className='btn btn-primary p-4 display-btn mt-4'>Display Dashboard</button>
           
        </div>
    </div>
  ):(
    <div className="d-flex flex-column p-3 justify-content-center align-items-center ">
        <div className="d-flex">
          <h3 className='dashboard-title text-primary'>RegAI Dashboard 📊</h3>
          {/* <i onClick={()=>setSelected(false)} class="fa fa-arrow-left fa-2x ms-auto text-secondary back-arrow" aria-hidden="true"></i> */}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
                
                <div className="col-md-6 mx-2 px-2 py-3 my-5 pan-area text-center">
                    <h5 className='mb-3 font-weight-bold'>Displaying Regulatory Information For:
</h5>
                    <h3><strong>Rwanda </strong> 🇷🇼</h3>
                </div>
               
                <div style={{width: "80%"}}><iframe className='map' width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=-1.9403,29.8739+(My%20Business%20Name)&amp;t=&amp;z=9&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div>
                <div className="metric w-100 py-3 bg-light text-center my-3"><h3>Metrics</h3></div>
                
                <Plot data={data1} layout={layout} />
                {/* <div className="row"></div> */}
                
                <Plot
        data={[
          {
            x: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
            y: [0.2, 0.20613767, 0.20980728, 0.22327395, 0.24935978, 0.27653519, 0.27930937, 0.31888471, 0.30097302, 0.3429602, 0.35579919, 0.35889939, 0.3570841, 0.39414395, 0.41491635, 0.41580909, 0.41339387, 0.44953736, 0.44283858, 0.45611081, 0.49257249, 0.48334762, 0.51100722, 0.52729121, 0.52554396, 0.54435345, 0.55396278, 0.57186176, 0.60804599, 0.60636036, 0.64567553, 0.65446708, 0.66],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          },
        ]}
        layout={ { title: 'Connectivity Access Rate'} }
      />
               
                {/* <div className="col-md-6 p-0 map-area mx-3"><div style={{width: "100%",filter:"invert(90%)",borderRadius:"15px"}}><iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div></div> */}
                
                
                
        </div>
        <div className="carousel">
        <iframe width="600" height="440"  src="https://rss.app/embed/v1/carousel/erTAWOWAcQeJwVQe" frameborder="0"></iframe>
        </div>

   

    </div>
  )
}

export default DashboardArea