import React from 'react';
import TableWithMultipleSelection from './TableWithMultipleSelection';

const MyComponent = () => {
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Employee Id',
            accessor: 'employee_id',
        },
    ];

    const data = [
        { id: 129771, name: 'Abdul Hasan', employee_id: "SCL003333", email: 'abdul.hasan@sworks.co.in' },
        { id: 129772, name: 'Khushbu Rani', employee_id: "SCL003334", email: 'khushbu.rani@sworks.co.in' },
        { id: 129773, name: 'Sharfe Alam', employee_id: "SCL003335", email: 'sharfe.alam@sworks.co.in' },
        { id: 129774, name: 'Anu Dull', employee_id: "SCL003336", email: 'anu.dull@sworks.co.in' },
        { id: 129776, name: 'Atul Singh', employee_id: "SCL003337", email: 'atul.singh@sworks.co.in' },
        { id: 129777, name: 'Pankaj Kumar', employee_id: "SCL003338", email: 'pankaj.kumar@sworks.co.in' },
        { id: 129778, name: 'Nikhil Arya', employee_id: "SCL003339", email: 'nikhil.arya@sworks.co.in' },
        { id: 129779, name: 'Manasvi Malav', employee_id: "SCL003340", email: 'manasvi.malav@sworks.co.in' },
        { id: 129780, name: 'Nikhil Bhardwaj', employee_id: "SCL003341", email: 'nikhil.bhardwaj@sworks.co.in' },

    ];

    return (
        <div>
            <TableWithMultipleSelection columns={columns} data={data} />
        </div>
    );
};

export default MyComponent;
