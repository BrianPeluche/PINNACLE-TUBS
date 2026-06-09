import { siteConfig } from "@/data/site";

export function Footer() {
  const { address, phone, email } = siteConfig.contact;

  return (
    <footer className="border-t border-muted px-6 py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}
        </p>
        <p>
          {address.street}, {address.city}, {address.state} {address.zip}
        </p>
        <p>
          {phone} · {email}
        </p>
      </div>
    </footer>
  );
}
