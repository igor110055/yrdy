import React from "react";
import {
  Box, Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TablePagination,
  TableRow, Typography
} from "@mui/material";
import {ChainInfo} from "../../utils/statsConsts";
import {TVL} from "../../hooks/useTVL";
import {ChainId} from "@certusone/wormhole-sdk";
import StatsHeader from "./StatsHeader";
import {getSorted, numberFormatter, yAxisCurrencyFormatter} from "../../utils/helpers";
import {Token} from "@mui/icons-material";

export interface PaginatedTableChartProps {
  chain: ChainInfo;
  data: TVL[];
  onBackClick: () => void;
}

interface Column {
  id: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

enum HeaderId {
  logo = 'logo',
  symbol = 'symbol',
  amount = 'amount',
  quotePrice = 'quotePrice',
  totalValue = 'totalValue',
}

interface TVLColumn {
  [key: string]: string | number | ChainId;
}

const TVLDetailTable: React.FC<PaginatedTableChartProps> = (props: PaginatedTableChartProps) => {
  const {chain, data, onBackClick} = props;
  const sortedData = getSorted(data, 'totalValue');
  const maxTotalValue = (sortedData[0] as TVL).totalValue ?? 0;
  const normalise = (value: number) => (value * 100) / maxTotalValue;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns: readonly Column[] = [
    {
      id: HeaderId.logo,
      label: '',
      width: 24,
      minWidth: 24,
      align: 'center',
    },
    {
      id: HeaderId.symbol,
      label: 'Token',
      minWidth: 60,
      align: 'left',
    },
    {
      id: HeaderId.amount,
      label: 'Quantity',
      minWidth: 100,
      align: 'right',
      format: value => numberFormatter(value, 2, 'decimal')
    },
    {
      id: HeaderId.quotePrice,
      label: 'Unit Price',
      minWidth: 74,
      align: 'right',
      format: value => numberFormatter(value, 4)
    },
    {
      id: HeaderId.totalValue,
      label: 'Value (USD)',
      minWidth: '30%',
      width: '60%',
      align: 'left',
      format: yAxisCurrencyFormatter
    },
  ];

  const chainTotal = data.reduce((total, tvl) => total + (tvl.totalValue ?? 0), 0);

  return (
    <React.StrictMode>
      <StatsHeader
        title={`Total Value Locked on ${chain.name}`}
        backText={`Back to all chains`}
        onBackClick={onBackClick}
        value={numberFormatter(chainTotal)}
      />
      <Box
        sx={{
          flexBasis: {xs: "100%", md: "50%"},
          textAlign: "center",
          flexGrow: 1,
          backgroundColor: "rgba(255, 255, 255, 0.05);",
          backdropFilter: 'blur(15px)',
          py: {xs: 3},
          px: {xs: 2},
        }}
      >
        <TableContainer sx={{maxHeight: 560}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      backgroundColor: "initial",
                      borderBottom: 1,
                      borderColor: "white",
                      minWidth: column.minWidth,
                      width: column.width
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(sortedData as TVL[])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: TVL, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = (row as TVLColumn)[column.id];
                        let cellValue: any;

                        switch (column.id) {
                          case HeaderId.logo:
                            cellValue = <Token/>;
                            if (value) {
                              cellValue = <img src={value as string} width={24} height={24} alt={row.name}/>;
                            }
                            break;
                          case HeaderId.amount:
                          case HeaderId.quotePrice:
                            cellValue = column.format ? column.format(+value) : value;
                            break;
                          case HeaderId.totalValue:
                            cellValue = <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  minWidth: '1%',
                                  width: `${normalise(+value)}%`,
                                  mr: 1,
                                  height: 30,
                                  background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 40%);',
                              }}
                              />
                              <Box sx={{ minWidth: 60 }}>
                                <Typography variant="body2">
                                  {column.format ? column.format(+value) : value}
                                </Typography>
                              </Box>
                            </Box>
                            break;
                          default:
                            cellValue = value;
                        }

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            padding="none"
                            style={{border: 'none'}}
                          >
                            {cellValue}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            borderTop: 1,
            borderColor: "white",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </React.StrictMode>
  );
}

export default TVLDetailTable;
