import { BiSolidDashboard } from 'react-icons/bi';
import Link from 'next/link';
import './index.module.scss';
import { Settings } from '../../page/Settings';

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: BiSolidDashboard
  },
  {
    name: "Generate Report",
    href: "/generate-report",
    icon: BiSolidDashboard
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: BiSolidDashboard
  },

  {
    name: "Settings",
    href: "/settings",
    icon: BiSolidDashboard
  },
];

export default function Sidebar() {
    
  return (
    <div>
        <aside className='sidebar'>
        <ul className='sidebar_list'>
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className='sidebar_item' key={name}>
              <Link href={href} className='sidebar_link'>
                <div className="sidebar_icon">
                  <Icon />
                </div>
                <span className='sidebar_name'>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
