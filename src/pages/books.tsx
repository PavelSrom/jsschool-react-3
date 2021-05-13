import { Container, IconButton, Paper, Tooltip, Fab } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import { useCollection } from '../hooks/use-collection'
import { BookDTO } from '../types'

export const Books: React.FC = () => {
  const history = useHistory()
  const { data: books, isError } = useCollection<BookDTO[]>('books')

  return (
    <Container fixed maxWidth="lg" className="min-h-screen">
      <p className="text-3xl text-green-700 font-semibold text-center my-8">View books</p>

      {isError && <p className="text-center">Something went wrong :(</p>}
      {!isError && books && (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-12 gap-4">
              {books.map(({ id, name, author }) => (
                <div key={id} className="col-span-3">
                  <Paper className="p-4 rounded-lg h-full flex flex-col">
                    <p className="text-xl font-semibold mb-4">{name}</p>
                    <div className="flex justify-between mt-auto">
                      <p>{author}</p>
                      <Tooltip title="View book detail">
                        <IconButton
                          size="small"
                          onClick={() => history.push(`/books/${id}`)}
                        >
                          <Add className="text-blue-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Paper>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl">(There are no books to show)</p>
          )}
        </>
      )}

      <Tooltip title="Add new book">
        <Fab
          color="secondary"
          className="fixed bottom-4 right-4"
          onClick={() => history.push('/books/new')}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Container>
  )
}
