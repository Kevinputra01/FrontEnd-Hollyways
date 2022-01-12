import React from "react";
import { useParams } from "react-router-dom";

import DonationInfo from "../components/DetailDonate-ViewFund/DonationInfo";
import DonationApproved from "../components/DetailDonate-ViewFund/DonationApproved";

export default function ViewFund() {
  const title = "View Fund";
  document.title = title + " | Hollyways";
  //params
  const params = useParams();

  return (
    <>
      <div className="container-fluid bg-light px-5">
        <div className="container">
          <DonationInfo params={params} isViewFund={true} />
          <DonationApproved params={params} isApproved={true} />
          <DonationApproved params={params} isApproved={false} />
        </div>
      </div>
    </>
  );
}
