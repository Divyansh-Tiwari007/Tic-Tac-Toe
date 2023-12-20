import {useState} from 'react';
 export default function Player({name, symbol, isActive, onChangeName})
{
  const [edited, setEdit] = useState(false);
  const [named, setname] = useState(name);
  
  function handleEdit() {
    setEdit((editing) => !editing);
    if(edited)
      onChangeName(symbol, named)
  }
  
  function handleChange(event){
    setname(event.target.value);
  }
  
  let playerName = <span className="player-name">{named}</span>
  if(edited){
    playerName = <input type="text" required defaultValue={named} value={named} onChange={handleChange}></input>
  }

  return (
    <li className={isActive ? 'active' : ''}>
            <span className="player">
            {playerName}
            <span className="player-Symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{edited ? 'Save' : 'Edit'}</button>
    </li>
  )
}