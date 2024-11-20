import LogoExni from "../assets/logo/exni.svg";
import LogoPelni from "../assets/logo/pelni.svg";
import LogoBumn from "../assets/logo/bumn.svg";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className=" px-6 py-6 text-xs lg:px-8">
        <div class="w-full h-[1px] bg-teks mt-2"> </div>
        <div className="flex justify-between items-center mb-2 pt-5">
          <div className="flex items-center gap-1">
            <img src={LogoExni} className="w-20 md:w-24 pr-2" alt="Logo Exni" />
            <p className="mt-1 font-medium md:text-base">From</p>
            <img src={LogoPelni} className="w-24 md:w-32" alt="Logo Pelni" />
          </div>
          <img src={LogoBumn} className="w-20 md:w-24" alt="Logo BUMN" />
        </div>
        <div className="flex flex-wrap  justify-between  pt-2 text-[12px] w-full  gap-6 md:gap-0">
          <div className="grid grid-cols-3 gap-2 md:w-[30rem]">
            <div className="">
              <p className="font-bold">KANTOR CABANG</p>
              <ul className="list-none pl-1">
                <li>PPID</li>
                <li>TENDER</li>
                <li>KARIR</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="">
              <p className="font-bold">PT. PELNI (Persero) HQ</p>
              <address className="text-[10px] not-italic">
                Jl. Gajah Mada No. 14, Jakarta Pusat, 10130 DKI Jakarta,
                Indonesia
              </address>
            </div>
            <div className="">
              <p className="font-bold">Kontak Pusat</p>
              <ul className="list-none text-[10px]">
                <li>T. 162 (Jabodetabek)</li>
                <li>F. +62 21 6385 4130</li>
                <li>E. infopelni162@pelni.co.id</li>
              </ul>
            </div>
          </div>
          <div className=" ">
            <p className="font-bold">Media Sosial Kami</p>
            <div className="flex gap-2 pt-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl text-gray-600 hover:text-red-600" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-2xl text-gray-600 hover:text-red-600" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl text-gray-600 hover:text-blue-600" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl text-gray-600 hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-[10vh] bg-[#404C58] rounded-t-[25px]">
          <div className="text-white flex justify-center  items-center h-full   px-8 text-xs md:text-sm">
            <p className=" text-center ">
              Copyright ©2024 Anak Magang PT Pelayaran Nasional Indonesia. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
