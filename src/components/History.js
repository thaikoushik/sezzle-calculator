import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

export default class History extends React.Component {
    static propTypes = {
        value: PropTypes.array
    };

    render() {
        return (
            <Box className="box-width">
                {/* <div> {this.props.value.map((heading, index) => <h1 key={index}>{heading.answer}</h1>)}</div> */}
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Answer</TableCell>
                                <TableCell>Operation</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.value && this.props.value.slice(Math.max(this.props.value.length - 10, 0)).reverse().map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {row.answer}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.operation}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(row.date).toISOString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    }
}