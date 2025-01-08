import LogoExni from "../assets/logo/exni.svg";
import LogoPelni from "../assets/logo/pelni.svg";
import LogoBumn from "../assets/logo/logobumn.png";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="px-6 py-6 text-xs lg:px-8">
        <div class="w-full h-[1px] bg-teks mt-2"> </div>
        <div className="flex justify-between items-center mb-2 pt-5">
          <div className="flex items-center gap-1">
            <img src={LogoExni} className="w-20 md:w-24 pr-2" alt="Logo Exni" />
            <p className="mt-1 font-medium md:text-base">From</p>
            <img src={LogoPelni} className="w-24 md:w-32" alt="Logo Pelni" />
          </div>
          <img src={LogoBumn} className="w-24 md:w-34" alt="Logo BUMN" />
        </div>
        <div className="flex flex-wrap  justify-between  pt-2 text-[12px] w-full  gap-6 md:gap-0">
          <div className="grid grid-cols-3 gap-2 md:w-[30rem]">
            <div className="">
              <p className="font-bold">
                <a href="https://www.pelni.co.id/kantor-cabang">
                  KANTOR CABANG
                </a>
              </p>
              <ul className="list-none pl-1">
                <li>
                  <a href="https://ppid.pelni.co.id/">PPID</a>
                </li>
                <li>
                  <a href="https://www.pelni.co.id/tender">TENDER</a>
                </li>
                <li>
                  <a href="https://www.pelni.co.id/karir">KARIR</a>
                </li>
                <li>
                  {" "}
                  <a href="https://www.pelni.co.id/faq-id">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="">
              <p className="font-bold">PT. PELNI (Persero) HQ</p>
              <address className="text-[11px] not-italic">
                Jl. Pahlawan No.112-114, Krembangan Sel., Kec. Krembangan,
                Surabaya, Jawa Timur 60175
              </address>
            </div>
            <div className="">
              <p className="font-bold">Kontak Pusat</p>
              <ul className="list-none text-[11px]">
                <li>T. 162 (Jabodetabek)</li>
                <li>F. +62 811-3050-563</li>
                <li>E. infopelni162@pelni.co.id</li>
              </ul>
            </div>
          </div>
          <div className=" ">
            <p className="font-bold">Media Sosial Kami</p>

            <div className="flex gap-2 pt-2">
              <a
                href="https://www.instagram.com/pelni162/?hl=en"
                target="_blank"
              >
                <FaInstagram className="text-2xl text-gray-600 hover:text-red-600" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCG1IAElUtPQHpRzq5L1ZiRA"
                target="_blank"
              >
                <FaYoutube className="text-2xl text-gray-600 hover:text-red-600" />
              </a>
              <a href="https://www.facebook.com/pelni162/" target="_blank">
                <FaFacebook className="text-2xl text-gray-600 hover:text-blue-600" />
              </a>
              <a href="https://twitter.com/pelni162?lang=en" target="_blank">
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
              Copyright ©2025 Anak Magang PT Pelayaran Nasional Indonesia. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
