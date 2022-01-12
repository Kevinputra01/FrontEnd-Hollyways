import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

import ApproveModal from "../ApproveModal";
import { Rupiah } from "../../../convert/rupiahFormat";

import { API } from "../../../config/api";

export default function ListDonateUser(props) {
  //show approve modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = JSON.stringify({ status: "success" });

      const response = await API.patch(`/fund/${props.fundId}/${props.usersDonateId}`, formData, config);
      console.log(response);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ApproveModalProps = {
    show,
    handleClose,
    usersDonateId: props.usersDonateId,
    userName: props.userName,
    amount: props.amount,
    proofAttachment: props.proofAttachment,
    handleSubmit,
  };
  return (
    <>
      {props.isApproved ? (
        <>
          <div className="p-3 col-12 my-3" style={{ backgroundColor: "white" }} key={props.i}>
            <h4 className="fw-bold">{props.userName}</h4>
            <p>
              <span className="fw-bold">{props.day}</span>, {props.date} {props.month} {props.year}
            </p>
            <p className="text-danger fw-bold">Total : {Rupiah(props.amount)}</p>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 my-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: "white" }} key={props.i}>
            <div className="col-11">
              <h4 className="fw-bold">{props.userName}</h4>
              <p>
              <span className="fw-bold">{props.day}</span>, {props.date} {props.month} {props.year}
              </p>
              <p className="text-danger fw-bold">Total : {Rupiah(props.amount)}</p>
            </div>
            <div className="col-1">
              <Button variant="danger" onClick={handleShow}>
                View
              </Button>
            </div>
          </div>
          <ApproveModal {...ApproveModalProps} />
        </>
      )}
    </>
  );
}
