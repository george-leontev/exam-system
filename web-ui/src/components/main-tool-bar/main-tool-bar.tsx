import './main-tool-bar.scss'

import { Menu } from 'primereact/menu';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SiTestcafe as LogoIcon } from "react-icons/si";
import { IoMdMore as MoreIcon } from "react-icons/io";
import { useRef } from 'react';


export const MainToolBar = () => {
    const menuRef = useRef<Menu>(null);

    const items = [
        {
            label: 'Add test',
            icon: 'pi pi-plus'
        }
    ];

    const startContent = (
        <div className='logo-component'>
            <LogoIcon className='logo-icon' />
            <p style={{fontSize: '22px'}}>Test constructor</p>
        </div>
    );

    const endContent = (
        <div style={{paddingRight: '20px'}}>
            <Button onClick={(event) => menuRef.current!.toggle(event)} aria-controls="popup_menu_left" aria-haspopup icon={<MoreIcon className='more-icon' />} />
        </div>
    );

    return (
        <div>
            <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
            <Toolbar className='text-black' start={startContent} end={endContent} />
        </div>
    );
}