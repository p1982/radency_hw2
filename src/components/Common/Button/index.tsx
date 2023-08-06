import React from 'react'
import { configButtons, IConfigButtons } from './configButton'
// interface Button
interface IButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  configId: string;
}

//create button
const Button: React.FC<IButton> = ({onClick, configId}) => {
  //variable
  const { id, className, text, type } = configButtons[configId] as IConfigButtons
  
  //render
  return (
    <button onClick={onClick} id={id} type={type ? type : "button"} className={className}>{text}</button>
  )
}

export default Button