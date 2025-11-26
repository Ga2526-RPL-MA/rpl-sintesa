export function createFilterFunction<T>(
    fields: Array<(item: T) => string | number>
) {
    return (items: T[], query: string): T[] => {
        if (!query.trim()) return items
        
        const lowerQuery = query.toLowerCase()
        
        return items.filter((item) => {
            const searchableString = fields
                .map(fn => String(fn(item)))
                .join(' ')
                .toLowerCase()
            
            return searchableString.includes(lowerQuery)
        })
    }
}