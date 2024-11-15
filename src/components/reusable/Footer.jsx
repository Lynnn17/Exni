import LogoExni from "../../assets/logo/exni.svg";
import LogoPelni from "../../assets/logo/pelni.svg";
import LogoBumn from "../../assets/logo/bumn.svg";

const Footer = () => {
  return (
    <>
      <div className="px-6 py-6">
        <div className=" flex flex-row justify-between">
          <div className="">
            <div className="flex gap-1 items-center">
              <img src={LogoExni} className="w-20 pr-2" alt="" />
              <p className="mt-1 text-xs">From</p>
              <img src={LogoPelni} className="w-24" alt="" />
            </div>
          </div>
          <div>
            <img src={LogoBumn} className="w-20" alt="" srcset="" />
          </div>
        </div>
        <div>
          <div className="pt-2  flex  text-xs gap-4">
            <div className="w-[20rem]">
              <p>KANTOR CABANG</p>
              <p className="text-[10px]">PPID</p>
              <p className="text-[10px]">TENDER</p>
              <p className="text-[10px]">KARIR</p>
              <p className="text-[10px]">FAQ</p>
            </div>
            <div className="">
              <p>PT. PELNI(Persero) HQ</p>
              <p className="text-[10px]">
                Jl. Gajah Mada No. 14, Jakarta Pusat, 10130 DKI Jakarta,
                Indonesia
              </p>
            </div>
            <div className="">
              <p> Kontak Pusat </p>
              <p className="text-[10px]">
                T. 162 (Jabodetabek) F. +62 21 6385 4130 E.
                infopelni162@pelni.co.id
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
