import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { context } from 'context/context';
import { useContext } from 'react';

export const DeleteModal = ({ openModal, handleClose, handleRemoveTodo }) => {
   const ctx = useContext(context);

   const handleDelAndClose = () => {
      handleRemoveTodo()
      ctx.getTodo(null)
      ctx.handleWorkSpaceActive(false)
      handleClose()
   };

   return (
      <Dialog
         open={openModal}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            Delete note
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Are you sure you want to delete the note?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelAndClose} autoFocus>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
}