import React, { useState } from 'react'
import axios from 'axios'
import { Container, InputGroup } from 'react-bootstrap'
/* import './App.css' */

function App() {
  // destructure of data
  const[data,setData]=useState('');
  // search word from api
  const[word,setWord]=useState('');
  function getmeaning(){
      axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
      .then((res)=>{
        setData(res.data[0]);
      })
  }
  const playAudio=()=>{
    let audio=new Audio(data.phonetics[0].audio);
    audio.play();
}
  return (
    <>
      <div className=''>
        <Container className='p-3 w-50'>
          <h1 style={{fontFamily:'Cursive', fontWeight:'bold'}} className='text-success text-center mb-5'>Free Dictionary</h1>
          <div class="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search........" name="word" onChange={(e)=>setWord(e.target.value)} />
            <button onClick={getmeaning} className="input-group-text bg-success"><i class="bi bi-search"></i></button>
          </div>

          {data && (
            <div>
              <h1>{data.word}{" "} <button type='button' className='btn btn-success fs-4 ' onClick={()=>{playAudio()}}><i class="bi bi-volume-up"></i></button></h1>
              <h4 className='text-success'>Part of speech: </h4>
              <p>{data.meanings[0].partOfSpeech}</p>
              <h4 className='text-success'>Definition: </h4>
              <p>{data.meanings[0].definitions[0].definition}</p>
              <h4 className='text-success'>Example: </h4>
              <p>{data.meanings[0].definitions[0].example}</p>
            </div>
          )}
        </Container>

      </div>
    </>
  )
}

export default App
