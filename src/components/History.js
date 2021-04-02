
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

export default class History extends React.Component {
    static propTypes = {
        value: PropTypes.array
    };
    
    render() {
        return (
            <div> {this.props.value.map((heading, index) => <h1 key={index}>{heading.answer}</h1>)}</div>

            // <Box>
            //     <TableContainer>
            //         <Table aria-label="simple table">
            //             <TableHead>
            //                 <TableRow>
            //                     <TableCell>Answer</TableCell>
            //                     <TableCell align="right">Date</TableCell>
            //                 </TableRow>
            //             </TableHead>
            //             <TableBody>
            //                 {!this.props.value && this.props.value.slice(Math.max(this.props.value.length - 10, 1)).map((row, i) => (
            //                     <TableRow key={i}>
            //                         <TableCell component="th" scope="row">
            //                             {row.val().answer}
            //                         </TableCell>
            //                         <TableCell align="right">{row.val().date}</TableCell>
            //                     </TableRow>
            //                 ))}
            //             </TableBody>
            //         </Table>
            //     </TableContainer>
            // </Box>
        )
    }
}