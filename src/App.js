import './App.css';
import { LocationOn, Login, ShoppingBag, Telegram } from '@mui/icons-material';
import Product from './Product';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Modal, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {data} from './DataContext'


    
function App() {

  const [store , setStore]  =useState(false)

  const u = useContext(data)

  const toggle_store =() =>{
    setStore(!store)
  }

  
  // useEffect(()=>{
  //   console.log(window.innerWidth)
  //   if(window.innerWidth > 990 && store===true){
  //     setStore(false)
  //     // alert()
  //   }
  // })

  const login_fun = (event) =>{
    event.preventDefault();
    let email = event.target.email.value
    let password = event.target.password.value
    if(email==='abc@gmail.com' && password === '123456'){
      u.user[1]('ABC')
      u.lmodal[1](false)
    }
  }

  window.onscroll = () =>{
    if(window.scrollY > 10){
      document.getElementById('img-logo').style.width = '40%';
    }
    if(window.scrollY < 10){
      document.getElementById('img-logo').style.width = '70%';
    }
    if(window.scrollY > 40){
      document.getElementById('to-top').style.display = 'flex';
    }
    else document.getElementById('to-top').style.display = 'none';
    
  }
  return (
    <div className="App">
      <div className="header">
        <div className='top-bar'>
          <div className='logo div-span'>
            <p>Download WAY2DOOR APP <a style={{textDecoration: 'none'}} href="https://play.google.com/store/apps/details?id=io.ionic.way2doorapp" target="_blank"><span style={{color:'orangered' , marginLeft:'1vw' , fontWeight:800 , fontSize:'16px'}} className='ani animate__animated animate__flash animate__infinite	infinite'>click here</span></a></p>
          </div>
          <div className='top-bar-item'>
            <div className='div-span'>
              <LocationOn /> <span>Selected Delivery Location : Lucknow(226010)</span>
            </div>
            {
              u.user[0]!=="ABC" ? 
              <>
                <div className='div-span' onClick={()=>u.lmodal[1](true)}>
                  <i ><Login /></i> <span>Login</span>
                </div>
                <div className='div-span' onClick={()=>u.lmodal[1](true)}>
                  <i ><Telegram /></i> <span>Sign Up </span>
                </div>
              </>
              :
              <div>
                Hello, ABC 
              </div>
            }
            
          </div>
        </div>
        <div className='sticky' id='sticky'>
          
          <div className='top-bar-sticky'>
            <div className='img-logo'>
              <img id='img-logo' src='http://www.way2door.com/images/way2door-min.png' alt='#' />
            </div>
            <div>
              <p>Today's order will be delivered tomorrow. सबसे सस्ता और सबसे अच्छा.</p>
            </div>
            <div className='bag'>
              <i onClick={() => u.cdraw[1](true)}><ShoppingBag /></i>
              <div>{u.cart[0].length}</div>
            </div>
          </div>
          <div className='header-bottom'>
            <p>Fruits And Vegetable Store</p>
          </div>
        </div>
        <div className='responsive-navbar'>
          <div className='logo-responsive'>
            <img src='http://www.way2door.com/images/way2door-min.png' alt='#' />
          </div>
          <div className='responsive-nav-content'>
          {
              u.user[0]!=="ABC" ? 
              <>
                <div className='div-span' onClick={()=>u.lmodal[1](true)}>
                  <i ><Login /></i> <span>Login</span>
                </div>
                <div className='div-span' onClick={()=>u.lmodal[1](true)}>
                  <i ><Telegram /></i> <span>Sign Up </span>
                </div>
              </>
              :
              <div>
                Hello,<br /> ABC 
              </div>
            }
            <div>
              <LocationOn /> <span>Lucknow</span>
            </div>
            <div>
              <i onClick={toggle_store}><MenuIcon /></i><span>Stores</span>
            </div>
          </div>
        </div>
        {
          store===true  ? <div  id='store_name' className='lulu header-bottom1 animate__animated animate__flipInX'>
          <p>Fruits And Vegetable Store</p>
          </div> : null
        }
        <div className='products'>
          <Product />
        </div>

      
        
      </div>
      
      <Modal
          open={u.lmodal[0]}
          onClose={()=>u.lmodal[1](false)}
        >
          <div className ='modal-login modal-body'>
            <div className ='modal-title'>
              <h2>Login</h2>
            </div>
            <div className ='modal-content'>
              {/* <div className='err'><p>{err}</p></div> */}
              <form className = 'login-form' onSubmit={(e)=>login_fun(e)}>
                <p>
                  <label for='email'>Email</label>
                  <input required  name='email' id='email'  pattern='abc@gmail.com' placeholder='abc@gmail.com' title='abc@gmail.com' />
                </p>
                <p>
                  <label for='password'>Password</label>
                  <input required id='password' name='password' pattern='123456' type='password' placeholder='123456' title='123456' />
                </p>
                <p>
                  <button onClick='#' type='submit='>SUBMIT</button>
                </p>
              </form>
            </div>
          </div>
        </Modal>


      <div className='to-top' id='to-top'>
        <Tooltip title='back to top'><i onClick={()=>{document.body.scrollTop = 0;document.documentElement.scrollTop = 0;}}><KeyboardArrowUpIcon sx={{fontSize:'5vw'}} /></i></Tooltip>
      </div>
    </div>

  );
}

export default App;
