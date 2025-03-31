import { Button, Card, CardContent, FormLabel, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UploadPolicyPdfService from '../../../api/Policies/UploadPolicyPdf/UploadPolicyPdfService';

interface UploadPolicyPdfProps {
    leadId: string;
    policyNumber: string;
}

interface UploadProps {
    policyPdf?: File;
}

const UploadPolicyPdf = () => {
    const location = useLocation();
    const propsData = location.state as UploadPolicyPdfProps;
    const navigate = useNavigate();
    const onSubmit = async (data: UploadProps) => {
        if (!propsData?.policyNumber || !propsData?.leadId || !data.policyPdf) {
            return;
        }

        const formData = new FormData();
        formData.append("policyNumber", propsData.policyNumber);
        formData.append("leadId", propsData.leadId);
        formData.append("policyPdf", data.policyPdf);

        try {
            const response = await UploadPolicyPdfService(formData);
            if (response.success) {
                navigate("/lead");
            }
        } catch (error) {
            throw error
        }
    };


    return (
        <div className="bg-blue-200 md:p-7 p-2">
            <Paper elevation={3} className="p-5">
                <Typography variant="h5" className="text-safekaroDarkOrange" gutterBottom>
                    Upload Policy PDF
                </Typography>
                <Typography variant="h6" mb={2}>
                    <Link to="/operationdashboard" className="text-addButton font-bold text-sm">
                        Dashboard /
                    </Link>
                    <Link to="/lead" className="text-addButton font-bold text-sm">
                        Lead /
                    </Link>
                    <span className="text-gray-600 text-sm"> Upload Policy PDF</span>
                </Typography>
                <hr className="mt-4 border-gray-800" />

                <Card className="mt-4">
                    <CardContent>
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit, submitting }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormLabel className="block text-base font-medium text-gray-700">
                                                Policy PDF
                                            </FormLabel>
                                            <Field name="policyPdf">
                                                {({ input, meta }) => (
                                                    <div>
                                                        <input
                                                            type="file"
                                                            className="border border-gray-300 p-2 w-full rounded"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                const file = event.target.files ? event.target.files[0] : null;
                                                                input.onChange(file);
                                                            }}
                                                        />
                                                        {meta.touched && meta.error && (
                                                            <span className="text-red-500">{meta.error}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={2} className="mt-4">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                                fullWidth
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
};

export default UploadPolicyPdf;