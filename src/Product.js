import { Drawer, MenuItem, Rating, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { products } from './Data'
import ProductCard from './ProductCard'
import { Info, Search, ShoppingBag } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { data } from './DataContext'
import Cart from './Cart'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Filter from './Filter'

const Product = () => {

  const [cat , setCat] = useState("")
  const [sort , setSort] = useState(false)
  const [text , setText] = useState("")
  const [displayPro , setDisplayPro] = useState([])
  const [f_drawer , setF_drawer] = useState(false)
  const [cdraw , setCdraw] = useState(false)



  const u = useContext(data)

  // console.log(cdraw)
  

  useEffect(()=>{
    let temp = []
    products.map(item => {
      if((cat === item.mainCat || cat === "") && (item.pname.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || text === '')){
        temp.push(item)
      }
      
      temp = temp.sort((a,b)=>{
        return Number(a.price) - Number(b.price)
      })
      
      if(sort)  temp = temp.reverse()
    })
    setDisplayPro(temp);
  },[text , cat , sort])

  useEffect(()=>{
    if(cat!==""){
      window.scrollTo({
        top : 350,
        behavior : 'smooth'
      })
    }
    
  },[cat])

  const errMsg = () =>{
    return(
    <div className='errP'>
      <p>No data found!!</p>
    </div>)
  }

  

  return (
    <>
        <div className='filters'>
            <div className='advertiser'>
                <h4>LUCKNOW VEG EXPRESS</h4>
                <Rating value={4} className='rating-icon' />
                <p>Average 3.5/5</p>
                <div className='rating-button'>
                    <button>View Reviews</button>
                    <button style={{backgroundColor:'green'}}>Contact Info</button>
                </div>
            </div>
            <div className='category'>
              <Filter cat = {[cat , setCat]} />
            </div>
        </div>
        <div className='products-list'>
          <div className='product-list-header'>
            <div className='product-list-title'>
              <div className='timing'>
                <p>
                  Order Timing : <span>8:00 am</span> To <span>6:00 pm</span>
                </p>
                <p>
                  <button>Store Close</button>
                </p>
              </div>
            </div>
            <div className='product-list-button'>
              <p>
                <button>My Offers</button>
              </p>
              <p>
                <button>Page Like 12</button>
              </p>
            </div>
          </div>
          
          <div className='product-list-banner'>
            <img src='http://www.way2door.com/images/stores/banner_1574312382banner-lucknow-veg-express-min.png' alt='#' />
          </div>

          <div className='search_bar'>
            <p>
              <input onChange={(event)=>{setText(event.target.value);setCat("")}} type='search' autoFocus placeholder='Search here...' /><i><Search /></i>
            </p>
            <p>
              <label for='sort'>Sort</label>
              <select id='sort' onChange={()=>setSort(!sort)}>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>
            </p>
          </div>

          <div className='product-item'>
            {
              displayPro.length === 0 ? errMsg() : 
              displayPro.map(item  =>
                <>
                  <ProductCard item={item} />
                </>  
              )
            }
          </div>



          <div className='filter-drawer'>
            <div>
              <Tooltip title='categories'><i onClick={()=>{setF_drawer(true)}}> <FilterListIcon /></i></Tooltip>
            </div>
            <Drawer
              open = {f_drawer}
              anchor='left'
              onClose = {()=>setF_drawer(false)}
            >
              <div style={{padding:'1vw'}}>
                <div style={{display:'flex' , justifyContent: 'flex-end'}}>
                  <i style={{cursor: 'pointer'}} onClick={()=>setF_drawer(false)}><KeyboardDoubleArrowLeftIcon /></i>
                </div>
                <div className='advertiser'>
                  <h4>LUCKNOW VEG EXPRESS</h4>
                  <Rating value={4} className='rating-icon' />
                  <p>Average 3.5/5</p>
                  <div className='rating-button'>
                      <button>View Reviews</button>
                      <button style={{backgroundColor:'green'}}>Contact Info</button>
                  </div>
                </div>
                <div className='category'>
                  
                  <Filter cat = {[cat , setCat]} />
                  
              </div>
              </div>
            </Drawer>
          </div>

          <div className='cart-button-fixed'>
            <Tooltip title='Cart'><i onClick={() => u.cdraw[1](true)}><ShoppingBag /></i></Tooltip>
            <span>{u.cart[0].length}</span>
          </div>

          <Drawer
            open={u.cdraw[0]}
            onClose={() => u.cdraw[1](false)}
            anchor='right'
            // sx={{backgroundColor:  'rgb(197, 197, 197)'}}
          >
            <div className='cart-drawer'>
              <div className='cart-drawer-head'>
                <div>
                  <i onClick={() => u.cdraw[1](false)}><KeyboardDoubleArrowRightIcon /></i>
                </div>
                <div style={{width:'92%'}}>
                  <h2>Lucknow Veg Express</h2>
                  <p>
                    <span>My Cart</span>
                    <span>{u.cart[0].length} - item</span>
                  </p>
                </div>
              </div>
              
              <Cart />
            </div>
          </Drawer>


        </div>
    </>
  )
}

export default Product