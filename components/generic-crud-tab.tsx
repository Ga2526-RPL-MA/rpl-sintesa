// components/shared/GenericCrudList.tsx
'use client'
import React, { useEffect, useState, ReactNode } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './table/data-table'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Input } from './ui/input'
import { useIsMobile } from '@/hooks/use-mobile'
import { LayoutGrid, SearchIcon, Table2 } from 'lucide-react'
import { IconPlus } from '@tabler/icons-react'
import ConfirmDialog from './dialogs/confirm-dialog'
import { toast } from 'sonner'
import axios from 'axios'

interface GenericCrudListProps<T> {
    // API Configuration
    apiEndpoint: string
    
    // Display
    entityName: string // e.g., 'Lecturer', 'Course', 'Room'
    entityNamePlural?: string // e.g., 'Lecturers', defaults to entityName + 's'
    
    // Columns
    createColumns: (
        onDelete: (id: number) => void,
        onEdit: (item: T) => void
    ) => ColumnDef<T>[]
    
    // Card View (optional)
    CardComponent?: React.ComponentType<{
        lecturer?: T // For backward compatibility
        item?: T
        onDelete: (id: number) => void
        onEdit: (item: T) => void
    }>
    
    // Dialogs
    AddDialog: React.ComponentType<{
        open: boolean
        onOpenChange: (open: boolean) => void
        onAdd: () => void
    }>
    
    EditDialog: React.ComponentType<{
        open: boolean
        onOpenChange: (open: boolean) => void
        lecturer?: T | null // For backward compatibility
        item?: T | null
        onEdit: () => void
    }>
    
    // Search/Filter
    filterFunction?: (items: T[], query: string) => T[]
    searchPlaceholder?: string
    
    // Optional customization
    defaultView?: 'table' | 'card'
    showViewToggle?: boolean
    skeletonCount?: number
}

export default function GenericCrudList<T extends { id: number }>({
    apiEndpoint,
    entityName,
    entityNamePlural,
    createColumns,
    CardComponent,
    AddDialog,
    EditDialog,
    filterFunction,
    searchPlaceholder = 'Search',
    defaultView = 'card',
    showViewToggle = true,
    skeletonCount = 12,
}: GenericCrudListProps<T>) {
    const [view, setView] = useState<'table' | 'card'>(defaultView)
    const [itemsList, setItemsList] = useState<T[]>([])
    const [selectedItem, setSelectedItem] = useState<T | null>(null)
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState('')

    const isMobile = useIsMobile()
    const pluralName = entityNamePlural || `${entityName}s`

    // Default filter function (searches all fields)
    const defaultFilterFunction = (items: T[], query: string): T[] => {
        if (!query.trim()) return items
        
        const lowerQuery = query.toLowerCase()
        return items.filter((item) =>
            JSON.stringify(Object.values(item))
                .toLowerCase()
                .includes(lowerQuery)
        )
    }

    const filterItems = filterFunction || defaultFilterFunction

    async function fetchItems() {
        try {
            setIsLoading(true)
            const response = await axios.get<T[]>(apiEndpoint, {
                withCredentials: true,
            })
            setItemsList(response.data)
        } catch (err) {
            console.error(`Error fetching ${pluralName.toLowerCase()}:`, err)
            toast.error(`Failed to load ${pluralName.toLowerCase()}`)
        } finally {
            setIsLoading(false)
        }
    }

    function handleAdd() {
        setAddOpen(true)
    }

    function handleEdit(item: T) {
        setSelectedItem(item)
        setEditOpen(true)
    }

    function handleDeleteClick(id: number) {
        setDeleteId(id)
        setDeleteOpen(true)
    }

    async function handleDeleteConfirmation() {
        if (!deleteId) return

        try {
            await axios.delete(`${apiEndpoint}?id=${deleteId}`, {
                withCredentials: true,
            })

            toast.success(`${entityName} deleted successfully!`)
            fetchItems()
        } catch (err: any) {
            console.error(`Error deleting ${entityName.toLowerCase()}:`, err)
            toast.error(
                err.response?.data?.error ||
                    `Failed to delete ${entityName.toLowerCase()}`
            )
        } finally {
            setDeleteOpen(false)
            setDeleteId(null)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const columns = createColumns(handleDeleteClick, handleEdit)
    const filteredItems = filterItems(itemsList, filter)

    return (
        <>
            <div className="bg-background p-4 rounded-2xl h-full flex flex-col">
                {/* Header with controls */}
                <div className="grid grid-cols-[0.5fr_1fr_0.5fr] gap-2 items-center mb-4">
                    {/* View Toggle */}
                    {showViewToggle && CardComponent && (
                        <div className="flex space-x-2">
                            <Button
                                variant={'outline'}
                                onClick={() => setView('table')}
                                className={view === 'table' ? 'bg-muted' : ''}
                            >
                                <Table2 />
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={() => setView('card')}
                                className={view === 'card' ? 'bg-muted' : ''}
                            >
                                <LayoutGrid />
                            </Button>
                        </div>
                    )}

                    {/* Search */}
                    <div className="mx-auto flex items-center gap-2">
                        <SearchIcon className="text-muted-foreground" />
                        <Input
                            className="rounded-2xl w-[150px] md:w-[200px] lg:w-[300px]"
                            placeholder={searchPlaceholder}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    {/* Add Button */}
                    <div className="w-fit ml-auto">
                        <Button onClick={handleAdd}>
                            {isMobile ? (
                                <IconPlus />
                            ) : (
                                <>
                                    <IconPlus />
                                    Add
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Content - Card or Table View */}
                {view === 'card' && CardComponent ? (
                    <div className="grid grid-cols-1 rounded-md auto-rows-min lg:grid-cols-[1fr_1fr] gap-2 overflow-y-auto flex-1">
                        {isLoading ? (
                            Array.from({ length: skeletonCount }).map((_, i) => (
                                <Skeleton key={i} className="h-30 w-full" />
                            ))
                        ) : filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <CardComponent
                                    key={item.id}
                                    item={item}
                                    lecturer={item} // Backward compatibility
                                    onDelete={handleDeleteClick}
                                    onEdit={handleEdit}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                {filter ? (
                                    <>No {pluralName.toLowerCase()} found matching "{filter}"</>
                                ) : (
                                    <>No {pluralName.toLowerCase()} available</>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    isLoading ? (
                        <Skeleton className="w-full h-full" />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={itemsList}
                            globalFilter={filter}
                        />
                    )
                )}
            </div>

            {/* Dialogs */}
            <AddDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                onAdd={fetchItems}
            />

            <EditDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                item={selectedItem}
                lecturer={selectedItem} // Backward compatibility
                onEdit={fetchItems}
            />

            <ConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDeleteConfirmation}
                title={`Delete ${entityName}?`}
                description={`Are you sure you want to delete this ${entityName.toLowerCase()}?\nThis action cannot be undone!`}
            />
        </>
    )
}