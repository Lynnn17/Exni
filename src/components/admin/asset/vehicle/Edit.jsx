import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import axios from "axios";

const EditVehicleAsset = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    nama: "",
    noPlat: "",
    tahun: "",
    noMesin: "",
    noRangka: "",
    harga: "",
    deskripsi: "",
  });

  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    noPlat: Yup.string().required("Nomor Plat is required"),
    tahun: Yup.number()
      .typeError("Tahun must be a number")
      .required("Tahun is required"),
    noMesin: Yup.string().required("Nomor Mesin is required"),
    noRangka: Yup.string().required("Nomor Rangka is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    deskripsi: Yup.string().required("Deskripsi is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      no_police: values.noPlat,
      year: values.tahun,
      no_machine: values.noMesin,
      no_frame: values.noRangka,
      name: values.nama,
      description: values.deskripsi,
      price: values.harga,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}assets/vehicles/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Success Response:", response.data);
      resetForm();
      StatusAlertService.showSuccess("Data Vehicle berhasil disimpan!");
      setTimeout(() => {
        navigate("/admin/asset/vehicle");
      }, 1000);
      // resetForm();
      // StatusAlertService.showSuccess("Data Vehicle berhasil disimpan!");
      // navigate("/admin/asset/vehicle");
    } catch (error) {
      console.error("Error saving data:", error);
      StatusAlertService.showError("Data Vehicle gagal disimpan!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/asset/vehicle");
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}assets/${id}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data.asset);
      const data = response.data.data.asset;
      setInitialValues({
        nama: data.name,
        noPlat: data.vehicles.no_police,
        tahun: data.vehicles.year,
        noMesin: data.vehicles.no_machine,
        noRangka: data.vehicles.no_frame,
        harga: data.price,
        deskripsi: data.description,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <main>
            <StatusAlert />
            <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
              <HeaderForm
                title="Edit Vehicle Asset"
                link="/admin/asset/vehicle"
              />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="nama"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama"
                />
                <InputField
                  name="noPlat"
                  label="No. Plat"
                  type="text"
                  placeholder="Masukan Nomor Plat"
                />
                <InputField
                  name="tahun"
                  label="Tahun Perolehan"
                  type="text"
                  placeholder="Masukan Tahun Perolehan"
                />
                <InputField
                  name="noMesin"
                  label="No. Mesin"
                  type="text"
                  placeholder="Masukan Nomor Mesin"
                />
                <InputField
                  name="noRangka"
                  label="No. Rangka"
                  type="text"
                  placeholder="Masukan Nomor Rangka"
                />
                <InputField
                  name="harga"
                  label="Harga"
                  type="text"
                  placeholder="Masukan Harga"
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi"
                />

                <div className="flex gap-3 justify-center md:justify-end pt-5 pr-5">
                  <Button
                    type="submit"
                    label={isSubmitting ? "Saving..." : "Save"}
                    color="bg-exni"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    label="Batal"
                    color="bg-red-500"
                    onClick={handleCancel}
                  />
                </div>
              </div>
            </div>
          </main>
        </Form>
      )}
    </Formik>
  );
};

export default EditVehicleAsset;
