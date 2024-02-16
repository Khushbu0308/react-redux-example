import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table';

const TableWithMultipleSelection = ({ columns, data }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalPoints, setTotalPoints] = useState(5000);
    const [pointsEntered, setPointsEntered] = useState({}); // State to store points entered in each textbox
    const [checkboxesDisabled, setCheckboxesDisabled] = useState({});

    useEffect(() => {
        const pointsPerRow = 50;
        const selectedRowCount = selectedRows.length;
        const pointsToDeduct = selectedRowCount * pointsPerRow;
        const enteredPointsTotal = Object.values(pointsEntered).reduce((total, points) => total + parseInt(points), 0);
        setTotalPoints(5000 - pointsToDeduct - enteredPointsTotal);
    }, [selectedRows, pointsEntered]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                selectedRowIds: {},
            },
            getRowId: row => row.id
        },
        useRowSelect
    );

    const toggleRowSelection = (rowId, isSelected) => {
        setSelectedRows(prevSelectedRows => {
            if (isSelected) {
                setCheckboxesDisabled(prevCheckboxesDisabled => ({
                    ...prevCheckboxesDisabled,
                    [rowId]: true
                }));
                return [...prevSelectedRows, rowId];
            } else {
                setCheckboxesDisabled(prevCheckboxesDisabled => {
                    const updatedCheckboxesDisabled = { ...prevCheckboxesDisabled };
                    delete updatedCheckboxesDisabled[rowId];
                    return updatedCheckboxesDisabled;
                });
                return prevSelectedRows.filter(id => id !== rowId);
            }
        });
    };

    const handlePointsChange = (rowId, points) => {
        if (points === '') {
            // If points are empty, remove them from the state
            const { [rowId]: removedPoint, ...remainingPoints } = pointsEntered;
            setPointsEntered(remainingPoints);
        } else {
            // Otherwise, update the points in the state
            setPointsEntered(prevPointsEntered => ({
                ...prevPointsEntered,
                [rowId]: points
            }));
        }
    };

    return (
        <div className="table-container">
            <p>Total Points Remaining: {totalPoints}</p>
            <p> Default Points : 50</p>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        const isCheckboxDisabled = !!checkboxesDisabled[row.id];

                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                                <td className="checkbox-cell">
                                    <input type="checkbox" disabled={isCheckboxDisabled} onChange={e => toggleRowSelection(row.id, e.target.checked)} />
                                </td>
                                <td className="textbox-cell">
                                    {selectedRows.includes(row.id) && (
                                        <input
                                            type="text"
                                            placeholder="Enter points"
                                            onChange={e => handlePointsChange(row.id, e.target.value)}
                                        />
                                    )}
                                </td>
                                <td className="points-cell">{selectedRows.includes(row.id) && '50 points assigned'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithMultipleSelection;
