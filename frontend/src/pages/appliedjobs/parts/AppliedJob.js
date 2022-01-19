import React from "react";
import noImage from "../images/noimage.png";
import styles from "./modules/card.module.css";
import Button from "../../../generalcomponent/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AppliedJob = ({
  name,
  description,
  reward,
  status,
  imageUrl,
  _id,
  setFetchAppliedJobs,
  userId,
}) => {
  const refreshData = () => {
    axios.get(`http://127.0.0.1:5000/appliedjobs/${userId}`).then((res) => {
      setFetchAppliedJobs(res.data);
    });
  };

  const handleUnapply = (element) => {
    axios.put(`http://127.0.0.1:5000/appliedjob/cancel/${element}`).then(() => {
      refreshData();
    });
  };

  let history = useHistory();

  const goToChat = () => {
    history.push("/chat/:id");
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="appliedImage" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.ctrlBadge}>
          {status === "Open" && (
            <h5>
              <span class="badge rounded-pill bg-warning text-dark ">
                {status}
              </span>
            </h5>
          )}
          {status === "Accepted" && (
            <h5>
              <span class="badge rounded-pill bg-success text-dark ">
                {status}
              </span>
            </h5>
          )}
          {status === "Pending" && (
            <h5>
              <span class="badge rounded-pill bg-primary text-dark ">
                {status}
              </span>
            </h5>
          )}
          <p className={styles.cardName}>{name}</p>
        </div>

        <p className={styles.cardDescription}>{description}</p>
        <h3 className={styles.cardReward}>GC {reward}</h3>
      </div>
      <div className={styles.cancelApplicationDiv}>
        {/*  */}
        {/*  */}
        <button onClick={goToChat}>Chat</button>
        {/*  */}
        {/*  */}
        <button
          type="button"
          id={styles.cancelApplication}
          class="btn btn-danger btn-rounded"
          onClick={() => handleUnapply(_id)}
        >
          Cancel Application
        </button>
      </div>
    </div>
  );
};

export default AppliedJob;
