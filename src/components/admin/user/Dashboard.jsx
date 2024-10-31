import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { Link } from "react-router-dom";
import IconUser from "../../../assets/icon/user.svg";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import Pagination from "../../reusable/Pagination";
import Search from "../../reusable/Search";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <main>
        <div className="w-full px-3 py-5 bg-white mt-4 h-full">
          <HeaderSection
            title="Users"
            subtitle=""
            linkTo="/users/add"
            linkText="Add"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>
          {/* Responsive Table */}
          <div className="w-full overflow-x-auto pt-4 md:pt-7 md:px-3 lg:px-7">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="border-1 border-gray-400 uppercase">
                  <th className="py-2 px-4 text-center text-xs sm:text-sm">
                    No
                  </th>
                  <th className="py-2 px-6 sm:px-12 text-center text-xs sm:text-sm ">
                    Nama
                  </th>
                  <th className="py-2 px-10 sm:px-20 text-center text-xs sm:text-sm">
                    Alamat
                  </th>
                  <th className="py-2 px-4 text-center text-xs sm:text-sm">
                    Email
                  </th>
                  <th className="py-2 px-4 text-center text-xs sm:text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 text-xs sm:text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={IconUser}
                          alt="user"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-xs sm:text-sm font-medium">
                          John Doe
                        </p>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm text-center">
                      Jakarta, padat banget wes gk ngerti lah
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm text-center">
                      lintangkusuma17@gmail.com
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to="/users/edit"
                          className="text-[#5641BA] text-lg"
                        >
                          <IoPencil />
                        </Link>
                        |
                        <Link
                          to="/users/delete"
                          className="text-red-500 text-lg"
                        >
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
