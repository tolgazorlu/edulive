import {
  ListItem,
  Menu,
  MenuHandler,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, HomeIcon, MessageSquareIcon } from "lucide-react";
import React from "react";

interface NavItemPropsType {
  children: React.ReactNode;
  href?: string;
}

type ItemType = {
  title: string;
  desc?: string;
  link: string;
  icon?: React.ReactNode;
  childs?: ItemType[];
};

const items: ItemType[] = [
  {
    title: "Home",
    link: "/",
    icon: <HomeIcon className='h-5 w-5' />,
  },

  {
    title: "Contact",
    link: "/#contact",
    icon: <MessageSquareIcon className='h-5 w-5' />,
  },
];

function NavItem({ children, href }: NavItemPropsType) {
  return (
    <Typography
      href={href}
      variant='small'
      color='blue-gray'
      className='focus:bg-transparent text-blue-gray-500 text-md flex items-center gap-2 font-medium cursor-pointer hover:text-purple-500'
    >
      {children}
    </Typography>
  );
}

const NavItems = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {items.map((item: ItemType, index: number) => {
        return (
          <>
            {item.childs ? (
              <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement='bottom'
                allowHover={true}
                key={index}
              >
                <MenuHandler>
                  <ListItem
                    className='flex gap-2 items-center text-blue-gray-500 p-0 hover:text-purple-500 text-md focus:bg-transparent hover:bg-transparent'
                    key={index}
                  >
                    {item.icon}
                    {item.title}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 ml-1 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                </MenuHandler>
              </Menu>
            ) : (
              <div
                key={index}
                onClick={() => (window.location.href = item.link)}
              >
                <NavItem>
                  {item.icon}
                  {item.title}
                </NavItem>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default NavItems;
