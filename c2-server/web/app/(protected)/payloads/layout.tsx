import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";

export default function Layout({ children } : { children: React.ReactNode }) {

    const pages = [
        {
            name: "Bots",
            href: "/bots",
        },
        {
            name: "Payloads",
            href: "/payloads",
        },
        {
            name: "Settings",
            href: "settings",
        },
    ];

    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <Link href="/dashboard" style={{
                        textDecoration: 'none',
                    }}>
                        <img src="/logo.png" alt="logo" className="w-12 h-12" />
                        <p className="font-bold text-inherit">StormWave</p>
                    </Link>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {pages.map((page) => (
                    <NavbarItem key={page.href}>
                        <Link href={page.href} aria-current="page">
                            {page.name}
                        </Link>
                    </NavbarItem>
                    ))}
                </NavbarContent>
            </Navbar>
            <main>{children}</main>
        </>
    )
}
