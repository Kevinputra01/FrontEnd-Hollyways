import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CardDonate from "../components/CardDonate";

import { Rupiah } from "../convert/rupiahFormat";

import { API } from "../config/api";
import { UserContext } from "../context/UserContext";

export default function RaiseFund() {
  const title = "Your Raise Fund";
  document.title = title + " | Hollyways";
  const [state] = useContext(UserContext);

  const [funds, setFunds] = useState([]);
  const getFunds = async () => {
    try {
      const response = await API.get("/funds");
      setFunds(response.data.data.funds);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFunds();
  }, []);

  const history = useHistory();
  const handleToDetailDonate = (id) => {
    history.push(`/view-fund/${id}`);
  };
  return (
    <>
      <div className="container-fluid vh-100 py-5 px-5 bg-light">
        <div className="d-flex justify-content-between">
          <h2 className="mb-2 ms-5 fw-bold">My Raise Fund</h2>
          <Link to="/make-fund" className="btn btn-danger pt-2 fw-bold me-1">
            Make Raise Fund
          </Link>
        </div>
        <div className="d-flex justify-content-start flex-wrap">
          {funds.map((fund, i) => {
            if (state.user.id === fund.idUser) {
              const total = Rupiah(fund.donationObtained);
              const progress = (Number(fund.donationObtained) / Number(fund.goal)) * 100;
              const props = {
                i,
                donationPicture: fund.thumbnail,
                donationName: fund.title,
                donationDescription: fund.description,
                progress,
                total,
                handleClickButton: handleToDetailDonate,
                donationId: fund.id,
                buttonName: "View Fund",
              };
              return <CardDonate {...props} />;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}
