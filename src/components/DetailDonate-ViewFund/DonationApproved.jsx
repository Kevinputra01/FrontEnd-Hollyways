import React, { useState, useEffect } from "react";

import ListDonateUser from "./ListDonate/ListDonateUser";

import { API } from "../../config/api";

export default function DonationApproved(props) {
  //get fund
  const [usersDonate, setUsersDonate] = useState([]);
  const getUsersDonate = async () => {
    try {
      const response = await API.get(`/usersDonate/${props.params.id}`);
      setUsersDonate(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersDonate();
  }, []);

  return (
    <>
      <div className="py-3">
        {props.isApproved ? (
          <>
            <h2 className="mb-2 fw-bold">List Donation ({usersDonate.length})</h2>
            {usersDonate.map((donate, i) => {
              const fundId = props.params.id;
              if (donate.status == "success") {
                const createdAt = new Date(donate.createdAt)
                const dateCreate = createdAt.toDateString()
                const detail = dateCreate.split(' ')
                const day= detail[0]
                const month =detail[1]
                const date = detail[2]
                const year = detail[3]
                const ListProps = {
                  i,
                  userName: donate.fullname,
                  amount: donate.donateAmount,
                  usersDonateId: donate.id,
                  fundId,
                  proofAttachment: donate.proofAttachment,
                  day, month, year, date
                };
                return (
                  <>
                    <ListDonateUser {...ListProps} isApproved={props.isApproved} />
                  </>
                );
              }
            })}
          </>
        ) : (
          <>
            <h2 className="mb-2 fw-bold">Donation has not been approved ({usersDonate.length})</h2>
            {usersDonate.map((donate, i) => {
              const fundId = props.params.id;
              if (donate.status == "pending") {
                const createdAt = new Date(donate.createdAt)
                const dateCreate = createdAt.toDateString()
                const detail = dateCreate.split(' ')
                const day= detail[0]
                const month =detail[1]
                const date = detail[2]
                const year = detail[3]
                const ListProps = {
                  i,
                  userName: donate.fullname,
                  amount: donate.donateAmount,
                  usersDonateId: donate.id,
                  fundId,
                  proofAttachment: donate.proofAttachment,
                  day, month, year, date
                };
                return (
                  <>
                    <ListDonateUser {...ListProps} isApproved={props.isApproved} />
                  </>
                );
              }
            })}
          </>
        )}
      </div>
    </>
  );
}
