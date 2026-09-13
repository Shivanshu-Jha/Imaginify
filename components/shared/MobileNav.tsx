"use client"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { Show, UserButton } from "@clerk/nextjs"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const MobileNav = () => {

    const pathname = usePathname();

    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={180}
                    height={28}
                    className="cursor-pointer"
                />
            </Link>

            <nav className="flex gap-2">
                <Show when="signed-in">
                    <UserButton />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="Menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <Image
                                    src="/assets/images/logo-text.svg"
                                    alt="logo"
                                    width={152}
                                    height={23}
                                    className="cursor-pointer mt-4"
                                />

                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname

                                        return (
                                            <li
                                                key={link.route}
                                                className={`${isActive && 'gradient-text'} flex whitespace-nowrap text-dark-700`}>
                                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}

                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </Show>
                {/* when signed out */}
                <Show when="signed-out">
                    <Button className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">LogIn</Link>
                    </Button>
                </Show>
            </nav>
        </header>
    )
}

export default MobileNav