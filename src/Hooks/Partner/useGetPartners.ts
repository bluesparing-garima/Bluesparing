import { useEffect, useRef, useState } from "react";
import getPartnersService from "../../api/Partner/GetPartner/getPartnersService";
import { GetPartnerProps } from "../../api/Partner/getPartnersTypes";
import { IPartners } from "../../components/Partner/IPartner";

export const defaultPartner: IPartners[] = [];

const useGetPartners = ({ header, role }: GetPartnerProps) => {
  const [Partners, setPartners] = useState<IPartners[]>(defaultPartner);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getPartnersService({ header, role })
        .then((apiResponse) => {
          isLoading.current = false;
          //to Get Only Active Types
          const partners = apiResponse.data.filter(
            (partner: IPartners) => partner.isActive === true
          );
          setPartners(partners);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, role, isLoading]);

  return [Partners];
};

export default useGetPartners;
