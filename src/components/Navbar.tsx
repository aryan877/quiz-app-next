import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Goreeva
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
