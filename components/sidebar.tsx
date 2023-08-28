"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname();
  const links = [{
    href: '/',
    name: 'Home',
  },{
    href: '/examples/creating-a-scene',
    name: 'Creating a scene',
  },{
    href: '/examples/drawing-lines',
    name: 'Drawing lines',
  },{
    href: '/examples/creating-text',
    name: 'Creating text',
  },{
    href: '/examples/loading-3d-models',
    name: 'Loading 3D models',
  },];

  return (
    <aside>
      <nav className="flex flex-col min-w-[208px]">
        {
          links.map((link, index) => (            
            <Link
              key={index}
              href={link.href}
              className={`p-4 text-white hover:text-neutral-500 ${(pathname === link.href) ? 'border-e-4 border-white hover:border-neutral-500' : ''}`}
            >{link.name}</Link>
          ))
        }
      </nav>
    </aside>
  )
}
