import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { ThemeSwitcher } from './premade/theme-switcher';
import { Separator } from './ui/separator';
function SiteHeader() {
    return (
        <div>
            <div className="mb-2 flex items-center">
                {/* <SidebarTrigger /> */}
                <ThemeSwitcher className="ml-auto" />
            </div>
            <Separator className="mt-4" />
        </div>
    );
}

export default SiteHeader;
