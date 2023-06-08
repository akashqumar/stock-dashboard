import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, FormControl, InputLabel, Select } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const handleShareEmail = (stock) => {
  if (stock) {
    const emailSubject = "Stock Price Information";
    const emailBody = `The stock price on ${stock.date} is ${stock.price}.`;
    const emailUrl = `mailto:boss@example.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
  }
};

const handleShareWhatsApp = (stock) => {
  if (stock) {
    const message = `The stock price on ${stock.date} is ${stock.price}.`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }
};

export default function CustomizedTables({ stockData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date and Time</StyledTableCell>
            <StyledTableCell align="right">OPEN</StyledTableCell>
            <StyledTableCell align="right">VOLUME</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockData.map((stock) => (
            <StyledTableRow>
              <StyledTableCell>{stock.date}</StyledTableCell>
              <StyledTableCell align="right">{stock.open}</StyledTableCell>
              <StyledTableCell align="right">{stock.volume}</StyledTableCell>
              <StyledTableCell align="right">{stock.price}</StyledTableCell>

              <Box sx={{ minWidth: 10, marginLeft: "30px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Share</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                  >
                    <Button
                      onClick={() => handleShareWhatsApp(stock)}
                      variant="text"
                    >
                      WhatsApp
                    </Button>
                    <br />
                    <Button
                      onClick={() => handleShareEmail(stock)}
                      variant="text"
                    >
                      Email
                    </Button>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
