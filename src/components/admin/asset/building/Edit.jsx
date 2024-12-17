import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputFieldbackup";
import HeaderForm from "../../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../../reusable/SingleSelectCheckboxGroup";

import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

import axios from "axios";

const Edit = () => {
  const { id: idData } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [initialValues, setInitialValues] = useState({
    nama: "",
    alamat: "",
    alokasi: "",
    luasGedung: "",
    luasTanah: "",
    harga: "",
    deskripsi: "",
    statusKetersediaan: "",
  });

  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    alamat: Yup.string().required("Alamat is required"),
    alokasi: Yup.string().required("Alokasi is required"),
    luasGedung: Yup.number()
      .typeError("Luas Gedung must be a number")
      .required("Luas Gedung is required"),
    luasTanah: Yup.number()
      .typeError("Luas Tanah must be a number")
      .required("Luas Tanah is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    deskripsi: Yup.string().required("Deskripsi is required"),
  });

  const handleSubmit = async (values) => {
    const data = {
      name: values.nama,
      address: values.alamat,
      building: values.luasGedung,
      floor: values.luasTanah,
      price: values.harga,
      description: values.deskripsi,
      isAvailable: values.statusKetersediaan,
      tenantdto: values.alokasi,
    };
    setIsSaving(true);
    try {
      let token = localStorage.getItem("token");
      const endpoint = `${
        import.meta.env.VITE_API_URL
      }assets/tenants/${idData}`;

      try {
        await axios.put(endpoint, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        StatusAlertService.showSuccess("Data berhasil diupdate!");
        setTimeout(() => navigate("/admin/building"), 2000);
      } catch (error) {
        if (error.response?.data?.message === "jwt expired") {
          token = await handleTokenRefresh();
          await axios.put(endpoint, filteredValues, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          StatusAlertService.showSuccess("Data berhasil disimpan!");
          setTimeout(() => navigate("/admin/user"), 2000);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error updating information:", error);
      StatusAlertService.showError("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleCancel = () => {
    navigate("/admin/asset/building");
  };

  const options = [
    { value: true, label: "Tersedia" },
    { value: false, label: "Tidak Tersedia" },
  ];

  const fetchData = async () => {

    setLoading(true);
    try {
      let token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}assets/${idData}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data.asset;
        setInitialValues({
          nama: data.name,
          alamat: data.properties.address,
          alokasi: data.properties.allocation,
          luasGedung: data.properties.buildingArea,
          luasTanah: data.properties.landArea,
          harga: data.price,
          deskripsi: data.description,
          statusKetersediaan: data.isAvailable,
        });
      } catch (error) {
        if (error.response?.data?.message === "jwt expired") {
          token = await handleTokenRefresh();
          const refreshedResponse = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = refreshedResponse.data.data.user;
          setInitialValues({
            nama: data.name,
            alamat: data.properties.address,
            alokasi: data.properties.allocation,
            luasGedung: data.properties.buildingArea,
            luasTanah: data.properties.landArea,
            harga: data.price,
            deskripsi: data.description,
            statusKetersediaan: data.isAvailable,
          });
          StatusAlertService.showSuccess("Data berhasil dimuat!");
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      StatusAlertService.showError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchData();
  }, [idData]);


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form>
          <main>
            <StatusAlert />
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Edit Building" link="/admin/asset/building" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="nama"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama"
                  aria-label="Nama Gedung"
                />
                <InputField
                  name="alamat"
                  label="Alamat"
                  type="text"
                  placeholder="Masukan Alamat"
                  aria-label="Alamat Gedung"
                />

                <InputField
                  name="alokasi"
                  label="Alokasi"
                  type="text"
                  placeholder="Masukan Alokasi Gedung"
                  aria-label="Fungsi atau Alokasi Gedung"
                />
                <InputField
                  name="luasGedung"
                  label="Luas Gedung"
                  type="text"
                  placeholder="Masukan Luas Gedung"
                  aria-label="Luas Gedung dalam Meter Persegi"
                />
                <InputField
                  name="luasTanah"
                  label="Luas Tanah"
                  type="text"
                  placeholder="Masukan Luas Tanah"
                  aria-label="Luas Tanah dalam Meter Persegi"
                />
                <InputField
                  name="harga"
                  label="Harga Sewa"
                  type="text"
                  placeholder="Masukan Harga Sewa"
                  aria-label="Harga Sewa Gedung"
                />

                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi (Optional)"
                  aria-label="Deskripsi Singkat tentang Gedung"
                />
                <div className="px-3 pb-3">
                  <SingleSelectCheckboxGroup
                    label="Status Ketersediaan"
                    options={options}
                    selectedValue={values.statusKetersediaan}
                    onChange={(value) =>
                      setFieldValue("statusKetersediaan", value)
                    }
                    aria-label="Status Ketersediaan Gedung"
                  />
                </div>

                <div className="flex gap-3 justify-center md:justify-end pt-5 pr-5">
                  <Button
                    type="submit"
                    color="bg-exni"
                    label={isSaving ? "Loading..." : "Simpan"}
                    disabled={isSaving}
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

export default Edit;
