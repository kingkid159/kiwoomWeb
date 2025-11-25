'use client';

import { useState } from 'react';
import Lnb from '@/components/lnb/Lnb';
import { useActiveMenuStore } from "@/store/ActiveMenu";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { menuName } = useActiveMenuStore()

  return (
    <>
      <header className="w-full h-14 flex items-center px-4 border-b md:hidden">
        <button onClick={() => setOpen(true)}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="ml-4 font-bold">{menuName}</h1>
      </header>

      {/* 모바일 LNB 오버레이 */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="w-64 h-full bg-white shadow-xl p-4">
            <button className="mb-4" onClick={() => setOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
            <Lnb />
          </div>
        </div>
      )}
    </>
  );
}
