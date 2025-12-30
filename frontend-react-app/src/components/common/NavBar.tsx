import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import React from "react";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  marginLeft: theme.spacing(1),
}));

export default function NavBar() {
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
          <Typography variant="h6" noWrap sx={{ display: "flex", px: 1 }}>
            {"*Project Forum*"}
          </Typography>

          <Divider orientation="vertical" flexItem />

          <Search>
            <InputBase placeholder="Find everything you like" fullWidth />

            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Search>
        </Stack>

        <Stack direction={"row"} alignContent={"end"}>
          <Button variant="text" href="/create" endIcon={<CreateIcon />}>
            {"Create"}
          </Button>

          <Button variant="text" color="inherit" endIcon={<AccountBoxIcon />}>
            {"Profile"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
