import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../context/AuthContext";

import React from "react";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  marginLeft: theme.spacing(1),
}));

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();

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
            <Button variant="text" href="/create" endIcon={<CreateIcon />}>
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
            // else show profile and logout buttons
            // **try show current username (GET /user/me)
            <>
              <Button variant="text" endIcon={<AccountBoxIcon />}>
                {`Profile`}
              </Button>
              <Button variant="text" onClick={logout} endIcon={<LogoutIcon />}>
                {`Logout`}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
