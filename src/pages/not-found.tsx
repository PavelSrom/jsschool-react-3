import { Container, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import SentimentDissatisfiedOutlined from '@material-ui/icons/SentimentDissatisfiedOutlined'

export const NotFound: React.FC = () => {
  const history = useHistory()

  return (
    <Container fixed maxWidth="lg" className="flex min-h-screen">
      <div className="m-auto flex flex-col justify-center items-center">
        <SentimentDissatisfiedOutlined className="w-48 h-48" />
        <h1 className="text-3xl">This page does not exist</h1>

        <Button
          variant="contained"
          color="primary"
          className="mt-16"
          onClick={() => history.goBack()}
        >
          Go back
        </Button>
      </div>
    </Container>
  )
}
