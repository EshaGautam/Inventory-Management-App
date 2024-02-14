import React, { useContext } from 'react'
import Input from './Input'
import Button from '../Button/Button';
import InventoryContext from '../Store/InvertoryContext';
import { useState } from 'react';
import './Form.css'
function Form() {
 
const MedsCtx = useContext(InventoryContext)

const {handleMedsQty,handleFormSubmit,medsQty}= MedsCtx

const [medsName, setMedsName] = useState("");
const [medsDes, setMedsDes] = useState("");
const [medsPrice, setMedsPrice] = useState(0);

const handleName =(event)=>{
   setMedsName(event.target.value)
}
const handleDes =(event)=>{
   setMedsDes(event.target.value)
}
const handlePrice =(event)=>{
  setMedsPrice(event.target.value)
}
const handleQty =(event)=>{
    handleMedsQty(event.target.value)
}
const handleSubmit=(event)=>{
    event.preventDefault()
    const medsData ={
        name:medsName,
        des:medsDes,
        price:medsPrice,
        qty:medsQty,
    }
    handleFormSubmit(medsData);
  

}

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-style">
        <Input
          type=" text"
          id="name"
          onChange={handleName}
          name="Enter-Medicine-Name"
          value={medsName}
          placeholder="Enter-Name"
        />
        <Input
          type=" text"
          id="des"
          onChange={handleDes}
          name="Enter-Medicine-Description"
          value={medsDes}
          placeholder="Enter-Description"
        />
        <Input
          type=" text"
          id="price "
          onChange={handlePrice}
          name="Enter-Price"
          value={medsPrice}
          placeholder="Enter-Price"
        />
        <Input
          type="number"
          id="Qty"
          onChange={handleQty}
          name="Enter-Quantity"
          value={medsQty}
          min={1}
          placeholder="Enter-Quantity"
        />
        <Button type="submit">Add Medicine</Button>
      </form>
    </div>
  );
}

export default Form