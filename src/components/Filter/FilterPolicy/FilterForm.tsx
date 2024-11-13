import { Form, Field } from "react-final-form";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { header } from "../../../context/constant";
import getPolicyDataByPolicyNumberService from "../../../api/Policies/getPolicyDataByPolicyNumber/getPolicyDataByPolicyNumberService";
import getPolicyDataByVehicleNumberService from "../../../api/Policies/getPolicyDataByVehicleNumber/getPolicyDataByVehicleNumberService";
import { useState } from "react";
import FilterDataTable from "./FilterDataTable";
import { MotorPolicyData } from "../IFilter";
const FilterForm = () => {
  const [motorPolicies, setMotorPolicies] = useState<MotorPolicyData | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [noRecordsFound, setNoRecordsFound] = useState(false);
  const onSubmit = async (values: any) => {
    setMotorPolicies(null);
    const { policyNumber, vehicleNumber } = values;
    setIsLoading(true);
    setNoRecordsFound(false);
    if (!policyNumber && !vehicleNumber) {
      toast.error("Please enter either Policy Number or Vehicle Number");
      setIsLoading(false);
      return;
    }
    try {
      switch (true) {
        case !!policyNumber && !vehicleNumber:
          try {
            const resPolicy = await getPolicyDataByPolicyNumberService({
              header,
              policyNumber,
            });
            if (resPolicy.success) {
              setMotorPolicies(resPolicy.data);
            }
          } catch (error: any) {
            setNoRecordsFound(true);
            const err = await error;
            toast.error(err.message);
          }
          break;
        case !policyNumber && !!vehicleNumber:
          try {
            const resVehicle = await getPolicyDataByVehicleNumberService({
              header,
              vehicleNumber,
            });
            if (resVehicle.success) {
              setMotorPolicies(resVehicle.data);
            }
          } catch (error: any) {
            setNoRecordsFound(true);
            const err = await error;
            toast.error(err.message);
          }
          break;
        case !!policyNumber && !!vehicleNumber:
          try {
            const resPolicy = await getPolicyDataByPolicyNumberService({
              header,
              policyNumber,
            });
            if (resPolicy.success) {
              setMotorPolicies(resPolicy.data);
            }
          } catch (error: any) {
            try {
              const resVehicle = await getPolicyDataByVehicleNumberService({
                header,
                vehicleNumber,
              });
              if (resVehicle.success) {
                setMotorPolicies(resVehicle.data);
              }
            } catch (innerError: any) {
              setNoRecordsFound(true);
              const err = await innerError;
              toast.error(err.message);
            }
          }
          break;
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Card>
        <CardContent>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2} alignItems="center" direction="row">
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="policyNumber">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          size="small"
                          fullWidth
                          label="Enter Policy Number"
                          variant="outlined"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, "");
                            input.onChange(value);
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="vehicleNumber">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          size="small"
                          fullWidth
                          label="Enter Vehicle Number"
                          variant="outlined"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, ''); 
                            input.onChange(value);
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
          {motorPolicies ? (
            <FilterDataTable policy={motorPolicies} />
          ) : noRecordsFound ? (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              mt={2}
            >
              No records found
            </Typography>
          ) : null}
        </CardContent>
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default FilterForm;
