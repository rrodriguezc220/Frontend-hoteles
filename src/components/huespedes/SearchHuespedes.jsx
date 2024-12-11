'use client';

import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BETWEEN_SEARCH = 700;

export default function SearchHuespedes({ placeholder }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        params.set('page', '1');

        replace(`${pathname}?${params.toString()}`);
        
    }, WAIT_BETWEEN_SEARCH);
    
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">Buscar</label>
            <input onChange={(event) => handleSearch(event.target.value)} type="text" className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 appearance-none focus:border-[#3c697e] focus:outline-none" placeholder={placeholder} defaultValue={searchParams.get('search')?.toString()} />
            <CiSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-[#3c697e]"/>
        </div>
    );
}