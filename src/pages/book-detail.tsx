import { useParams, useHistory } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDocument } from '../hooks/use-document'
import { BookDTO } from '../types'
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Dialog,
  TextField,
  MenuItem,
} from '@material-ui/core'

export const BookDetail: React.FC = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { enqueueSnackbar } = useSnackbar()
  const [isUpdating, setIsUpdating] = useState<BookDTO | undefined>()
  const {
    data: bookDetail,
    loading,
    error,
    get,
    update,
    remove,
  } = useDocument<BookDTO>('books')

  useEffect(() => {
    get(params.id)

    // eslint-disable-next-line
  }, [params.id])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!!isUpdating) {
      setIsUpdating(prev => ({ ...prev!, [e.target.name]: e.target.value }))
    }
  }

  const handleUpdate = async (): Promise<void> => {
    if (!!isUpdating) {
      const { id, ...values } = isUpdating

      try {
        await update(id, values)
        enqueueSnackbar('Book updated', { variant: 'success' })
      } catch (err) {
        enqueueSnackbar(err.message ?? 'Cannot update book', { variant: 'error' })
      } finally {
        history.push('/books')
      }
    }
  }

  const handleRemove = async (): Promise<void> => {
    try {
      await remove(params.id)
      history.push('/books')
      enqueueSnackbar('Book removed', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(err.message ?? 'Cannot remove book', { variant: 'error' })
    }
  }

  if (!!error) return <p className="text-center">Something went wrong :(</p>
  if (loading || !bookDetail)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress color="primary" />
      </div>
    )

  return (
    <Container fixed maxWidth="lg" className="min-h-screen space-y-8">
      <p className="text-3xl text-green-700 font-semibold text-center">
        {bookDetail.name}
      </p>

      <div className="w-2/5 mx-auto space-x-4">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setIsUpdating(bookDetail)}
        >
          Update
        </Button>
        <Button color="secondary" variant="contained" onClick={handleRemove}>
          Remove
        </Button>
      </div>

      <Paper className="w-2/5 mx-auto p-4 flex justify-between items-center">
        <div className="text-xl">
          <p>Author: {bookDetail.author}</p>
          <p>Category: {bookDetail.category}</p>
        </div>
        <p className="text-3xl text-red-500">${bookDetail.price}</p>
      </Paper>

      <Dialog open={!!isUpdating} onClose={() => setIsUpdating(undefined)}>
        <p className="text-3xl text-green-700 font-semibold text-center my-8">
          Update book
        </p>

        {/* if we don't use this condition, MUI text fields complain about having
				undefined as a value, so we always re-create the form whenever the dialog
				should be open
				*/}
        {!!isUpdating && (
          <Paper className="w-96 p-4 mx-auto">
            <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
              <TextField
                fullWidth
                name="name"
                label="Book name"
                variant="outlined"
                value={isUpdating?.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="author"
                label="Book author"
                variant="outlined"
                value={isUpdating?.author}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                select
                name="category"
                label="Book category"
                variant="outlined"
                value={isUpdating?.category}
                onChange={handleChange}
              >
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="novel">Novel</MenuItem>
                <MenuItem value="poetry">Poetry</MenuItem>
              </TextField>
              <TextField
                fullWidth
                type="number"
                inputProps={{ min: 1 }} // prevent negative values
                name="price"
                label="Book price"
                variant="outlined"
                value={isUpdating?.price}
                onChange={handleChange}
              />

              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Add
              </Button>
            </form>
          </Paper>
        )}
      </Dialog>
    </Container>
  )
}
