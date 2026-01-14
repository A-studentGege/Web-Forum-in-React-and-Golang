import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { useState } from "react";

type Props = {
  onDeleteConfirm: () => void;
};

export default function CommentOptionsMenu({ onDeleteConfirm }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{"Edit"}</MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setConfirmOpen(true);
          }}
        >
          {"Delete"}
        </MenuItem>
      </Menu>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{"Delete Comment"}</DialogTitle>
        <DialogContent>
          <DialogContentText whiteSpace={"pre-line"}>
            {
              "Are you sure you want to delete this comment?\nThis action cannot be undone"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>{"Cancel"}</Button>
          <Button color="error" onClick={onDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
