import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToDoEmpty({ setMax, max }) {

    return (
        <ToastContainer className="positionedToaster">
            <Toast
                onClose={() => setMax(false)}
                show={max}
                delay={5000}
                autohide
            >
                <Toast.Header className="bg-secondary">
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Ábel</strong>
                    <small className="text-muted">- just now -</small>
                </Toast.Header>
                <Toast.Body className='bg-light'>
                    You've reached the maximum number of todos!
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
