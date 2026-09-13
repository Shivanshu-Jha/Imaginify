"use client"
import { usePathname } from 'next/navigation'
import { Show, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/constants'
import { Button } from '../ui/button'

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="flex size-full gap-4 flex-col">
                <Link href="/" className="sidebar-logo">
                    <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
                </Link>

                <nav className="sidebar-nav">
                    {/* when signed in */}
                    <Show when="signed-in">
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                    <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                        <Link className="sidebar-link" href={link.route}>
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                    <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                        <Link className="sidebar-link" href={link.route}>
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            <li className="flex-center cursor-pointer gap-2 p-4">
                                <UserButton showName />
                            </li>
                        </ul>
                    </Show>

                    {/* when signed out */}
                    <Show when="signed-out">
                        <Button className="button bg-purple-gradient bg-cover">
                            <Link href="/sign-in">LogIn</Link>
                        </Button>
                    </Show>


                </nav>
            </div>
        </aside>
    )
}

export default Sidebar