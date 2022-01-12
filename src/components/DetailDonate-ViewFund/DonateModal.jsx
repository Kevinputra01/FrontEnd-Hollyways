import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import AttachPayment from "../../assets/img/attachpayment.png";

import { API } from "../../config/api";

export default function DonateModal(props) {
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    donateAmount: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const history = useHistory();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("proofAttachment", form.image[0], form.image.name);
      formData.set("donateAmount", form.donateAmount);
      formData.set("status", "pending");

      const response = await API.post(`/fund/${props.fundId}`, formData, config);
      console.log(response);

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={props.showDonateModal} onHide={props.handleCloseDonateModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Form className="py-4 px-2" onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Control type="number" placeholder="Nominal Donation" name="donateAmount" onChange={handleChange} />
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                  className="my-3"
                  alt="preview"
                />
              </div>
            )}
            <div className="d-flex justify-content-start my-3">
              <label htmlFor="upload" className="btn btn-danger">
                Attach Payment
                <img src={AttachPayment} alt="img" className="px-2" />
              </label>
              <input type="file" id="upload" hidden name="image" onChange={handleChange} />
              <p className="text-secondary ms-3">*transfers can be made to holyways accounts</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="danger" className="col-12" onClick={props.handleCloseDonateModal}>
              Donate
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

DonateModal.propTypes = {
  showDonateModal: PropTypes.bool.isRequired,
};
