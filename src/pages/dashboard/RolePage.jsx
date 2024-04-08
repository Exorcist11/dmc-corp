import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LiaPlusSolid } from "react-icons/lia";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function RolePage() {
  const [role, setRole] = useState([]);
  const [data, setData] = useState();
  const [err, setErr] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const getRole = async () => {
    await axios
      .get("http://127.0.0.1:9999/role")
      .then((res) => setRole(res.data.list_role))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    document.title = "Quản lý chức vụ";
    getRole();
  }, []);

  // useEffect(() => {
  //   getRole();
  // }, []);

  const handleSubmit = async () => {
    if (!data?.role_id) {
      setErr("Role ID not null!");
    } else {
      await axios
        .post("http://127.0.0.1:9999/role", data)
        .then(() => window.location.reload())
        .catch(() => setErr("Role ID alreadry exist!"));
    }
  };

  const handleDelete = async (role_id) => {
    await axios
      .delete(`http://127.0.0.1:9999/role/${role_id}`)
      .then(() => window.location.reload())
      .catch(() => setErr("Something went wrong!"));
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="px-10 py-8 flex flex-col gap-3">
        <h1 className="font-bold text-3xl">Roles</h1>
        <div className="flex gap-5">
          <Input placeholder="Role ID" name="role_id" onChange={handleChange} />
          <Input
            placeholder="Role Name"
            name="role_name"
            onChange={handleChange}
          />
          <Button
            className="bg-[#3478FF] hover:bg-[#004dff]"
            onClick={handleSubmit}
          >
            <LiaPlusSolid size={18} color="white" />{" "}
            <label htmlFor="newRole" className="ml-1">
              Add new role
            </label>
          </Button>
        </div>
        {err ? <h1 className="text-xs text-red-500 font-medium">{err}</h1> : ""}
      </div>
      <div className="bg-white h-full p-10">
        <Table className="border">
          <TableCaption>A list of your role in system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>RoleID</TableHead>
              <TableHead>Role Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {role?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.role_id}</TableCell>
                <TableCell>{item?.role_name}</TableCell>
                <TableCell
                  className="text-right hover:font-medium cursor-pointer"
                  onClick={() => handleDelete(item?.role_id)}
                >
                  Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
