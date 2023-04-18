interface AdminHeaderProps {
  children?: React.ReactNode;
}

export function AdminContent({ children }: AdminHeaderProps) {
  return <div className="px-2">{children}</div>;
}
