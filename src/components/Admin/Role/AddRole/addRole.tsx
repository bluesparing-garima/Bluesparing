import  { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IRoleForm } from "../IRole";
import AddRoleForm from "./addRoleForm";
import getRoleDetailsService from "../../../../api/Role/GetRoleDetails/getRoleDetailsService";
import { convertIRoleVMToIRoleForm } from "../../../../api/Role/convertIRoleVMToIRoleForm";
import toast, { Toaster } from "react-hot-toast";

const AddRole = () => {
  const { roleId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editRoleDetails, setEditRoleDetails] = useState<IRoleForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && roleId) {
      getRoleDetailsService({ header, roleId })
        .then((roleDetails) => {
          const roleVMToRoleForm = convertIRoleVMToIRoleForm(roleDetails);
          setEditRoleDetails(roleVMToRoleForm);
        })
        .catch(async (error: any) => {
          const err = await error
          toast.error(err.message)

        });
    }
  }, [isAdd, roleId]);

  const title = isAdd ? "Add Role" : "Update Role";

  return (
    <div className="bg-blue-200 md:p-7">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/role" className="text-addButton font-bold text-sm">
            Roles /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddRoleForm
          initialValues={{
            id: isAdd ? "0" : editRoleDetails?.id || "",
            roleName: isAdd ? "" : editRoleDetails?.roleName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddRole;
