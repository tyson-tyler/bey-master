const Footer = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div className="border bg-gray-700 " />
        <div className="p-10">
          <p className="font-bold w-full text-center text-gray-30">
            2024 Myaimix | All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
