import { useEffect, useRef, useState } from "react";
import getCompaniesService from "../../api/Company/GetCompanies/getCompaniesService";
import { ICompanies } from "../../components/Admin/Company/ICompany";
import { GetCompanyProps } from "../../api/Company/getCompaniesTypes";


export const defaultCompany: ICompanies[] = [];

const useGetCompanies = ({ header }: GetCompanyProps) => {
  const [companies, setCompanies] = useState<ICompanies[]>(defaultCompany);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getCompaniesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const companies = apiResponse.data.filter(
            (company: ICompanies) => company.isActive === true
          );
          setCompanies(companies);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [companies];
};

export default useGetCompanies;
