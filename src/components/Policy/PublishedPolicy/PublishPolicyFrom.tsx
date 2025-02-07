import React, { FC, useState } from "react";
import { PublishPolicyFromProps } from "./IPublish";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import toast, { Toaster } from "react-hot-toast";
import PublishPolicyServices from "../../../api/Policies/PublishPolicy/PublishPolicyServices";
import { useNavigate } from "react-router-dom";
import editBookingRequestService from "../../../api/BookingRequest/EditBookingRequest/editBookingRequestService";
import { header } from "../../../context/constant";
import editLeadService from "../../../api/Leads/EditLead/editLeadService";
import dayjs from "dayjs";
const PublishPolicyFrom: FC<PublishPolicyFromProps> = ({
  partners,
  policyNumber,
  leadId,
  bookingId,
  bookingCreated,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values: any) => {
    const { partner } = values;
    const payload = {
      isPublished: true,
      partnerName: partner.partnerName,
      partnerId: partner.partnerId,
      policyNumber: policyNumber,
    };
    try {
      setIsLoading(true);
      const res = await PublishPolicyServices(payload);
      if (res.message) {
        const bookingForm = new FormData();
        const createdOn = dayjs(bookingCreated);
        const now = dayjs();
        const diff = now.diff(createdOn);
        bookingForm.append("timer", diff.toString());
        bookingForm.append("bookingStatus", "Booked");
        callEditBookingApi(bookingForm, bookingId);
        navigate(-1);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message || "error occurred in published policy");
    } finally {
      setIsLoading(false);
    }
  };
  const callEditLeadAPI = async (leadForm: any, leadId: string) => {
    try {
      await editLeadService({
        header,
        lead: leadForm,
        leadId,
      });
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const callEditBookingApi = async (bookingForm: any, bookingId: string) => {
    try {
      const newLead = await editBookingRequestService({
        header,
        bookingRequest: bookingForm,
        bookingId,
      });

      if (newLead.status === "success" && leadId) {
        const leadForm = new FormData();
        leadForm.append("status", "Booked");
        callEditLeadAPI(leadForm, leadId!);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  return (
    <Card>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Existing Partner Name"
                    value={partners[1]?.partnerName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Requested Partner Name"
                    value={partners[0]?.partnerName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="partner">
                    {({ input, meta }) => (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            value={input.value || null}
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option.partnerName || ""
                            }
                            onChange={(event, newValue) =>
                              input.onChange(newValue ? newValue : "")
                            }
                            options={partners}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Correct Partner"
                                className="rounded-sm w-full"
                                size="small"
                                variant="outlined"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                    )}
                  </Field>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button size="medium" variant="contained" type="submit" disabled={isLoading}>
                   {isLoading?"Submitting...":"Submit"} 
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </CardContent>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Card>
  );
};

export default PublishPolicyFrom;
