'use client';

import {
    Row,
    Col,
    Button,
    Card,
    CardBody
} from "reactstrap";

import {useForm} from "react-hook-form";
import {Axios} from "../../../core/httpClient";
import {useRouter} from "next/navigation";

export default function VinylCreate() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (data) => {

        const vinyl = {
            title: data.title,
            releaseYear: Number(data.releaseYear),
            userId: Number(data.userId),
            artistId: Number(data.artistId),

            genreIds: data.genreIds
                .split(",")
                .map(id => Number(id.trim())),

            available: data.available,

            rentedUntil:
                data.available
                    ? null
                    : data.rentedUntil || null
        };

        await Axios.post("/vinyl/create", vinyl);

        router.push("/");
    };

    return (
        <Row className="justify-content-center mt-5">
            <Col md={8} lg={6}>

                <Card className="shadow">
                    <CardBody className="p-4">

                        <h2 className="text-center mb-4">
                            Create Vinyl
                        </h2>

                        <Row>

                            <Col md={6} className="mb-3">
                                <label className="form-label">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter title"
                                    {...register("title", {
                                        required: "Title is required",
                                        maxLength: 100,
                                        minLength: 2,
                                    })}
                                />

                                {errors.title && (
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
                                        required: "Release Year is required",
                                    })}
                                />

                                {errors.releaseYear && (
                                    <span className="text-danger">
                                        {errors.releaseYear.message}
                                    </span>
                                )}
                            </Col>

                            <Col md={6} className="mb-3">
                                <label className="form-label">
                                    Artist ID
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter artist ID"
                                    {...register("artistId", {
                                        required: "Artist ID is required",
                                    })}
                                />

                                {errors.artistId && (
                                    <span className="text-danger">
                                        {errors.artistId.message}
                                    </span>
                                )}
                            </Col>


                            <Col md={6} className="mb-3">
                                <label className="form-label">
                                    Genre IDs
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Example: 1,2,3"
                                    {...register("genreIds", {
                                        required: "Genre IDs are required"
                                    })}
                                />

                                {errors.genreIds && (
                                    <span className="text-danger">
                                        {errors.genreIds.message}
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


                            <Col md={12} className="mb-4">
                                <div className="form-check">

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

                        <Button
                            color="primary"
                            className="w-100"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Create Vinyl
                        </Button>

                    </CardBody>
                </Card>

            </Col>
        </Row>
    );
}