import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Link href="/">
            <Box sx={{ flexGrow: 0, p: 1 }}>
              <Typography variant="h6" component="div">
                Goreeva
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 0, p: 1 }}>
            <Typography variant="h6" component="div">
              saving....
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
