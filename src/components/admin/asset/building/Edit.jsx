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
    allocation: "",
    buildingArea: "",
    landArea: "",
    price: "",
    description: "",
    isAvailable: false,
  });
  const [loading, setLoading] = useState(true);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Nama gedung wajib diisi."),
    address: Yup.string().required("Alamat wajib diisi."),
    allocation: Yup.string().required("Alokasi wajib diisi."),
    buildingArea: Yup.number()
      .typeError("Luas gedung harus berupa angka.")
      .required("Luas gedung wajib diisi."),
    landArea: Yup.number()
      .typeError("Luas tanah harus berupa angka.")
      .required("Luas tanah wajib diisi."),
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

      console.log(response.data.data.asset);
      const data = response.data.data.asset;

      setInitialValues({
        name: data.name || "",
        address: data.properties?.address || "",
        allocation: data.properties?.allocation || "",
        buildingArea: data.properties?.buildingArea || "",
        landArea: data.properties?.landArea || "",
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
      allocation: values.allocation,
      buildingArea: values.buildingArea,
      landArea: values.landArea,
      price: Number(values.price),
      description: values.description,
      isAvailable: values.isAvailable === true,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}assets/properties/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      StatusAlertService.showSuccess("Data tenant berhasil diupdate!");
      setTimeout(() => navigate("/admin/asset/building"), 1000);
    } catch (error) {
      console.error("Error updating tenant data:", error);
      StatusAlertService.showError("Gagal mengupdate data tenant.");
    }
  };

  if (loading) return <div>Loading...</div>;
  //   try {
  //     const token = localStorage.getItem("token");
  //     const endpoint = `${import.meta.env.VITE_API_URL}assets/${id}`;

  //     await axios.put(endpoint, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     StatusAlertService.showSuccess("Data gedung berhasil diperbarui!");
  //     setTimeout(() => navigate("/admin/asset/building"), 2000);
  //   } catch (error) {
  //     console.error("Error updating building data:", error);
  //     StatusAlertService.showError("Gagal memperbarui data gedung.");
  //   }
  // };

  // if (loading) return <div>Loading...</div>;

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
              <HeaderForm title="Edit Building" link="/admin/asset/building" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="name"
                  label="Nama"
                  type="text"
                  placeholder="Masukkan Nama Gedung"
                />
                <InputField
                  name="address"
                  label="Alamat"
                  type="text"
                  placeholder="Masukkan Alamat Gedung"
                />
                <InputField
                  name="allocation"
                  label="Alokasi"
                  type="text"
                  placeholder="Masukkan Alokasi Gedung"
                />
                <InputField
                  name="buildingArea"
                  label="Luas Gedung"
                  type="text"
                  placeholder="Masukkan Luas Gedung"
                />
                <InputField
                  name="landArea"
                  label="Luas Tanah"
                  type="text"
                  placeholder="Masukkan Luas Tanah"
                />
                <InputField
                  name="price"
                  label="Harga"
                  type="text"
                  placeholder="Masukkan Harga Gedung"
                />
                <InputField
                  name="description"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukkan Deskripsi Gedung"
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
                    onClick={() => navigate("/admin/asset/building")}
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
