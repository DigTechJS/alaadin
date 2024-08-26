import './main.css'
import {assets} from '../../assets/assets'
import alaadin from '../../../public/alladin.jpg'
import { Context } from '../../Context/Context'
import { useContext } from 'react'
const Main = () => {
  const {onSent, recentPrompt, showResult, loading,resultData,setInput,input,menuOpen}=useContext(Context)
  // console.log(showResult);
  // const paddingValue = menuOpen ? '200px' : '60px';
  
  return (
    <div className="main" >
      <div className="nav">
        <p>Alaadin</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {
          !showResult?<>
            <div className="greet">
              <p><span>Hello From Alaadin.</span> <img src={alaadin} width="100px" alt="" /></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me get organized with a list of 10 tips</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Provide a list of questions to help me prepare for a Software Developer job interview.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me craft a text response to my friend who is stressed at work</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          :
          <div className='result'>
            <div className="result-title">

              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              
              {!loading?
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>:
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              }
            </div>


            
          </div>
        }
        
        
        

      </div>
      <div className="main-bottom">
          <div className="search-box">
            <input type="text" onChange={(e)=>setInput(e.target.value)}  value={input} placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img src={assets.send_icon} onClick={()=>onSent()} alt="" />:null}
              
            </div>
          </div>
          <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>

    </div>
  )
}

export default Main