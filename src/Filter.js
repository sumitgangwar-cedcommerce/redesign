import { Rating } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'

const Filter = (props) => {

    let catt = ["Fresh Fruits" , "Fresh Vegetables" , "Dry Fruits" , "Fresh Non Veg" , "Dairy Products"]


    const update_cat = (event , data) => {
        let list = document.getElementsByClassName('category-item')
        for(let i=0;i<list.length; i++){
          list[i].className = 'category-item'
        }
        event.target.classList.add("active")

        if(data.replace(' ' , '_') === props.cat[0]){
          event.target.classList.remove("active")
          props.cat[1]('')
        }
        else props.cat[1]((data).replace(' ' , '_')) 
    }

    if(props.cat[0]!==""){
        let list = document.getElementsByClassName('category-item')
        for(let i=0;i<list.length; i++){
            if(list[i].innerHTML === props.cat[0])  list[i].className+= 'active'
        }
    }

    console.log(props.cat[0])

    const [pro , setPro] = useState(<></>) 

    useEffect(()=>{
        let t = 
        <>
            {
                catt.map((item , ind) =>

                    item.replace(' ' , '_')===(props.cat[0]) ?

                     <div key={ind}  className='active category-item' onClick={(event) => update_cat(event , item)}>
                        {item}
                    </div>
                    :
                    <div key={ind}  className='category-item' onClick={(event) => update_cat(event , item)}>
                        {item}
                    </div>
                )
            }
        </>
        setPro(t)
    },[props.cat[0]])

  return (
    <>
    {/* {
        catt.map((item) =>{
            
            
            item===props.cat[0] ? console.log(item) : console.log(props.cat[0])
        })
    } */}
    {
        pro
    }
    </>
  
  )
}

export default Filter