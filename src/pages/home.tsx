import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const Home: React.FC = () => {
  const history = useHistory()

  return (
    <div className="flex-1 flex justify-center items-center">
      <Button variant="contained" color="primary" onClick={() => history.push('/books')}>
        Go to books
      </Button>
    </div>
  )
}
