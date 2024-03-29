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

  return (
    <Dialog>
      <div className="h-full flex flex-col gap-2">
        <div className="px-10 py-8 flex flex-col gap-3">
          <h1 className="font-bold text-3xl">
            {role === "R1" ? "Customer" : "Administration"}
          </h1>

          <div className="flex gap-3 items-center">
            <Input icon={<SlMagnifier />} placeholder="Search" />

            <Button className="bg-gray-500">
              <SlDoc size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Export
              </label>
            </Button>

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
              {invoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{invoice?.username}</TableCell>
                  <TableCell>{invoice?.full_name}</TableCell>
                  <TableCell>{invoice?.email}</TableCell>
                  <TableCell>{invoice?.phone_number}</TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <label
                        htmlFor="update"
                        className="hover:font-medium cursor-pointer hover:underline"
                      >
                        Update
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

      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Name
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
