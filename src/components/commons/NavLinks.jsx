import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [ 
    {name: 'Reservaciones', href: '/reservaciones'},
    {name: 'Huéspedes', href: '#'},
    {name: 'Habitaciones', href: '#'},
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link key={link.name} href={link.href} className={`p-2 md:p-0 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:transform after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform ${pathname === link.href ? 'after:scale-x-100' : ''} `}>
                    <p>{link.name}</p>
                </Link>
            ))}
        </>
    );
}