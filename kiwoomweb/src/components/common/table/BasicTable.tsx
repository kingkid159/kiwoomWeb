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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {header.map((item) => (
                            <TableCell key={item} align="center">
                                {item}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row[columnIdKey] as React.Key}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            {columnKeys.map((key) => (
                                <TableCell
                                    key={row[key] as React.Key}
                                    align="center"
                                    sx={{ maxWidth: 150 }}
                                >
                                    <Typography
                                        noWrap={false}
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {row[key] as React.ReactNode}
                                    </Typography>
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
