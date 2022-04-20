//importing react and lifecycle  hooks for state management
import React, { useEffect, useState} from 'react'
import { Container, Grid , Paper} from '@material-ui/core'
import NoteCard from '../component/noteCard'
import Masonry from 'react-masonry-css'

//the functionality is use with JSON server
//JSON server is a file that can interact with our system and our data is stored in that data
//what ever functionality we do, it affect our file whether we add or remove data

export default function Notes() {

  const [ notes, setNotes ] = useState([])

  //useeffect run a function when a component load and it grabs what it need to run a function
  useEffect( () =>{
    fetch('http://localhost:8000/notes')
    //json method takes the json and pass it to the function
      .then(res =>  res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete  = async(id) => {
    await  fetch('http://localhost:8000/notes/' + id, {
      method : 'DELETE'
    })

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  //setting spacing for screens with column
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  //apply masonry for aligning grid
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(note =>(
          <div item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note}  handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
