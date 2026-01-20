import {
  styled,
  Box,
  Stack,
  Divider,
  Link,
  Typography,
  Button,
  IconButton,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "@/context/AuthContext";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  marginLeft: theme.spacing(1),
}));

const btnStyle = {
  textTransform: "none", // to disable all caps for button
};

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Box
      sx={{
        borderBottom: "2px solid grey",
        display: "flex",
        py: 0.5,
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} flexGrow={1}>
        <Stack direction={"row"} spacing={1} width={0.4} alignItems={"center"}>
          {/* clickable title send user back to home page */}
          <Link href="/" underline="hover" color="inherit">
            <Typography variant="h6" noWrap sx={{ px: 1 }}>
              {"*Project Forum*"}
            </Typography>
          </Link>

          <Divider orientation="vertical" flexItem />

          <Search>
            <InputBase placeholder="Find everything you like" fullWidth />

            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Search>
        </Stack>

        <Stack direction={"row"} alignContent={"end"}>
          {isAuthenticated && (
            <Button
              variant="text"
              href="/create"
              sx={btnStyle}
              endIcon={<CreateIcon />}
            >
              {"Create"}
            </Button>
          )}

          {!isAuthenticated ? ( // if not logged in, show login button only
            <Button
              variant="text"
              color="inherit"
              href="/login"
              endIcon={<AccountBoxIcon />}
            >
              {"Login"}
            </Button>
          ) : (
            // else show profile (username) and logout buttons
            <>
              <Button
                variant="text"
                color="inherit"
                sx={btnStyle}
                endIcon={<AccountBoxIcon />}
              >
                {"Hello, " + user?.username}
              </Button>
              <Button
                variant="text"
                onClick={logout}
                color="error"
                sx={btnStyle}
                endIcon={<LogoutIcon />}
              >
                {`Logout`}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
