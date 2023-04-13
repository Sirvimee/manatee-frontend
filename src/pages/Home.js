import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [applications, setApplications] = React.useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const result = await axios.get("http://localhost:8080/applications");
    setApplications(result.data);
  };

  const formatDate = dateTime => {
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow table-hover">
          <thead className="table-primary text-white">
            <tr>
              <th scope="col">Nr</th>
              <th scope="col">Application State</th>
              <th scope="col">Updated On</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Interview Time</th>
              <th scope="col">Interviewer Name</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{application.applicationState}</td>
                <td>{formatDate(application.updatedOn)}</td>
                <td>{application.candidate.firstName} {application.candidate.lastName}</td>
                <td>{application.interview ? formatDate(application.interview.interviewTime) : ""}</td>
                <td>{application.interview ? application.interview.interviewer : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
