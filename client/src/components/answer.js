import React from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'


class Answer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            'show': true,
            'answer': this.props.answer,
            'variant': 'dark'
        }

        if(this.state.answer.includes('I am unable to find the answer to this question.')){
            this.state = {
                'variant': 'danger'
            }
        }else{
            this.state = {
                'variant': 'success'
            }
        }


        this.handleShow = this.handleShow.bind(this)
    }


    handleShow(event){
        this.setState({
            'show': false,
            'answer': ''
        })
    }

    render(){
        return(
            <Alert show={this.state.show} variant={this.state.variant}>
                <Alert.Heading> Answer </Alert.Heading>
                <p>{this.props.answer}</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={this.handleShow} variant= {'outline-'+this.state.variant}>
                    Close
                    </Button>
                </div>
            </Alert>
        )
    }
}


export default Answer