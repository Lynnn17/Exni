import React, { useState } from "react";
import Loading from "./Loading";
import { Field, ErrorMessage, Formik } from "formik";
import StatusSelect from "./StatusSelect";
import * as Yup from "yup";
import EditableTextarea from "./EditableTextarea";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoReceipt } from "react-icons/io5";
import { TbReceiptOff } from "react-icons/tb";

const PaymentTable = ({ data }) => {
  const [updatedData, setUpdatedData] = useState(data);
  const [readOnlyStates, setReadOnlyStates] = useState(
    data.map(() => true) // Initially all notes are read-only
  );

  const handleToggleReadOnly = (index) => {
    const newReadOnlyStates = [...readOnlyStates];
    newReadOnlyStates[index] = !newReadOnlyStates[index];
    setReadOnlyStates(newReadOnlyStates);
  };

  const optionsPengajuan = [
    { value: "REJECTED", label: "Ditolak" },
    { value: "APPROVED", label: "Disetujui" },
  ];

  const statusMapping = {
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
    INITIATE: "Perlu Dibayar",
  };

  if (!data) {
    return <Loading />;
  }

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Find the first index where the status or note has changed
      const updatedIndex = updatedData.findIndex((item, index) => {
        return (
          item.status !== values[`status_${index}`] ||
          item.note !== values[`note_${index}`]
        );
      });

      if (updatedIndex !== -1) {
        const updatedItem = updatedData[updatedIndex];

        const updatedDataToSend = {
          status: values[`status_${updatedIndex}`], // New status
          note: values[`note_${updatedIndex}`], // New note
        };

        // Send the updated data to the API
        await axios.put(
          `${import.meta.env.VITE_API_URL}transactions/${
            updatedItem.id
          }/status`,
          updatedDataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // If the request is successful, show success alert
        StatusAlertService.showSuccess("Perubahan berhasil disimpan!");

        // Optionally, update the state to reflect the changes
        const newData = [...updatedData];
        newData[updatedIndex] = {
          ...newData[updatedIndex],
          ...updatedDataToSend,
        };
        setUpdatedData(newData);
      } else {
        StatusAlertService.showInfo("Tidak ada perubahan yang perlu disimpan.");
      }
    } catch (error) {
      // General error handling
      console.error("Error submitting form:", error);
      StatusAlertService.showError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object(
    data.reduce((schema, _, index) => {
      schema[`status_${index}`] = Yup.string()
        .oneOf(["APPROVED", "REJECTED"], "Status tidak valid")
        .required("Status harus diisi");
      schema[`note_${index}`] = Yup.string().required("Keterangan harus diisi");
      return schema;
    }, {})
  );

  const initialValues = data.reduce((values, item, index) => {
    values[`status_${index}`] = "REJECTED" || "";
    values[`note_${index}`] = item.note || "-";
    return values;
  }, {});

  const handleStatusChange = (index, value) => {
    const newData = [...updatedData];
    newData[index].status = value;
    setUpdatedData(newData);
  };

  const handleNoteChange = (index, value) => {
    const newData = [...updatedData];
    newData[index].note = value;
    setUpdatedData(newData);
  };

  return (
    <div>
      <StatusAlert />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="overflow-x-auto p-4">
              {/* Desktop View */}
              <table className="min-w-full border border-gray-200 text-sm text-left hidden md:table">
                <thead className="bg-gray-100">
                  <tr className="text-xs">
                    <th className="px-4 py-2 border-b">ID TRANSAKSI</th>
                    <th className="px-4 py-2 border-b"> Transaksi</th>
                    <th className="px-4 py-2 border-b">TANGGAL</th>
                    <th className="px-4 py-2 border-b">PROGRES PEMBAYARAN</th>
                    <th className="px-4 py-2 border-b">Catatan</th>
                    <th className="px-4 py-2 border-b text-center">
                      Bukti Transfer
                    </th>
                    <th className="px-4 py-2 border-b text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors text-xs border-b "
                    >
                      <td className="px-4 py-2 ">{item.id}</td>
                      <td className="px-4 py-2  ">
                        Urutan KE - {item.number_of_trans}
                      </td>
                      <td className="px-4 py-2">{item.updatedAt}</td>
                      <td className="px-4 py-2  ">
                        <span
                          className={`px-4 py-2 text-white text-xs font-bold rounded ${
                            item.status === "APPROVED"
                              ? "bg-green-500"
                              : item.status === "REJECTED"
                              ? "bg-red-500"
                              : item.status === "INITIATE"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {statusMapping[item.status] || item.status}
                        </span>
                      </td>

                      <td className="px-4 py-2">
                        <div>
                          <Field
                            as={EditableTextarea}
                            isReadOnly={readOnlyStates[index]} // Use individual read-only state
                            onToggleReadOnly={() => handleToggleReadOnly(index)} // Toggle read-only for each note
                            name={`note_${index}`}
                          />
                          <ErrorMessage
                            name={`note_${index}`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </td>
                      <td className="">
                        {item?.receipt ? (
                          <Link
                            target="_blank"
                            className="p-2  text-black text-4xl font-bold rounded-full flex justify-center"
                            to={`https://drive.google.com/file/d/${item.receipt}/view`}
                          >
                            <IoReceipt />{" "}
                          </Link>
                        ) : (
                          <span className="p-2  text-black text-4xl font-bold rounded-full flex justify-center">
                            <TbReceiptOff />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2  text-center flex flex-wrap gap-2 justify-center">
                        {item.status === "APPROVED" ? null : (
                          <>
                            <p>
                              <Field
                                as={StatusSelect}
                                name={`status_${index}`}
                                options={optionsPengajuan}
                                onChange={(e) => {
                                  setFieldValue(
                                    `status_${index}`,
                                    e.target.value
                                  );
                                  handleStatusChange(index, e.target.value);
                                }}
                              />
                              <ErrorMessage
                                name={`status_${index}`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </p>

                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                            >
                              Submit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile View */}
              <div className="block md:hidden">
                {updatedData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-4 bg-white"
                  >
                    <p className="text-xs font-bold">ID TRANSAKSI: {item.id}</p>
                    <p className="text-xs ">
                      Urutan Transaksi Ke: {item.number_of_trans}
                    </p>
                    <p className="text-xs">TANGGAL: {item.updatedAt}</p>

                    <p className="text-xs flex">
                      PROGRES PEMBAYARAN:
                      <p
                        className={`font-bold ml-1 text-white text-xs font-bold rounded px-2 ${
                          item.status === "APPROVED"
                            ? "bg-green-500"
                            : item.status === "REJECTED"
                            ? "bg-red-500"
                            : item.status === "INITIATE"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {statusMapping[item.status] || item.status}
                      </p>
                    </p>
                    {item.status === "APPROVED" ? null : (
                      <p>
                        <Field
                          as={StatusSelect}
                          name={`status_${index}`}
                          options={optionsPengajuan}
                          onChange={(e) => {
                            setFieldValue(`status_${index}`, e.target.value);
                            handleStatusChange(index, e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name={`status_${index}`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </p>
                    )}
                    <div className="mt-2">
                      <Field
                        as={EditableTextarea}
                        isReadOnly={readOnlyStates[index]} // Use individual read-only state
                        onToggleReadOnly={() => handleToggleReadOnly(index)} // Toggle read-only for each note
                        name={`note_${index}`}
                      />
                      <ErrorMessage
                        name={`note_${index}`}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mt-2 text-center flex justify-between">
                      {item.status === "APPROVED" ? null : (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      )}
                      {item?.receipt ? (
                        <Link
                          target="_blank"
                          className="p-2 bg-blue-500  text-white text-2xl font-bold rounded-full "
                          to={`https://drive.google.com/file/d/${item.receipt}/view`}
                        >
                          {" "}
                          <IoReceipt />{" "}
                        </Link>
                      ) : (
                        <span className="p-2 bg-blue-500  text-black text-2xl font-bold rounded-full">
                          <TbReceiptOff />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentTable;
