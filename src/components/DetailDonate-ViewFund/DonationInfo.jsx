import React, { useState, useEffect } from "react";
import { Button, ProgressBar, Modal, Alert } from "react-bootstrap";

import DonateModal from "./DonateModal";

import { Rupiah } from "../../convert/rupiahFormat";

import { API } from "../../config/api";
import { useHistory } from "react-router-dom";

export default function DonationInfo(props) {
  //modal donate
  const [showDonateModal, setShowDonateModal] = useState(false);
  const handleCloseDonateModal = () => setShowDonateModal(false);
  const handleShowDonateModal = () => setShowDonateModal(true);

  //get fund
  const [fund, setFund] = useState([]);
  const getFund = async () => {
    try {
      const response = await API.get(`/fund/${props.params.id}`);
      setFund(response.data.data.fund);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFund();
  }, []);


  // get usersDonate length
  const [usersDonateLength, setUsersDonateLength] = useState(0);
  const getUsersDonateLength = async () => {
    try {
      const response = await API.get(`/usersDonate/${props.params.id}`);
      setUsersDonateLength(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersDonateLength();
  }, []);

  //modal confirm delete
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = () => setShowConfirmModal(true);

  //handling edit and delete
  const historyEdit = useHistory();
  const historyDelete = useHistory();
  const handleEditFund = () => {
    historyEdit.push(`/edit-fund/${props.params.id}`);
  };
  const [alert, setAlert] = useState("");
  const handleFinishFund = async () => {
    try {
      const response = await API.delete(`/fund/${props.params.id}`);
      console.log(response);
      handleCloseConfirmModal();
      historyDelete.push("/raise-fund");
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Server Error</Alert>;
      setAlert(alert);
    }
  };

  const total = Rupiah(fund.donationObtained);
  const target = Rupiah(fund.goal);
  const progress = (Number(fund.donationObtained) / Number(fund.goal)) * 100;

  return (
    <>
      <div className="py-5 d-flex" key={fund.id}>
        <img src={process.env.REACT_APP_PATH_FILE + fund.thumbnail} alt="" className="rounded col-5" style={{ objectFit: "cover" }} />
        <div className="offset-1 col-5">
          <h3>{fund.title}</h3>
          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <p className="text-danger fw-bold">
                {total}
                <span className="ms-3 text-secondary">gathered from</span>
              </p>
              <p className="fw-bold text-secondary">{target}</p>
            </div>
            <div className="mb-2">
              <ProgressBar variant="danger" now={progress} />
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <span className="fw-bold">{usersDonateLength}</span> Donation
              </p>
              <p>
                <span className="fw-bold">150</span> More Day
              </p>
            </div>
            <p className="text-secondary mt-3">{fund.description}</p>
          </div>
          {props.isViewFund ? (
            <>
              <Button className="col-12 btn btn-danger my-2" onClick={handleShowDonateModal}>
                Donate
              </Button>
              <Button className="col-12 btn btn-danger my-2" onClick={handleEditFund}>
                Edit Fund
              </Button>
              <Button className="col-12 btn btn-danger my-2" onClick={handleShowConfirmModal}>
                Delete Fund
              </Button>
            </>
          ) : (
            <Button className="col-12 btn btn-danger my-2" onClick={handleShowDonateModal}>
              Donate
            </Button>
          )}

          {/* donate modal */}
          <DonateModal fundId={props.params.id} showDonateModal={showDonateModal} handleCloseDonateModal={handleCloseDonateModal} />

          {/* confirm delete modal */}
          <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Finish Fund</Modal.Title>
            </Modal.Header>
            {alert && alert}
            <Modal.Body className="fw-bold">Delete "{fund.title}" donation?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleFinishFund}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
