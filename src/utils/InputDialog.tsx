import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { header } from "../context/constant";
import acceptBookingRequestService from "../api/BookingRequest/AcceptBookingRequest/acceptBookingRequestService";
import { IBookingRequestsVM } from "../components/Booking/IBookingRequests";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  BookingId?: string;
  bookingData?: IBookingRequestsVM;
}

export default function InputDialog({
  open,
  setOpen,
  BookingId,
  bookingData,
}: DialogProps) {


  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const reason = formJson.reason as string; // Cast to string

    if (bookingData) {
      const createOn = bookingData.createdOn
      const regDate = dayjs(createOn);
      const now = dayjs();
      const diffInMilliseconds = now.diff(regDate);
      bookingData.timer = diffInMilliseconds.toString()
      bookingData.bookingStatus = "Rejected"
      bookingData.rejectionReason = reason;
      console.log("bookingData", bookingData)
      let res = await callEditLeadAPI(bookingData, BookingId!)
      if (res.status === "success") {
        navigate(`/booking/reject`)
      }
    }

    handleClose();
  };

  const callEditLeadAPI = async (bookingForm: any, bookingId: string) => {
    try {
      const newBooking = await acceptBookingRequestService({
        header,
        bookingRequest: bookingForm,
        bookingId,
      });
      if (newBooking.status === "success") {
        return newBooking
      }
    } catch (response) {
      return []
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit, // Use the separate handleSubmit function
        }}
      >
        <DialogTitle>Reject </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the reason for rejection</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reason"
            name="reason"
            label="Enter Rejection Reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
