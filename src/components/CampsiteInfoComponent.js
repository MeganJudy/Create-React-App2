import "../index.css";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import { Control, LocalForm, Errors } from "react-redux-form";
import Label from "reactstrap/lib/Label";
import Modal from "reactstrap/lib/Modal";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <CardBody>
                    <h4><b>Comments</b></h4>
                    {comments.map(comment => <div><p>{comment.text}
                        <br />-{comment.author}
                        <br />{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p></div>)}
                    <br /> <CommentForm />
                </CardBody>
            </div>
        )
    }
    <div></div>
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: false,
            author: " ",
            comment: " ",
            touched: {
                rating: false,
                author: false,
                comment: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Button color="secondary" outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil fa-lg" />Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name </Label>
                                    <Control.text model=".author" id="author"
                                        name="author"
                                        placeholder="Your Name Here"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="comment">Comments</Label>
                                    <Control.textarea rows="6" model=".comment" id="comment" name="comment" className="form-control"></Control.textarea>
                                </div>
                            </LocalForm>
                            <Button color="primary" onClick={this.handleSubmit}>
                                <i className="fa fa-lg" />Submit
                            </Button>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return (
        <div></div>
    )
}

export default CampsiteInfo;