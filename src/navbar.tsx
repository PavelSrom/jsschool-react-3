import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

const links: { url: string; label: string }[] = [
  {
    url: '/',
    label: 'Home',
  },
  {
    url: '/books',
    label: 'All books',
  },
  {
    url: '/books/new',
    label: 'New book',
  },
]

export const Navbar: React.FC = () => {
  const location = useLocation()

  return (
    <AppBar position="static">
      <Toolbar>
        <nav className="w-96 mx-auto flex justify-between items-center">
          {links.map(({ url, label }) => (
            <Typography
              key={url}
              component={Link}
              to={url}
              className={location.pathname === url ? 'text-green-300' : 'text-white'}
            >
              {label}
            </Typography>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  )
}
