import { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Button, Container, MenuItem, Paper, TextField } from '@material-ui/core'
import { useDocument } from '../hooks/use-document'
import { BookDTO } from '../types'

export const NewBook: React.FC = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState<Omit<BookDTO, 'id'>>({
    name: '',
    author: '',
    category: '',
    price: 10,
  })

  const { add } = useDocument<BookDTO>('books')

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // prevent submission and display error if form not completed
    if (Object.values(formData).some(val => !val)) {
      enqueueSnackbar('Invalid form values', { variant: 'error' })
      return
    }

    try {
      await add(formData)
      enqueueSnackbar('Book added', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(err.message ?? 'Cannot add book', { variant: 'error' })
    } finally {
      history.push('/books')
    }
  }

  return (
    <Container fixed maxWidth="lg">
      <p className="text-3xl text-green-700 font-semibold text-center my-8">
        Add new book
      </p>

      <Paper className="w-96 p-4 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            fullWidth
            name="name"
            label="Book name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="author"
            label="Book author"
            variant="outlined"
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            select
            name="category"
            label="Book category"
            variant="outlined"
            value={formData.category}
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
            value={formData.price}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Add
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
