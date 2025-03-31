import Link from "next/link";

interface NavBarProps {
    active: "dashboard" | "movimentações" | "categorias"
}

export default function NavBar(props: NavBarProps) {
    const { active } = props
    const activeClass = "border-b-4 border-primary"

    const links = [
        { label: "dashboard", href: "/dashboard" },
        { label: "movimentações", href: "/transactions" },
        { label: "categorias", href: "/categories" },
    ]

    return (
        <nav className="flex justify-between items-center bg-slate-900 p-6">
            <h1 className="text-2xl font-bold">Finance Walk</h1>
            <ul className="flex gap-4">

                {links.map(link =>
                    <li key={link.label} className={active === link.label ? activeClass : ""}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                )}

            </ul>
            <img className="size-12 rounded-full" src="http://github.com/joaocarloslima.png" alt="" />
        </nav>

    )
}