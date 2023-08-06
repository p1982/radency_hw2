import React from 'react'
import { configSelects } from './configSelect'
//interface select
interface ISelect {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  configId: string;
  value: string;
}

//create select
export const Select: React.FC<ISelect> = ({ configId, onChange, value }) => {
  //variables
  const { options } = configSelects[configId]

  //render
  return (
    <select className="w-[100%] p-2 rounded-md border-2 border-sky-500" value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
