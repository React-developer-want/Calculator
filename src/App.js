import React, { useState } from "react";
import data from './Components/data.js';
import Btn from './Components/Btn.js';

function App() {

  const [darkTheme, setDarkTheme] = useState(false);

  const [result, setResult] = useState('');

  function handleClick(element){
    if(result.length <= 20){
      if(element === 'AC'){
        setResult('');
      }else if(element === 'Cl'){
        setResult((prev) => prev = prev.substring(0,prev.length-1));
      }else if(element === '='){
        showFinalResult(result);
      }else{
        setResult((prev)=> prev + element);
      }
    }
  }

  function Operation(op , first , second){
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case 'X':
        return first * second;
      case '/':
        return first / second;
      default:
        break;
    }
  }

  function showFinalResult(str){
    if(isNaN(str[0]) || isNaN(str[str.length-1])){
      setResult('Invalid Value!');
    }

    let first = 0, final = 0 , currOp = -1;
    for(let i=0;i<str.length;i++){
      if(isNaN(str[i])){
        if(currOp === -1){
          first = Number.parseFloat(str.substring(0,i));
        }else{
          let second =  Number.parseFloat(str.substring(currOp+1,i));
          first = Operation(str[currOp] , first, second);

        }
        currOp = i;
      }
    }
    let second =  Number.parseFloat(str.substring(currOp+1,str.length));
    final = Operation(str[currOp] , first, second); 
    setResult(final.toString());
  }

  return (
    <div className={darkTheme ? 'dark' : ''}>

    <div className="flex justify-start items-center w-100 h-[100vh] flex-col" >

      <button className="dark:bg-gray-700 bg-white p-3 my-10 shadow-lg rounded-lg dark:text-white" onClick={ () => setDarkTheme(!darkTheme) }> {darkTheme ? 'Light 💡' : 'Dark 🌙'} </button>

      <div className="w-[70vw] lg:w-[50vw] h-auto shadow-lg rounded-lg p-3 border-2 border-black dark:bg-gray-700 dark:text-white ">
        
        <div className="text-2xl w-100 h-20 rounded-lg p-3 flex items-end justify-end">
          {result}
        </div>

        <div className="grid grid-cols-4 grid-row-5">

          {data.map((card,id)=>{

            return <Btn
            key = {id}
            title = {card.title}
            color = {card.color}
            click = {handleClick}

            />

          })}

        </div>
      </div>
    </div>
    </div>  
  );
}

export default App;
