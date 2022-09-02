import React, { useContext, useEffect, useState } from 'react'
import { data } from './DataContext'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './CArt.css'


const Cart = () => {
    const [total  , setTotal] = useState(0)
    const [chk  ,setChk] = useState(1)
    const u = useContext(data)



    useEffect(()=>{
        let t = 0;
        u.cart[0].map(item => t += Number(item.sellPrice) * Number(item.quantity))
        setTotal(t)
    },[u.cart[0]])
    
    const delete_item = (item) =>{
        item['inCart']=false;
        item.quantity = undefined;
        u.cart[0].splice(u.cart[0].indexOf(item) , 1)
        u.cart[1]([...u.cart[0]])
    }
    const decrease = (item) =>{
        if(item.quantity!==undefined && item.quantity>1){
            item.quantity = Number(item.quantity)-1;
            u.cart[1]([...u.cart[0]])
        }

    }
    const increase = (item) =>{
        if(item.quantity!==undefined){
            item.quantity = Number(item.quantity)+1;
        }
        else{
            item.quantity = 1
        }
        u.cart[1]([...u.cart[0]])

    }

    const errFun = () =>{
        if(chk){
            return (<div>Your Cart is empty</div>)
        }
        else{
            return(
                <div>Order Placed Successfully</div>
            )
        }
    }

    const chkout_fun = () =>{
        u.cart[0].map(item =>{
            item.quantity = undefined;
            item.inCart  = false;
        })
        u.cart[1]([])
        setChk(0)
    }


  return (
    <div className="my_cart">
        <div className="item-table">
            {
                u.cart[0].length === 0 ? errFun() : 
                u.cart[0].map((item , i) => 
                    <div className='item-cart' key={i}>
                            <div className='item-cart-img'>
                                <img src={`http://www.way2door.com${item.pimage}`} alt='#' />
                            </div>
                            <div className='item-cart-content'>
                                <div>
                                    <p style={{fontWeight: 'bold'}}>{item.pname}</p>
                                    <p className='cross'><i onClick={()=> delete_item(item)}>X</i></p>
                                </div>
                                <div>
                                    <p style={{fontWeight: 'bold' , color:'silver'}}>{item.pUnit}</p>
                                </div>
                                <div>
                                    <div>
                                        <p className='cut'>₹{item.price} </p>
                                        <p className='xcut'>₹{item.sellPrice}</p>
                                    </div>
                                    <div className='counter'>
                                        <RemoveCircleOutlineIcon className='minus' onClick={()=>decrease(item)} />
                                        <span>{item.quantity===undefined ? 0 : item.quantity}</span>
                                        <AddCircleOutlineIcon className='plus' onClick={()=>increase(item)}/>
                                    </div>
                                    <p style={{fontWeight: 'bold'}}>
                                        ₹{item.quantity * item.sellPrice}
                                    </p>
                                </div>
                            </div>  
                    </div>
                ) 
            }
        </div>
        {
            u.cart[0].length === 0 ? null : 
        
        <div className='bill-detail'>
            <p>
                <span>Sub Total</span>
                <span>₹{total}</span>
            </p>
            <p>
                <span>Delivery Charge</span>
                <span>₹30</span>
            </p>
            <p>
                <span>Total</span>
                <span>₹{Number(total)+30}</span>
            </p>
        </div>

        }
        <div className='car-buttons'>
            <button onClick={() => u.cdraw[1](false)} className='c_shop'>Continue Shopping</button>
            {
                u.cart[0].length === 0 ? null :
                <button className='chkout' onClick={chkout_fun}>Checkout</button>
            }   
        </div>
    </div>
  )
}

export default Cart