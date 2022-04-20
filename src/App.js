import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'

//we are creating a layout component for our layout file
import Layout from './component/layout'

//createTheme is a librabry that allow us to set our style in the material UI librabry
const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightMedium: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})

//Theme provide is  a component that applied the changes made to the theme
function App() {
  return (
  <ThemeProvider theme={theme}>
    <Router>
      {/* as long as the layout component is wrapping the system, we can create a a nice layout for our system  */}
      <Layout>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
  );
}

export default App;
