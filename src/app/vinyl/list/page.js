'use client';

import { useEffect, useState } from "react";
import useListData from "../../../hooks/vinylListData";
import DataTable from "react-data-table-component";
import { Button, Spinner } from "reactstrap";
import { useListActions } from "@/src/contexts/listActionContext";
import listAction from "../../../core/listAction";
import { CiEdit, CiTrash } from "react-icons/ci";
import AllVinylDialogs from "../../../elements/Vinyl/AllVinylDialogs";
import {isAdmin} from "@/src/core/auth";
export default function VinylList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { state, dispatch } = useListActions();
    const admin = isAdmin();

    const { getData, loading, data } =
        useListData(`vinyl/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);

    const tableColumns = [
        {
            name: 'Title',
            selector: (row) => `${row.title}`,
            sortable: false
        },
        {
            name: 'Release Date',
            selector: (row) => `${row.releaseYear}`,
            sortable: false
        },
        {
            name: 'Artist',
            selector: (row) => `${row.artistName}`,
            sortable: false
        },
        {
            name: 'Genres',
            selector: (row) => row.genreNames?.join(", "),
            sortable: false
        },

        {
            name: 'Available',
            selector: (row) => row.available ? 'Yes' : 'No',
            sortable: false
        },
        {
            name: 'Rented Until',
            selector: (row) => row.rentedUntil ?? '-',
            sortable: false
        },
        {
            name: 'Options',
            cell: (row) => {
                return (
                    <>
                        {admin && (
                            <div className="d-flex gap-2">
                                <Button
                                    className="btn btn-light"
                                    variant="outline-light"
                                    onClick={() => {
                                        dispatch({
                                            type: listAction.UPDATE,
                                            payload: row
                                        });
                                    }}
                                >
                                    <CiEdit />
                                </Button>

                                <Button
                                    className="btn btn-light"
                                    variant="outline-light"
                                    onClick={() => {
                                        dispatch({
                                            type: listAction.DELETE,
                                            payload: row
                                        });
                                    }}
                                >
                                    <CiTrash />
                                </Button>
                            </div>
                        )}
                    </>
                );
            },
            sortable: false
        }
    ];

    useEffect(() => {
        getData(
            `vinyl/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`
        );
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload) {
            getData(
                `vinyl/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`
            );
        }
    }, [state]);

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return (
        <>
            {data != null && (
                <DataTable
                    data={data.vinyls}
                    columns={tableColumns}
                    striped={true}
                    noHeader={true}
                    pagination
                    paginationServer
                    progressPending={loading}
                    paginationTotalRows={data.totalElements}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    progressComponent={
                        <Spinner color="danger">
                            Loading...
                        </Spinner>
                    }
                    highlightOnHover
                />
            )}
            <AllVinylDialogs />
        </>
    );
}