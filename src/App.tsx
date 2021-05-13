import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from './navbar'
import { BookDetail } from './pages/book-detail'
import { Books } from './pages/books'
import { Home } from './pages/home'
import { NewBook } from './pages/new-book'
import { NotFound } from './pages/not-found'

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/new" component={NewBook} />
        <Route exact path="/books/:id" component={BookDetail} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}
