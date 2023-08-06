import React from 'react'
import { configInputs } from './configInput'

//interface input component
interface IInput {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  configId: string;
  value: string;
}

//create Input
export const Input: React.FC<IInput> = ({configId, value, onChange}) => {
  //variables
  const { id, className, text, type } = configInputs[configId]

  //render
  return (
    <input 
      id={id} 
      className={className} 
      placeholder={value?value:text} 
      value={value}
      type={type?type:"text"}
      required
      onChange={onChange}
    />
  )
}
