import React from "react";

function History({ historyList }) {
  return (
    <div className="history-container">
      <div className="history-content">
        <h2>History</h2>
        <ul className="history-list">
          {historyList.map((history, index) => (
            <li key={index}>{history}</li>
          ))}
          {/* <li>Player moves to 1st position</li>
          <li>Computer moves to 2nd position</li> */}
        </ul>
      </div>
    </div>
  );
}

export default History;
