import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CircleAlert, Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import getColorFromLetter from "@/services/getColorFromLetter";
import {
  deleteContact,
  getContact,
  updateContact,
} from "@/services/apiService";
import useNotifications from "@/lib/notification";
import { addNewContactSchema } from "@/validations/schema";
import { useFormik } from "formik";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function DataTable({
  contacts,
  fetchData,
}: {
  contacts: any[];
  fetchData: () => void;
}) {
  const { successNotification, errorNotification } = useNotifications();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: addNewContactSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
  });

  const fetchContact = async (contactId: any) => {
    try {
      const res = await getContact(contactId);
      formik.setValues({
        name: res.data.name || "",
        phone: res.data.phone || "",
      });
    } catch (error: any) {
      errorNotification("Error", error.message);
    }
  };

  const handleUpdate = async (contactId: any) => {
    try {
      const res = await updateContact(contactId, {
        name: formik.values.name,
        phone: formik.values.phone,
      });
      if (res.success) {
        successNotification("Success", "Mobile Number Updated Successfully..!");
        fetchData();
      }
    } catch (error: any) {
      errorNotification("Error", error.message);
    }
  };

  const handleDelete = async (contactId: any) => {
    try {
      const res = await deleteContact(contactId);
      if (res.success) {
        successNotification("Success", "Mobile Number Deleted Successfully..!");
        fetchData();
      }
    } catch (error: any) {
      errorNotification("Error", error.message);
    }
  };

  return (
    <Table selectionMode="single" aria-label="Example empty table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>MOBILE</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {contacts.map((contact: any, index) => {
          const bgColor = getColorFromLetter(contact?.name.charAt(0));

          return (
            <TableRow key={index}>
              <TableCell className=" flex items-center gap-2">
                <span>
                  <Avatar
                    className="border-2"
                    style={{
                      borderColor: bgColor,
                    }}
                  >
                    <AvatarImage />
                    <AvatarFallback>
                      {contact?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </span>
                <span className="tracking-wider">{contact.name}</span>
              </TableCell>
              <TableCell className="tracking-wide">{contact.phone}</TableCell>
              <TableCell className="">
                <div className="flex   items-center gap-4">
                  <Dialog>
                    <DialogTrigger>
                      <div className="text-green-500  p-1">
                        <Pencil
                          onClick={() => fetchContact(contact._id)}
                          className=" h-6 w-6"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Contact</DialogTitle>
                        <DialogDescription>
                          Make changes to your list here. Click save when you&apos;re
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={async (event) => {
                          event.preventDefault();
                          await handleUpdate(contact._id);
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="">
                              Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="Pedro Duarte"
                              className="col-span-3 placeholder:text-gray-600"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                                <CircleAlert size={16} />
                                {formik.errors.name}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="phone" className="">
                              Contact Number
                            </Label>
                            <Input
                              type="number"
                              id="phone"
                              placeholder="9789789567"
                              className="col-span-3 placeholder:text-gray-600"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                              <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                                <CircleAlert size={16} />
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Update Contact</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <div
                    className="text-red-500 cursor-pointer p-1"
                    onClick={() => {
                      handleDelete(contact._id);
                    }}
                  >
                    <Trash2 className=" h-6 w-6" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
