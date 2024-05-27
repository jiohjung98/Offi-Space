const Header = () => {
  return (
    <header className="sticky top-0 w-[393px] h-12 px-4 py-1 justify-center items-center gap-[176.35px] inline-flex  bg-white z-[9999] ">
      <img className="w-[116.35px] h-8" src="/NavLogo.png" />
      <div className="justify-end items-center gap-6 inline-flex">
        <div className="w-[22px] h-[22px] relative">
          <div className="w-[9.79px] h-[6.44px] left-[5.50px] top-[8.25px] absolute"></div>
          <img className="w-[22px] h-[22px] left-0 top-0 absolute" src="/Inquiry.svg" />
        </div>
        <div className="w-[22.29px] h-[21.50px] relative">
          <img
            className="w-[22px] h-[22px] left-0 top-0 absolute "
            src="/Notification.svg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
