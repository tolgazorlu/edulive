import { ModeToggle } from "@/components/mode-toggle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { RadioIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const { OCId, ethAddress } = useOCAuth();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const navigate = useNavigate();

  return (
    <Menubar className='rounded-none border-b border-none px-2 lg:px-4 flex justify-between z-50'>
      <MenubarMenu>
        <MenubarTrigger className='text-lg font-semibold flex gap-1 text-primary'>
          <RadioIcon />
          edulive
        </MenubarTrigger>
      </MenubarMenu>

      <div className='flex'>
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <ModeToggle />
          <MenubarContent forceMount>
            <MenubarLabel inset>{OCId}</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value='etherium'>
              <MenubarRadioItem value='address'>
                {ethAddress?.slice(0, 10)}...{ethAddress?.slice(-4)}
              </MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset onClick={() => navigate("/account")}>
              Manage Account
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogout} inset className='text-red-500'>
              Log out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
