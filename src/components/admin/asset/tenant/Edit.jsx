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

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    building: "",
    floor: "",
    tenant: "",
    price: "",
    description: "",
    isAvailable: false,
  });
  const [loading, setLoading] = useState(true);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Nama tenant wajib diisi."),
    address: Yup.string().required("Alamat wajib diisi."),
    building: Yup.string().required("Nama gedung wajib diisi."),
    floor: Yup.string().required("Lantai wajib diisi."),
    tenant: Yup.string().required("Nama tenant wajib diisi."),
    price: Yup.number()
      .typeError("Harga harus berupa angka.")
      .required("Harga wajib diisi."),
    description: Yup.string().required("Deskripsi wajib diisi."),
  });

  // Fetch data from API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}assets/${id}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data.asset); // Log API response for debugging
      const data = response.data.data.asset;

      setInitialValues({
        name: data.name || "",
        address: data.tenants?.address || "",
        building: data.tenants?.building || "",
        floor: data.tenants?.floor || "",
        tenant: data.tenants?.tenant || "",
        price: data.price || "",
        description: data.description || "",
        isAvailable: data.isAvailable || false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      address: values.address,
      building: values.building,
      floor: values.floor,
      tenantdto: values.tenant,
      price: values.price,
      description: values.description,
      isAvailable: values.isAvailable,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}assets/tenants/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      StatusAlertService.showSuccess("Data tenant berhasil diupdate!");
      setTimeout(() => navigate("/admin/asset/tenant"), 1000);
    } catch (error) {
      console.error("Error updating tenant data:", error);
      StatusAlertService.showError("Gagal mengupdate data tenant.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <main>
            <StatusAlert />
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Edit Tenant" link="/admin/asset/tenant" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="name"
                  label="Nama"
                  type="text"
                  placeholder="Masukkan Nama Tenant"
                />
                <InputField
                  name="address"
                  label="Alamat"
                  type="text"
                  placeholder="Masukkan Alamat Tenant"
                />
                <InputField
                  name="building"
                  label="Gedung"
                  type="text"
                  placeholder="Masukkan Nama Gedung"
                />
                <InputField
                  name="floor"
                  label="Lantai"
                  type="text"
                  placeholder="Masukkan Lantai"
                />
                <InputField
                  name="tenant"
                  label="Tenant"
                  type="text"
                  placeholder="Masukkan Nama Tenant"
                />
                <InputField
                  name="price"
                  label="Harga"
                  type="text"
                  placeholder="Masukkan Harga Tenant"
                />
                <InputField
                  name="description"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukkan Deskripsi"
                />
                <div className="px-3 pb-3">
                  <label>Status Ketersediaan</label>
                  <select
                    value={values.isAvailable}
                    onChange={(e) =>
                      setFieldValue("isAvailable", e.target.value === "true")
                    }
                  >
                    <option value="true">Tersedia</option>
                    <option value="false">Tidak Tersedia</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-center md:justify-end pt-5 pr-5">
                  <Button type="submit" color="bg-exni" label="Simpan" />
                  <Button
                    type="button"
                    label="Batal"
                    color="bg-red-500"
                    onClick={() => navigate("/admin/asset/tenant")}
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

export default Edit;
