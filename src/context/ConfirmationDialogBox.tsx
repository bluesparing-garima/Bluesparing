// //import { useNavigate } from "react-router-dom";
// import styled from "@emotion/styled";
// import { spacing } from "@mui/system";
// import {
//   Button as MuiButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Paper as MuiPaper,
//   DialogContentText,
//   LinearProgress as MuiLinearProgress,
//   DialogTitle,
// } from "@mui/material";

// const Button = styled(MuiButton)(spacing);
// //Confirm function
// const LinearProgress = styled(MuiLinearProgress)(spacing);
// const Paper = styled(MuiPaper)(spacing);

// function ConfirmationDialogBox(props: any) {
//   const { onClose, open } = props;
//   //const navigate = useNavigate();
//   const { dialogResponse, setDialogResponse } = props;
//   const handleClose = () => {
//     onClose(!open);
//   };
//     const onConfirm = async () => {
//       navigate(
//         dialogResponse.isConnector
//           ? "/x"
//           : dialogResponse.isAdventure
//           ? "/y"
//           : dialogResponse.isDevice
//           ? "/z"
//           : ""
//       );
//     };
//   return (
//     <Dialog
//       onClose={handleClose}
//       aria-labelledby="confimation-dialog-title"
//       aria-describedby="confimation-dialog-description"
//       open={dialogResponse.open}
//     >
//       <DialogTitle id="confimation-dialog-title">
//         {dialogResponse.title}
//       </DialogTitle>
//       <DialogContent>
//         <Paper>
//           {dialogResponse.isLoading ? <LinearProgress my={2} /> : null}
//         </Paper>
//         <DialogContentText id="confimation-dialog-description">
//           {dialogResponse.message}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           color="primary"
//           onClick={() => setDialogResponse({ ...dialogResponse, open: false })}
//         >
//           Close
//         </Button>
//         <Button
//           style={
//             dialogResponse.isView ? { display: "visible" } : { display: "none" }
//           }
//           color="primary"
//           onClick={() => onConfirm()}
//           autoFocus
//         >

//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default ConfirmationDialogBox;
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  data: any; // or you can define a specific type
  onAction: (data: any) => void;
}

const ConfirmationDialogBox: React.FC<MyDialogProps> = ({
  open,
  onClose,
  title,
  content,
  data,
  onAction,
}) => {
  const handleAction = () => {
    onAction(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data}</pre>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre>{" "} */}
        {/* Displaying passed data */}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="bg-safekaroDarkBlue"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          style={
            title !== "Payment Details"
              ? { display: "visible" }
              : { display: "none" }
          }
          onClick={handleAction}
          color="success"
          className="text-safekaroDarkOrange"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogBox;
