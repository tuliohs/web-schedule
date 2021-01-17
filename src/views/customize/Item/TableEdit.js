import React from 'react'
import { useTable } from 'react-table'
import TableToolbar from './TableToolbar'
import TableDropdown from './TableDropdown'


// Create an editable cell renderer
const EditableCell = ({ value: initialValue, row: { index }, column: { id, editavel = true }, updateMyData,// This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => setValue(e.target.value)

    // We'll only update the external data when the input is blurred
    const onBlur = () => updateMyData(index, id, value)

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => setValue(initialValue), [initialValue])

    return <input disabled={!editavel} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-3 border-t-0 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap bg-blue-900"
        value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

function Table({ columns, data, setItemCurrentAction, removeItemHandler, updateMyData, skipPageReset }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        //page,
        //canPreviousPage,
        //canNextPage,
        //pageOptions,
        //pageCount,
        //gotoPage,
        //nextPage,
        //previousPage,
        //setPageSize,
    } = useTable({
        columns,
        data,
        defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
    })

    const actions = [
        { id: 1, name: 'Remove', onClick: removeItemHandler },
    ]

    // Render the UI for your table
    return (
        <table {...getTableProps()} className="items-center w-full bg-transparent border-collapse">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            //<a class="text-gray-600 py-1 px-3" href="#pablo"><i class="fas fa-ellipsis-v"></i></a>
                            <th {...column.getHeaderProps()} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">{column.render('Header')}</th>
                        ))}
                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700"> </th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onSelect={() => setItemCurrentAction(row?.original)} >
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className="">{cell.render('Cell')}</td>
                            })}
                            <th><a className="text-gray-600 py-1 px-3" href="#/" ><TableDropdown rowHandler={() => setItemCurrentAction(row?.original)} actions={actions} /></a></th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function TableEdit({ data, title, addItemHandler, setItemCurrentAction, removeItemHandler, changeItemHandler }) {
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
                accessor: 'detail.state',
                editavel: false
            },
            {
                Header: 'Revisions',
                //accessor: 'revisions',
                editavel: false
            },
        ],
        []
    )

    const [/*curr*/, setData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
        changeItemHandler({ columnId: columnId, value: value })
    }

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    //React.useEffect(() => {
    //    setSkipPageReset(false)
    //}, [data])

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
            <TableToolbar
                //numSelected={Object.keys(selectedRowIds).length}
                addItemHandler={addItemHandler}
                //preGlobalFilteredRows={preGlobalFilteredRows}
                //setGlobalFilter={setGlobalFilter}
                //globalFilter={globalFilter}
                title={title}
            />
            <div className="block w-full overflow-x-auto">
                <Table columns={columns} data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    setItemCurrentAction={setItemCurrentAction}
                    removeItemHandler={removeItemHandler} />
            </div>
        </div>
    )
}

export default TableEdit