'use client';
import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { ThemeSwitcher } from './premade/theme-switcher';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
function SiteHeader() {
    const isMobile = useIsMobile();
    return (
        <div>
            <div className="mb-2 flex h-[3vh] items-center">
                {isMobile ? <SidebarTrigger /> : <></>}
                <ThemeSwitcher className="ml-auto" />
            </div>
            <Separator className="mt-4" />
        </div>
    );
}

export default SiteHeader;
