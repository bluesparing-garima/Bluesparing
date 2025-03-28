import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DynamicTextField from "../../../utils/ui/DynamicTextField";
import { Grid } from "@mui/material";
import { Form } from "react-final-form";
import AddRemarksService from "../../../api/Policies/AddReamks/AddRemarksService";
interface AddRemarksModalProps {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  policyId: string;
}
const AddRemarksModal: React.FC<AddRemarksModalProps> = ({
  handleClose,
  handleOpen,
  open,
  policyId,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await AddRemarksService({ policyRemarks: data.remarks, policyId });
      handleClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Remarks </DialogTitle>
        <DialogContent>
          <Form
            mt={2}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError, submitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid spacing={1}>
                  <DynamicTextField
                    name="remarks"
                    label="Enter Remarks"
                    multiline
                    rows={4}
                    gridProps={{ lg: 12, md: 12, sm: 12, xs: 12 }}
                  />
                </Grid>
                <Grid container spacing={2} mt={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {submitError && (
                      <div className="error text-safekaroDarkOrange">
                        {submitError}
                      </div>
                    )}
                    <Button
                      disabled={isLoading}
                      variant="contained"
                      type="submit"
                    >
                     {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddRemarksModal;
