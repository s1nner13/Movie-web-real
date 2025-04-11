import { MovieZ } from "./MovieZ";

export const Footer = () => {
  return (
    <div className="w-[375px] h-[308px] lg:w-[1440px] lg:h-[280px] py-10 px-5 lg:px-20 bg-[#4338ca]">
      <div className="w-[335px] h-[228px]  gap-[28px] lg:w-[1280px] lg:h-[200px] lg:flex lg:gap-[120px] lg:justify-between">
        <div className="flex flex-col gap-3 lg:w-[247px]">
          <MovieZ />
          <div className="text-white">© 2024 Movie Z. All Rights Reserved.</div>
        </div>
        <div className="flex gap-[48px] mt-[20px] lg:gap-[96px] lg:w-[913px] lg:h-[200px] lg:flex lg:justify-end">
          <div className="lg:flex lg:flex-col lg:gap-3">
            <p className="text-white">Contact Information</p>
            <div className="lg:flex lg:flex-col lg:gap-[24px]">
              <div className="flex items-center gap-3">
                <img src="/Mailicon.png" className="w-[16px] h-[16px]"></img>
                <div>
                  <p className="text-white">Email:</p>
                  <p className="text-white">support@movieZ.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="/Phone.png" className="w-[16px] h-[16px]"></img>
                <div>
                  <p className="text-white">Phone:</p>
                  <p className="text-white">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="text-white">Follow us </p>
            <div className="lg:flex lg:gap-3 flex flex-col gap-3">
              <p className="text-white">Facebook</p>
              <p className="text-white">Instagram</p>
              <p className="text-white">Twitter</p>
              <p className="text-white">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
