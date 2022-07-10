import {Component} from "react";
import {Toast} from "react-bootstrap";

export default class CantFind extends Component {
    render() {

        const toastCss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1,
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2, 0 6px 20px 0 rgba(0,0,0,0.19)'
        }
        return (
            <div style={this.props.children.myError ? toastCss: null}>
                <Toast className={"border border-success bg-danger text-white"} myError={this.props.children.myError}>
                    <Toast.Header className={"bg-danger text-white"} closeButton={false}>
                        <strong className={"mr-auto"}>Error</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}