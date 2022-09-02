import React, { useContext, useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './ProductCard.css';
import {data} from './DataContext'
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProductCard = (props) => {

    const u = useContext(data)
    const [open , setOpen] = useState(false)

    const add_to_cart = (item) =>{
        if(item.quantity===undefined)   item['quantity']=1;
        item['inCart']=true;
        if(u.cart[0].indexOf(item)===-1) {
            u.cart[1]([...u.cart[0] , item])
        }
    }
    const decrease = (item) =>{
        if(item.quantity!==undefined && item.quantity>1){
            item.quantity = Number(item.quantity)-1;
        }
        else{
            item['inCart']=false;
            item.quantity = undefined;
            u.cart[0].splice(u.cart[0].indexOf(item) , 1)
        }
        u.cart[1]([...u.cart[0]])

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

  return (
    <div className='pro_card'>
        <div>
            <p className='saving'>
                {Math.ceil(100-((props.item.sellPrice/props.item.price)*100)) } % Save
            </p>
            <div className='pro_img'>
                <img onClick={()=>setOpen(true)} src={`http://www.way2door.com${props.item.pimage}`} alt='#' />
            </div>
        </div>
        <div className='pro_content'>
            <h4>{props.item.pname}</h4>
            <div className='pro_unit'>
                <p className='unit'>{props.item.pUnit}</p>
                <p className='cut'>₹{props.item.price}</p>
                <p className='xcut'>₹{props.item.sellPrice}</p>
            </div>
            <div className='pro_functionality'>
                <p className='counter'>
                    <RemoveCircleOutlineIcon className='minus' onClick={()=>decrease(props.item)} /><span>{props.item.quantity===undefined ? 0 : props.item.quantity}</span><AddCircleOutlineIcon className='plus' onClick={()=>increase(props.item)}/>
                </p>
                <p>
                    {
                        props.item['inCart'] === true ?
                        <button style={{backgroundColor:'green'}} onClick={()=>add_to_cart(props.item)}>Added</button> :
                        <button onClick={()=>add_to_cart(props.item)}>Add Cart</button>

                    }
                    
                        
                </p>
            </div>
        </div>
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
        >
            <div className='modal-body'>
                <div className='p_fixed' ><i onClick={()=>setOpen(false)}><CloseIcon /></i></div>
                <div>
                    <p className='saving'>
                        {Math.ceil(100-((props.item.sellPrice/props.item.price)*100)) } % Save
                    </p>
                    <div className='i2 pro_img'>
                        <img onClick={()=>setOpen(true)} src={`http://www.way2door.com${props.item.pimage}`} alt='#' />
                    </div>
                </div>
                <div className='pro_content'>
                    <h4>{props.item.pname}</h4>
                    <div className='pro_unit'>
                        <p className='unit'>{props.item.pUnit}</p>
                        <p className='cut'>₹{props.item.price}</p>
                        <p className='xcut'>₹{props.item.sellPrice}</p>
                    </div>
                    <div className='pro_functionality'>
                        <p className='counter'>
                            <RemoveCircleOutlineIcon className='minus' onClick={()=>decrease(props.item)} /><span>{props.item.quantity===undefined ? 0 : props.item.quantity}</span><AddCircleOutlineIcon className='plus' onClick={()=>increase(props.item)}/>
                        </p>
                        <p>
                            {
                                props.item['inCart'] === true ?
                                <button style={{backgroundColor:'green'}} onClick={()=>add_to_cart(props.item)}>Added</button> :
                                <button onClick={()=>add_to_cart(props.item)}>Add Cart</button>

                            }
                        </p>
                    </div>
                </div>
            </div>

        </Modal>
    </div>
  )
}

export default ProductCard