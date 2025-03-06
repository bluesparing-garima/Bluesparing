import { link } from "fs";
import jsPDF from "jspdf";
import { holidayDeleteEndpoint } from "../HR/ApiEndpoints";


const API_ENDPOINT_HOST = "https://iimapi.bluesparing.com"
// const API_ENDPOINT_HOST = "http://localhost:7000";
export const refreshToken = () =>
    API_ENDPOINT_HOST.concat(`/api/user/refresh-token`);


