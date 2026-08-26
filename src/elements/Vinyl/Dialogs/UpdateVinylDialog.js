'use client';

import { useListActions } from "../../../contexts/listActionContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import listAction from "../../../core/listAction";
import { Axios } from "../../../core/httpClient";


export const UpdateVinylDialog = ({ isOpen }) => {

    const { state, dispatch } = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        setValue("id", state.row?.id);
        setValue("title", state.row?.title);
        setValue("releaseYear", state.row?.releaseYear);
        setValue("available", state.row?.available);
        setValue("rentedUntil", state.row?.rentedUntil);
    }, [state, setValue]);

    const onSubmit = async (data) => {

        const vinyl = {
            id: Number(data.id),
            title: data.title,
            releaseYear: Number(data.releaseYear),
            available: data.available ,
            rentedUntil:
                data.available
                    ? null
                    : data.rentedUntil || null
        };

        await Axios.put("vinyl/update", vinyl);

        dispatch({
            type: listAction.RESET
        });

        dispatch({
            type: listAction.RELOAD,
            payload: true
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg">

            <ModalHeader toggle={toggle}>
                Edit Vinyl
            </ModalHeader>

            <ModalBody className="p-4">

                <div className="border rounded shadow-sm p-4">

                    <h5 className="mb-4">
                        Vinyl Information
                    </h5>

                    <Row>

                        <Col md={6} className="mb-3">
                            <label className="form-label">
                                Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter vinyl title"
                                {...register("title", {
                                    required: "Title is required",
                                    maxLength: 100,
                                    minLength: 2
                                })}
                            />

                            {errors?.title && (
                                <span className="text-danger">
                            {errors.title.message}
                        </span>
                            )}
                        </Col>

                        <Col md={6} className="mb-3">
                            <label className="form-label">
                                Release Year
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter release year"
                                {...register("releaseYear", {
                                    required: "Release year is required"
                                })}
                            />

                            {errors?.releaseYear && (
                                <span className="text-danger">
                            {errors.releaseYear.message}
                        </span>
                            )}
                        </Col>

                        <Col md={6} className="mb-3">
                            <label className="form-label">
                                Rented Until
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                {...register("rentedUntil")}
                            />
                        </Col>


                        <Col
                            md={6}
                            className="mb-3 d-flex align-items-end"
                        >
                            <div className="form-check mb-2">

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="available"
                                    {...register("available")}
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor="available"
                                >
                                    Available
                                </label>

                            </div>
                        </Col>

                    </Row>

                </div>

            </ModalBody>


            <ModalFooter className="px-4 pb-4">

                <Button
                    color="secondary"
                    onClick={toggle}
                >
                    Cancel
                </Button>

                <Button
                    color="success"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    Save Changes
                </Button>

            </ModalFooter>

        </Modal>
    );
};

export default UpdateVinylDialog;