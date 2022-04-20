//Page for our layout 
//makestyle is a method that pass in data
//drawer is a component for creating sidebar
//List is a component for creating list
//ListItem is a component for specifying the item in a list component
//ListItemText is for previewing text
//ListItemIcon is for previewing Icon
//appbar is the component for wrapping the toolbar and it specify the bar section
//The toolbar provides content in the appbar
import { makeStyles, Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, Avatar } from '@material-ui/core'
//icons for menu icons
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
//importing react  from react
import React from 'react'
//react  router DOM for hooks
import { useHistory, useLocation } from 'react-router-dom'
import { format } from 'date-fns'

const drawerWidth = 240

//make style is a function to apply classes to react
//to inject theme object into the makestyles we add
const useStyles = makeStyles( (theme)=>{
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: 'flex'
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      width: `calc(100% -  ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})


export default function Layout({ children}) {
  //life cycle hooks to be used in our app and called
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  //menu item that are passed in our code dynamically
  const menuItems = [
    {
      text: ' My Notes',
      icon: <SubjectOutlined  color="secondary"/>,
      path: '/'
    }, 
    {
      text: ' Create Notes',
      icon: <AddCircleOutlineOutlined  color="secondary"/>,
      path: '/create'
    }
  ]

  //returning our layout for rendering pages
  return (
    <div className= {classes.root}>
      {/* app bar */}
      <AppBar
        className={classes.appbar}
        elevation= {0}
      >
        <Toolbar>
          <Typography className = {classes.date}>
            Today is the{ format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>
            Stephen
          </Typography>
          <Avatar src="/avatar.jpg" className={classes.avatar}/>
        </Toolbar>
      </AppBar>

      {/* side draw */}
      {/* We are overiding the paper inside the drawer amd making it wider by adding the css style syntax for react*/}
      <Drawer
        className= { classes.drawer}
        variant = "permanent"
        anchor='left'
        classes={ { paper: classes.drawerPaper}}
      >
        {/* The heading text that comes after the drawer */}
        <div>
          <Typography variant= "h5" className= {classes.title}>
            Ninja Notes
          </Typography>
        </div>

        {/* list / links */}
        {/* loading list dynamically */}
        <List>
          { menuItems.map( item => (
            <ListItem
              button
              key={item.text}
              onClick = {() => history.push(item.path)}
              className = { location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )) }
        </List>
      </Drawer>

      {/* adding another component with the props of children to pass the children of the layout value */}
      <div className={classes.page}>
        <div className= {classes.toolbar}></div>
        {children}
      </div>

    </div>
  )
}
