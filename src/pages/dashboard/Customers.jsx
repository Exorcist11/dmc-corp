import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { SlMagnifier, SlDoc } from "react-icons/sl";
import { LiaPlusSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import axios from "axios";

export default function Customers() {
  const { role } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [person, setPerson] = useState({
    user_name: "",
    full_name: "",
    email: "",
    phone_number: "",
    user_id: "",
    date_of_birth: "",
    address: [],
  });

  const getPerson = useCallback(async () => {
    await axios
      .get(`http://127.0.0.1:9999/role/${role}`)
      .then((response) => setInvoices(response.data.users))
      .catch((error) => console.log(error));
  }, [role]);

  useEffect(() => {
    document.title = role === "R1" ? "Customer" : "Administration";

    getPerson();
  }, [role, getPerson]);

  // useEffect(() => {
  //   const getPerson = async () => {
  //     await axios
  //       .get(`http://127.0.0.1:9999/role/${role}`)
  //       .then((response) => setInvoices(response.data.users))
  //       .catch((error) => console.log(error));
  //   };
  //   getPerson();
  // }, []);

  const handleView = async (id) => {
    await axios
      .get(`http://127.0.0.1:9999/settings/${id}`)
      .then((res) => setPerson(res.data.infor))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  return (
    <Dialog>
      <div className="h-full flex flex-col gap-2">
        <div className="px-10 py-8 flex flex-col gap-3">
          <h1 className="font-bold text-3xl">
            {role === "R1" ? "Customer" : "Administration"}
          </h1>

          <div className="flex gap-3 items-center">
            <Input
              icon={<SlMagnifier />}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* <Button className="bg-gray-500">
              <SlDoc size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Export
              </label>
            </Button> */}

            <Button className="bg-[#3478FF] hover:bg-[#004dff]">
              <LiaPlusSolid size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Add new {role === "R1" ? "customer" : "admin"}
              </label>
            </Button>
          </div>
        </div>

        <div className="bg-white h-full">
          <Table className="px-10">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Full name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phonenumber</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices
                .filter((item) => {
                  return search.toLocaleLowerCase() === ""
                    ? item
                    : item.full_name.toLocaleLowerCase().includes(search);
                })
                .map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{invoice?.username}</TableCell>
                    <TableCell>{invoice?.full_name}</TableCell>
                    <TableCell>{invoice?.email}</TableCell>
                    <TableCell>{invoice?.phone_number}</TableCell>
                    <TableCell className="text-right">
                      {role === "R1" ? (
                        <>
                          <label
                            htmlFor="delete"
                            className="hover:font-medium cursor-pointer hover:underline"
                          >
                            Set admin
                          </label>{" "}
                          |{" "}
                        </>
                      ) : null}
                      <DialogTrigger
                        onClick={() => handleView(invoice?.user_id)}
                        asChild
                      >
                        <label
                          htmlFor="update"
                          className="hover:font-medium cursor-pointer hover:underline"
                        >
                          View profile
                        </label>
                      </DialogTrigger>{" "}
                      |{" "}
                      <label
                        htmlFor="delete"
                        className="hover:font-medium cursor-pointer hover:underline"
                      >
                        Delete
                      </label>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">{invoices.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      <DialogContent className="sm:max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user_id" className="text-left col-span-1">
              User ID
            </Label>
            <Input
              id="user_id"
              name="user_id"
              value={person?.user_id}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left col-span-1">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={person?.user_name}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-left">
              Full name
            </Label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={person?.full_name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone_number" className="text-left">
              Phone number
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              defaultValue={person?.phone_number}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue={person?.email}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_of_birth" className="text-left">
              Date of birth
            </Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              defaultValue={person?.date_of_birth}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center uppercase">
              Danh sách địa chỉ
            </div>
            {person?.address.map((item, index) => (
              <div key={index}>
                <div
                  className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2"
                  key={index}
                >
                  <div className="flex justify-between">
                    <h1>
                      {item?.full_name} | {item?.phone_number}
                    </h1>
                  </div>
                  <div>{item?.note}</div>
                  <div>
                    {item?.ward} - {item?.district} - {item?.province}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
