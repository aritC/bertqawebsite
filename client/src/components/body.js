import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Answer from './answer'
import axios from 'axios';

class Body extends React.Component{

    constructor(){
        super();
        this.state = {
            question: '',
            context: '',
            answer:'',
            errormessage:[],
            error:false,
            close: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleInputChange(event){
        const target = event.target
        this.setState({
            [target.id] : target.value,
            answer: ''
        })

        
    }

    handleSubmit(event){

        const question = this.state.question
        const context = this.state.context

        console.log('Request Sent : ', { question, context })
        axios.post(`http://127.0.0.1:5000/question`, { question, context })
        .then(res => {
            this.setState({
                answer: res.data.message
            })
        }).catch((err)=>{
            this.setState({
                'close': true,
                'errormessage': err.response.data.message
            })
        })
    }

    handleClose(event){
        this.setState({
            'close': false
        })
    }

    render(){
        return (
            <div style={{padding: '2em'}} className="justify-content-md-center">
            <Toast onClose={this.handleClose} position = 'bottom-start' className="rounded me-2" bg='danger' show={this.state.close} delay={3000} autohide>
                <Toast.Header>
                <strong className="me-auto">Error Occured</strong>
                </Toast.Header>
                <Toast.Body >
                    <ul>
                    {this.state.errormessage.map((msg) => (
                        <li>{msg}</li>
                    ))}
                    </ul>
                </Toast.Body>
            </Toast>
            <Form>
            <Row className="justify-content-md-center">
                <Col md="8">
            <Form.Group className="mb-3" controlId="context" onChange = {this.handleInputChange}>
                <FloatingLabel label = 'Enter A Context :' controlId="context">
                <Form.Control as='textarea'  placeholder="Enter A Context"/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="question" onChange = {this.handleInputChange}>
                <FloatingLabel label='Ask A Question :' controlId="question">
                <Form.Control  placeholder="Ask a Question" />
                </FloatingLabel>
            </Form.Group>
            </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="8">
            <Button variant="primary" size="mb" active onClick = {this.handleSubmit}>
                Answer
            </Button>
            </Col>
            </Row>
            </Form>

            {this.state.answer !== '' ? <Answer answer={this.state.answer}/> : ''}
            
            </div>
        )
    }
}

export default Body;