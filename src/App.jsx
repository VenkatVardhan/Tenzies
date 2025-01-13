import { useState } from 'react'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Die from './components/Die'
function App() {


  const [diceArray,setDiceArray] = React.useState(()=>generateAllNewDice())
  const gameWon=(diceArray.every((die)=>die.isHeld) && diceArray.every((die)=>die.value===diceArray[0].value))
  const newGame = React.useRef(null)
  React.useEffect(()=>{
    if(gameWon){
        newGame.current.focus()
    }
      
  },[gameWon])
 function generateAllNewDice(){
      return new Array(10).fill({}).map(()=>({
        
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()}))
 }

function Roll(){
  if(!gameWon){
    setDiceArray((prevData)=>
       prevData.map((obj)=>
         (obj.isHeld)?obj:{...obj,value:Math.ceil(Math.random()*6)}
      )
    )

  }
  else{
    setDiceArray(generateAllNewDice())
  }
}

function handleClick(id){
  setDiceArray(prevDiceArray=>prevDiceArray.map((obj)=>{
    return (obj.id===id)?{...obj,isHeld:!obj.isHeld}:obj
  })
)
}

const diceElements= diceArray.map((ele)=>{
          return <Die key={ele.id} id={ele.id} value={ele.value} isHeld={ele.isHeld} handleClick={handleClick}/>
        })
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}

      </div>
      <button ref={newGame} onClick={Roll}className='dice-roll'>{gameWon?"New Game": "Roll"}</button>
      {gameWon? <Confetti/>:null}
    </main>
  )
}

export default App
