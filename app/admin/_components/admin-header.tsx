interface AdminHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ heading, text, children }: AdminHeaderProps) {
  return (
    <div className="flex justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="">{text}</p>}
      </div>
      {children}
    </div>
  );
}
