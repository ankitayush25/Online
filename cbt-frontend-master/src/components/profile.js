import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import axios from "axios";
import dayjs from "dayjs";
import { base_api_url } from "../config";

// const base_api_url = "https://aryaa-cbt-backend.onrender.com";
const Profile = () => {
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${base_api_url}/api/getTestHistory/${
          JSON.parse(localStorage.getItem("login")).user_id
        }`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("login")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);

        console.log(response.data);
        setTestHistory(response.data.rows);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <div className="container text-center fs-3 m-auto my-4 w-100">
        Test History
      </div>
      <table class="table m-auto w-75 text-center  table-bordered ">
        <thead>
          <tr>
            <th scope="col">Paper</th>
            <th scope="col">Year</th>
            <th scope="col">Score</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {!testHistory
            ? null
            : testHistory.map((test, idx) => (
                <tr key={idx}>
                  <td>{test.paper_name}</td>
                  <td>{test.year}</td>
                  <td>{test.score}</td>
                  <td>
                    {dayjs(test.attempt_no).format("DD-MM-YYYY HH:mm:ss A")}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Profile;
