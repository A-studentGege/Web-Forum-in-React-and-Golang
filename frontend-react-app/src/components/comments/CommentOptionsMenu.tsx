import { useState } from "react";

import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  onDeleteConfirm: () => void;
  onEditConfirm: (newContent: string) => void;
  commentContent: string;
};

export default function CommentOptionsMenu({
  onDeleteConfirm,
  onEditConfirm,
  commentContent,
}: Props) {
  // controls the option menu expanding
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // controls delete/update dialog opening
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // initialize comment content var
  const [content, setContent] = useState(commentContent);

  // close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      {/* option menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setEditOpen(true);
          }}
        >
          {"Edit"}
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setConfirmOpen(true);
          }}
        >
          {"Delete"}
        </MenuItem>
      </Menu>

      {/* dialog for editing comment */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>{"Edit your comment"}</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            autoFocus
            fullWidth
            multiline
            minRows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>{"Cancel"}</Button>
          <Button
            variant="contained"
            onClick={() => {
              onEditConfirm(content);
              setEditOpen(false);
            }}
          >
            {"Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for delete comment  */}
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
            {"Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
