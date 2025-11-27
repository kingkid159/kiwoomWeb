import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from 'node_modules/@mui/material/Typography';

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
                        {header.map((item) => (
                            <TableCell
                                key={item}
                                className="max-w-[150px]" align="center"
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
                                    className="max-w-[150px]" align="center"
                                >
                                    {key === 'color' ? (
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="w-3 h-3 rounded-sm max-w-[15px]"
                                                style={{ backgroundColor: row[key] as string }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="line-clamp-2 text-xs min-w-[50px]">{row[key] as React.ReactNode}</div>
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
