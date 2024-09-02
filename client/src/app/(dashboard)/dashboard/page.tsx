"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { CircleAlert, SquarePlus } from "lucide-react";
import { useFormik } from "formik";
import { addNewContactSchema } from "@/validations/schema";
import useNotifications from "@/lib/notification";
import {
  createContact,
  deleteContact,
  getAllContacts,
} from "@/services/apiService";
import DataTable from "@/components/DataTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { Spinner } from "@nextui-org/react";

const Dashboard = () => {
  const { successNotification, errorNotification } = useNotifications();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: addNewContactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await createContact(values);

        if (res.success) {
          successNotification(
            "Success",
            "New mobile number added Successfully..!"
          );
          resetForm();
          fetchData();
          setLoading(false);
        }
      } catch (error: any) {
        errorNotification("Error", error.message);
        resetForm();
        setLoading(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const res = await getAllContacts();
      setContacts(res);
      setLoading(false);
    } catch (error: any) {
      // errorNotification("Error", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-1 flex-col min-h-screen gap-4 p-2 lg:gap-6 lg:p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">All Contacts</h1>

        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center gap-1 dark:bg-white bg-gray-200 text-sm text-black px-3 py-2 rounded-lg">
              <span>
                <SquarePlus className="h-5 w-5" />
              </span>
              Add Contact
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
            <form onSubmit={formik.handleSubmit}>
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
                <Button type="submit" disabled={loading}>
                  <div className=" flex justify-center items-center gap-4">
                    Save changes
                    <span>
                      {loading && (
                        <Spinner
                          className="flex items-center"
                          size="sm"
                          color="success"
                        />
                      )}
                    </span>
                  </div>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className=" sm:p-4 flex flex-col gap-4">
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
        </div>
      ) : contacts.length > 0 ? (
        <div>
          <DataTable contacts={contacts} fetchData={fetchData} />
        </div>
      ) : (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no data
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start managing contact as soon as you add a new contact.
            </p>

            <Dialog>
              <DialogTrigger>
                <div className="mt-4 flex justify-center items-center gap-1 dark:bg-white bg-gray-200 text-sm text-black px-3 py-2 rounded-lg">
                  <span>
                    <SquarePlus className="h-5 w-5" />
                  </span>
                  Add Contact
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
                <form onSubmit={formik.handleSubmit}>
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
                    <Button type="submit" disabled={loading}>
                      <div className=" flex justify-center items-center  gap-4">
                        Save changes
                        <span>
                          {loading && (
                            <Spinner
                              className="flex items-center"
                              size="sm"
                              color="success"
                            />
                          )}
                        </span>
                      </div>
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
