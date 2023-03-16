import CompanyBenefits from "../_components/company-benefits";

interface YearLayoutProps {
  children: React.ReactNode;
}

export default async function YearLayout({ children }: YearLayoutProps) {
  return (
    <>
      {children}
      <CompanyBenefits />
    </>
  );
}
