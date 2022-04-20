import React, { useState } from 'react'
//import typography and button and container and makestyles so on and so forth
import { Typography, Button, Container, makeStyles, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@material-ui/core'
//importing the icons package to load in icons
import { AcUnit, Send, KeyboardArrowRight } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

//makestyles is a function that allow us to create css classes in javascript object that return a hook
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})


export default function Create() {
//The Typography component makes it easy to apply a default set of font weights and sizes in your application for text.
//container put the content in a container
// button is a component that has already styled button classes

//calling the syntax for styles
const classes = useStyles()

const history = useHistory()

//creating state in react by adding useState
const [ title, setTitle] = useState('')
const [details, setDetails] = useState('')

//creating state for error data
const [ titleError, setTitleError] = useState(false)
const [detailsError, setDetailsError] = useState(false)

const [ category, setCategory] = useState('todos')
// const [detailsError, setDetailsError] = useState(false)
//function for handling submit for data
const handleSubmit = (e) => {
  //default action of the form
  e.preventDefault()

  //set the title error event to false
  setTitleError(false)
  setDetailsError(false)

  //conditional statement for title error
  if( title == ''){
    setTitleError(true)
  } 

  if( details == ''  ){
    setDetailsError(true)
  }

  //conditional statement when data has content
  if(title && details ){
    fetch(' http://localhost:8000/notes' , {
      method: 'POST',
      headers: { "Content-type": "application/json"},
      body: JSON.stringify({title, details, category})
    }).then( () => history.push('/'))
  }
}

  return (
    //variant are props that are passed to change the component style like heading size and other props are pass too
    <Container>
      <div>
        <Typography
          variant= "h6"
          color="textSecondary"
          component ="h2"
          gutterBottom
        >
          Create a New Note
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={ (e)=>  setTitle(e.target.value)}
            className= {classes.field}
            label = " Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required 
            error = {titleError}
          />
          <TextField
            onChange={ (e)=>  setDetails(e.target.value)}
            className= {classes.field}
            label = " Details"
            variant="outlined"
            color="secondary"
            multiline
            minRows = {4}
            fullWidth
            required 
            error= {detailsError}
          />
          <FormControl className={classes.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup value={ category } onChange = { (e) => setCategory(e.target.value)}>
              <FormControlLabel value="money"  control={ <Radio /> } label = "Money"/>
              <FormControlLabel value="todos"  control={ <Radio /> } label = "Todos"/>
              <FormControlLabel value="reminders"  control={ <Radio /> } label = "Reminders"/>
              <FormControlLabel value="work"  control={ <Radio /> } label = "work"/>
            </RadioGroup>
          </FormControl>

          <Button
            type="submt"
            color="secondary"
            variant="contained"
            endIcon = { <KeyboardArrowRight />}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )
}
