'use client';

import React from 'react';
import { Grid, CellComponentProps } from 'react-window';

type Contact = {
    groupName: string;
    currentAmount: number;
    pastAmount: number;
    chageRage: string;
};

const headers = ['그룹명', '현재평가금액', '과거평가금액', '변동률'];
type ContactKey = keyof Contact;
const column: ContactKey[] = ['groupName', 'currentAmount', 'pastAmount', 'chageRage'];

const CellComponent = ({
    contacts,
    columnIndex,
    rowIndex,
    style,
}: CellComponentProps<{ contacts: Contact[] }>) => {
    if (rowIndex === 0) {
        return (
            <div
                style={style}
                className="bg-neutral-200 font-semibold text-center border border-gray-300 p-1"
            >
                {headers[columnIndex]}
            </div>
        );
    }

    const contact = contacts[rowIndex - 1]; // 헤더 때문에 -1
    return (
        <div style={style} className="border border-gray-300 p-1 text-center line-clamp-2">
            {contact[column[columnIndex]]}
        </div>
    );
};

export default function MyGrid({ contacts }: { contacts: Contact[] }) {
    return (
        <Grid
            cellComponent={CellComponent}
            cellProps={{ contacts }}
            columnCount={4}
            rowCount={contacts.length}
            columnWidth={columnWidth}
            rowHeight={25}
        ></Grid>
    );
}

const columnWidth = (index: number) => {
    switch (indexToColumn(index)) {
        case 'groupName':
            return 150;
        case 'currentAmount':
            return 200;
        case 'pastAmount':
            return 200;
        case 'chageRage':
            return 200;
        default:
            return 0;
    }
};

function indexToColumn(index: number): string {
    switch (index) {
        case 0:
            return 'groupName';
        case 1:
            return 'currentAmount';
        case 2:
            return 'pastAmount';
        case 3:
            return 'chageRage';
        // 필요하다면 더 추가
        default:
            return '';
    }
}
