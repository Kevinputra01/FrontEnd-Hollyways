import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import { Rupiah } from "../../convert/rupiahFormat";

export default function ApproveModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Form onSubmit={props.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{props.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Nominal Donation" value={Rupiah(props.amount)} disabled />
          <div className="show-proof text-center my-2">
            <img
              src={process.env.REACT_APP_PATH_FILE + props.proofAttachment}
              alt="img"
              style={{
                maxWidth: "400px",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="danger" className="col-12" onClick={props.handleClose}>
            Approve
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

ApproveModal.propTypes = {
  show: PropTypes.bool.isRequired,
};
