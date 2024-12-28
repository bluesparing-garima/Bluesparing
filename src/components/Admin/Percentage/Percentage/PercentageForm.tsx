import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
  Typography,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { header } from "../../../../context/constant";
import { useEffect, useState } from "react";
import useGetProducts from "../../../../Hooks/Product/useGetProducts";
import useGetProductSubTypes from "../../../../Hooks/Product/useGetProductSubTypes";
import { IProductSubTypes } from "../../ProductSubType/IProductSubTypes";
import useGetCompanies from "../../../../Hooks/Company/useGetCompanies";
import useGetMakes from "../../../../Hooks/Make/useGetMakes";
import useGetModels from "../../../../Hooks/Model/useGetModels";
import useGetFuelTypes from "../../../../Hooks/FuelType/useGetFuelTypes";
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers";
import { IModels } from "../../Model/IModel";
import { IProducts } from "../../Product/IProduct";
import useGetCaseTypes from "../../../../Hooks/CaseType/useGetCaseTypes";
import useGetPolicyTypes from "../../../../Hooks/Policy/useGetPolicyTypes";
import { IMakes } from "../../Make/IMake";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IPercentagePolicy } from "../ICommission";
import addPercentageService from "../../../../api/percentageUpdate/AddPercenatage/addPercentageService";
import toast, { Toaster } from "react-hot-toast";
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import { useNavigate } from "react-router-dom";
const PercentageForm = () => {
  let [products] = useGetProducts({ header: header,category:"motor" });
  let [companies] = useGetCompanies({ header: header });
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [makes] = useGetMakes({ header: header });
  let [models] = useGetModels({ header: header });
  let [fuelTypes] = useGetFuelTypes({ header: header });
  let [brokers] = useGetBrokers({ header: header });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  const [isVisibile, setIsVisibile] = useState(false);
  const [selectedMake, setSelectedMake] = useState<IMakes>();
  const [filteredSubModels, setFilteredSubModels] = useState<IModels[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
const navigate = useNavigate()
  useEffect(() => {
    if (selectedMake) {
      const MakeId = selectedMake._id;
      setFilteredSubModels(models.filter((sub) => sub.makeId === MakeId));
    } else {
      setFilteredSubModels(models);
    }
  }, [selectedMake, models]);
  useEffect(() => {
    if (selectedProduct) {
      const ProductId = selectedProduct._id;
      if (selectedProduct.productName === "Goods carrying vehicle") {
        setIsVisibile(true);
      } else {
        setIsVisibile(false);
      }
      setFilteredSubcategories(
        productSubTypes.filter((sub) => sub.productId === ProductId)
      );
    } else {
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };
  const validationSchema = yup.object().shape({
    policyType: yup.string().required("Policy Type is required").nullable(),
    caseType: yup.string().nullable().required("Case Type is required"),
    productType: yup.string().nullable().required("Product Type is required"),
    companyName: yup.string().nullable().required("Company Name is required"),
    make: yup.string().required("Make is required").nullable(),
    model: yup.string().nullable().required("Model is required"),
    broker: yup.string().nullable().required("Broker Name is required"),
    fuelType: yup.string().nullable().required("Fuel Type is required"),
    cc: yup.string().nullable().required("cc is required"),
    ncb: yup.string().nullable().required("NCB is required"),
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().required("End Date is required").nullable(),
    partnerName: yup.string().nullable().required("Partner Name is required"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (policyFilter: IPercentagePolicy) => {
    policyFilter.partnerId = selectedPartnerId;
    policyFilter.partnerName = partnerName;
    try {
    const res =   await addPercentageService({
        header,
        policy: policyFilter,
      });
      if(res.status ==="success"){
        navigate("/policy/motor-policies")
      }
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, errors }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="policyType">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="policyType"
                          value={input.value !== undefined ? input.value : null}
                          options={policyTypes}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.policyType || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue.policyType);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Policy Type"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="caseType">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="caseType"
                          options={caseTypes}
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.caseType || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue.caseType);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Case Type"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="productType">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          value={input.value !== undefined ? input.value : null}
                          options={products}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.productName || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue.productName);
                            setSelectedProduct(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Product"
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
              {filteredSubcategories && filteredSubcategories.length > 0 && (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="subCategory">
                    {({ input, meta }) => (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            value={input.value || null}
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option.productSubType || ""
                            }
                            onChange={(event, newValue) =>
                              input.onChange(newValue.productSubType)
                            }
                            options={filteredSubcategories}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=" Select Sub Category"
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
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="companyName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="companyName"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.companyName || ""
                          }
                          options={companies}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.companyName);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Company Name"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="broker">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="broker"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.brokerName} - ${option.brokerCode}` ||
                                ""
                          }
                          options={brokers}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.brokerName);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Broker"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="partnerName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="partnerName"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.fullName} - ${option.partnerId}` || ""
                          }
                          options={partners}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              input.onChange(newValue.fullName);
                              setPartnerName(newValue.fullName);
                              setSelectedPartnerId(newValue._id);
                            } else {
                              input.onChange(null);
                              setSelectedPartnerId("");
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="rounded-sm w-full"
                              size="small"
                              label="Select Partners"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="make">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="make"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.makeName || ""
                          }
                          options={makes}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.makeName);
                            setSelectedMake(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Make"
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
              {filteredSubModels && filteredSubModels.length > 0 && (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="model">
                    {({ input, meta }) => (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            id="model"
                            value={
                              input.value !== undefined ? input.value : null
                            }
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option.modelName || ""
                            }
                            options={filteredSubModels}
                            onChange={(event, newValue) => {
                              input.onChange(newValue.modelName);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=" Select Model"
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
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="fuelType">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="fuelType"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.fuelType || ""
                          }
                          options={fuelTypes}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.fuelType);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Fuel Type"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="ncb">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="ncb"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.label || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue ? newValue.value : null);
                          }}
                          options={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" },
                          ]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select NCB"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="vehicleAge">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="vehicleAge"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.label || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue ? newValue.value : null);
                          }}
                          options={[
                            { label: "0 years", value: "0 year" },
                            { label: "1-2 years", value: "1-2 year" },
                            { label: "3-5 years", value: "3-5 year" },
                            { label: ">5 years", value: ">5 year" },
                          ]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Vehicle Age"
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
              {isVisibile ? (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="weight">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        size="small"
                        label="Enter Weight"
                        type="number"
                        fullWidth
                        variant="outlined"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
              ) : (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="seatingCapacity">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        size="small"
                        fullWidth
                        type="number"
                        label="Enter Seating Capacity"
                        variant="outlined"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="rto">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      label="Enter RTO"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="cc">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      label="Enter CC"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="startDate">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start Date"
                        value={input.value || null}
                        onChange={(date) => input.onChange(date)}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="endDate">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="End Date"
                        value={input.value || null}
                        onChange={(date) => input.onChange(date)}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  className="text-safekaroDarkOrange"
                  gutterBottom
                  display="inline"
                >
                  Pay In Values
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Field name="payInODPercentage">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter PayIn OD Percentage"
                      placeholder="Enter Pay In OD%"
                      variant="outlined"
                      type="number"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Field name="payInTPPercentage">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      type="number"
                      label="Enter PayIn TP Percentage"
                      placeholder="Enter PayIn TP%"
                      variant="outlined"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  className="text-safekaroDarkOrange"
                  gutterBottom
                  display="inline"
                >
                  Pay Out Values
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Field name="payOutODPercentage">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      label="Enter PayOut OD Percentage"
                      placeholder="Enter PayOut OD%"
                      variant="outlined"
                      type="number"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Field name="payOutTPPercentage">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      type="number"
                      size="small"
                      label="Enter PayOut TP Percentage"
                      placeholder="Enter PayOut TP %"
                      variant="outlined"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {"Update Policies Percentage"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default PercentageForm;
