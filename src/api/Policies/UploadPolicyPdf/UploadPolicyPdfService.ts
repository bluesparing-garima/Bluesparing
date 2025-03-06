import UploadPolicyPdfAPI from "./UploadPolicyPdfAPI";

const UploadPolicyPdfService = async (payload: any):Promise<any> => {
  try {
    const res = await  UploadPolicyPdfAPI(payload)
    return res;
  } catch (error) {
    throw error
  }
  
};

export default UploadPolicyPdfService;
