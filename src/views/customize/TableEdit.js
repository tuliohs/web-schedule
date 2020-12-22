import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

//const Styles = styled.div`
//  padding: 1rem;
//  table {
//    border-spacing: 0;
//    border: 1px solid black;
//    tr {
//      :last-child {
//        td {
//          border-bottom: 0;
//        }
//      }
//    }
//    th,
//    td {
//      margin: 0;
//      padding: 0.5rem;
//      border-bottom: 1px solid black;
//      border-right: 1px solid black;
//      :last-child {
//        border-right: 0;
//      }
//    }
//  }
//`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()} className="items-center w-full bg-transparent border-collapse">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} >
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-4">{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function TableEdit({ data, title }) {
    const columns = React.useMemo(
        () => [

            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Revisions',
                //accessor: 'revisions',
            },
        ],
        []
    )

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
            <div class="rounded-t mb-0 px-4 py-3 border-0"><div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-lg text-white">{title}</h3></div></div></div>
            <div class="block w-full overflow-x-auto">
                <Table columns={columns} data={data} />
            </div>
        </div>
    )
}

export default TableEdit