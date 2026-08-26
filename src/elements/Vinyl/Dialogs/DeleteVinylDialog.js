'use client';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useListActions } from "../../../contexts/listActionContext";
import listAction from "../../../core/listAction";
import { Axios } from "../../../core/httpClient";

const DeleteVinylDialog = ({ isOpen }) => {

    const { state, dispatch } = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const deleteVinyl = async () => {
        await Axios.delete(`vinyl/delete/${state.row.id}`);

        dispatch({
            type: listAction.RESET
        });

        dispatch({
            type: listAction.RELOAD,
            payload: true
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Delete Vinyl
            </ModalHeader>

            <ModalBody>
                Are you sure you want to delete
                <strong> {state.row?.title}</strong>?
            </ModalBody>

            <ModalFooter>
                <Button color="danger" onClick={deleteVinyl}>
                    Delete
                </Button>

                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteVinylDialog;