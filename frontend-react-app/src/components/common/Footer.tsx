import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: "2px solid grey",
        display: "flex",
      }}
      component={"footer"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexGrow={1}
      >
        {/* left side */}
        <Typography fontWeight={400}>
          {"*Project Forum* made by Chen Fanggege"}
        </Typography>

        {/* right side */}
        <Stack direction={"row"}>
          <IconButton aria-label="email" href="mailto: cfanggege.sg@gmail.com">
            <EmailIcon />
          </IconButton>

          <IconButton
            aria-label="linkedin"
            href="https://www.linkedin.com/in/fanggege-chen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="github"
            target="_blank"
            href="https://github.com/A-studentGege"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
