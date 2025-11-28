import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props<T> {
    header: Array<string>;
    columnKeys: (keyof T)[];
    rows: Array<T>;
    columnIdKey: keyof T;
}

const BasicTable = <T extends object>({ header, columnKeys, rows, columnIdKey }: Props<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {header.map((item, index) => (
                            <TableCell
                                key={item as React.Key}
                                align="center"
                                className={`text-xs ${
                                    index === 1
                                        ? 'sticky left-0 bg-white z-10 w-[80px] min-w-[80px]'
                                        : item === ''
                                        ? ' w-[40px] min-w-[40px]'
                                        : ' w-[80px] min-w-[80px]'
                                }`}
                            >
                                <div
                                    className="
                                            line-clamp-2 
                                            overflow-hidden 
                                            text-ellipsis 
                                            break-words
                                            text-xs
                                            "
                                >
                                    {item}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row[columnIdKey] as React.Key}
                            className="border-b last:border-b-0"
                        >
                            {columnKeys.map((key, index) => (
                                <TableCell
                                    key={row[key] as React.Key}
                                    align="center"
                                    className={`text-xs ${
                                        index === 1
                                            ? 'sticky left-0 bg-white z-10 w-[80px] min-w-[80px]'
                                            : key === 'color'
                                            ? ' w-[40px] min-w-[40px]'
                                            : ' w-[80px] min-w-[80px]'
                                    }`}
                                >
                                    {key === 'color' ? (
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="w-3 h-3 rounded-sm"
                                                style={{ backgroundColor: row[key] as string }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="line-clamp-2 text-xs min-w-[50px]">
                                            {row[key] as React.ReactNode}
                                        </div>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasicTable;
