import React, { useEffect, useState } from "react";
import ProfileUi from "./ProfileUi";
import { SafeKaroUser } from "../../context/constant";
import getTeamDetailsService from "../../api/Team/GetTeamDetails/getTeamDetailsService";
import { header } from "../../context/constant";
import { ITeamsVM } from "../Admin/Team/ITeam";

const ProfilePage = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const id = UserData.profileId;
  const [userData, setUserData] = useState<ITeamsVM>();
  const fetchUserData = async () => {
    const data = await getTeamDetailsService({ header, teamId: id });
    setUserData(data);
  };
  useEffect(() => {
    console.log("UserData:", UserData);
    fetchUserData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ProfileUi {...userData} />
    </>
  );
};

export default ProfilePage;
