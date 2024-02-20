import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table';

const TableWithMultipleSelection = ({ columns, data }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalPoints, setTotalPoints] = useState(5000);
    const [pointsEntered, setPointsEntered] = useState({}); // State to store points entered in each textbox
    const [checkboxesDisabled, setCheckboxesDisabled] = useState({});
    const [defaultValue, setDefaultValue] = useState(80); // State to track the default value

    useEffect(() => {
        const pointsPerRow = defaultValue;
        const selectedRowCount = selectedRows.length;
        const pointsToDeduct = selectedRowCount * pointsPerRow;

        const enteredPointsTotal = Object.values(pointsEntered).reduce((total, points) => total + parseInt(points), 0);
        if (enteredPointsTotal) {
            setTotalPoints(5000 - enteredPointsTotal);
        }
        else {
            setTotalPoints(5000 - pointsToDeduct);
        }
    }, [selectedRows, pointsEntered, defaultValue]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
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

    useEffect(() => {
        // Update selectedRows state whenever selectedRowIds changes
        setSelectedRows(Object.keys(selectedRowIds));
    }, [selectedRowIds]);

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

    const handleDefaultValueChange = (value) => {
        // Update the default value if it's not less than 0
        if (value >= 0) {
            setDefaultValue(value);
        }

        // Update the default value if it's not less than 80
        if (value >= 80) {
            const newDefaultValue = parseInt(value);
            const newPointsEntered = selectedRows.reduce((acc, rowId) => {
                acc[rowId] = newDefaultValue;
                return acc;
            }, {});
            const pointsToDeduct = Object.keys(newPointsEntered).length * newDefaultValue;
            const enteredPointsTotal = Object.values(newPointsEntered).reduce((total, points) => total + parseInt(points), 0);
            const remainingPoints = 5000 - pointsToDeduct - enteredPointsTotal;

            setDefaultValue(newDefaultValue);
            setPointsEntered(newPointsEntered);
            setTotalPoints(remainingPoints);
        }
    };


    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectedRows(isChecked ? rows.map(row => row.id) : []);
        setPointsEntered(isChecked ? rows.reduce((acc, row) => ({ ...acc, [row.id]: defaultValue }), {}) : {});
    };

    return (
        <div className="table-container">
            <p>Total Points Remaining: {totalPoints}</p>
            <p>
                Default Value :
                <input
                    type="number"
                    value={defaultValue}
                    onChange={(e) => handleDefaultValueChange(e.target.value)}

                />
            </p>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th>
                            <label>
                                Select All
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === rows.length}
                                    onChange={handleSelectAll}
                                />
                            </label>
                        </th>
                        {headerGroups.map(headerGroup => (
                            <React.Fragment key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        const isCheckboxDisabled = !!checkboxesDisabled[row.id];

                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                <td className="checkbox-cell">
                                    <input
                                        type="checkbox"
                                        disabled={isCheckboxDisabled}
                                        checked={selectedRows.includes(row.id)}
                                        onChange={e => toggleRowSelection(row.id, e.target.checked)}
                                    />
                                </td>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>;
                                })}
                                <td className="textbox-cell">
                                    {selectedRows.includes(row.id) && (
                                        <input
                                            type="number"
                                            placeholder="Enter points"
                                            value={pointsEntered[row.id] || defaultValue} // Set default value
                                            onChange={e => handlePointsChange(row.id, e.target.value)}
                                        />
                                    )}
                                </td>
                                <td className="points-cell">
                                    {selectedRows.includes(row.id) && pointsEntered[row.id] !== undefined ? pointsEntered[row.id] + ' points provisioned' : selectedRows.includes(row.id) ? defaultValue + ' points provisioned' : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithMultipleSelection

