import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu'
import axios from 'axios'
import ExportType from '@/src/application/enums/ExportType'
import { URL } from 'url'
function ExportDropdown({ scheduleId, children }: {scheduleId: number, children: React.ReactNode}) {

    async function handleExport(type: ExportType) {
        try {
            const response = await axios.get(
                `/api/export?id=${scheduleId}&type=${type}`,
                {
                    responseType: 'blob',
                    withCredentials: true,
                }
            )
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['Content-Disposition']

            const fileName = contentDisposition
            ? contentDisposition.split('filename=')[1].replace(/"/g, '')
            : `schedule-${scheduleId}-${new Date().toISOString().split('T')[0]}.${type.toLowerCase()}`

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Export to</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem
                onClick={() => handleExport(ExportType.CSV)}
                >
                    .CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => handleExport(ExportType.XLSX)}
                >
                    .XLSX
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportDropdown