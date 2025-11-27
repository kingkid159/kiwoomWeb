'use client';

import { useEffect, useRef, TouchEvent, useState } from 'react';
import BaseSheet from '@/components/common/BottomSheet';
interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function BottomSheet2({ open, onClose, children }: Props) {
    return (
        <BaseSheet open={open} onClose={onClose} height="85vh">
            <div className="inset-0 z-60 flex items-end">
                <div className="absolute inset-0 pointer-events-none"></div>
                {children}
            </div>
        </BaseSheet>
    );
}
