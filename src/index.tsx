import ReactDOM from 'react-dom'
import { StylesProvider } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import './index.css'
import { App } from './App'

const app = (
  <StylesProvider injectFirst>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StylesProvider>
)

ReactDOM.render(app, document.getElementById('root'))
