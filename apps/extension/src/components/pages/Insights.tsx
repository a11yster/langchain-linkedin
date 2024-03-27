import "./tile.css";

function Insights() {
  return (
    <main>
      <div className="tiles-container">
        <div className="tile">
          <span>Message Count</span>
          <span className="tile-data-item">40</span>
        </div>
        <div className="tile">
          <span>Connection Count</span>
          <span className="tile-data-item">40</span>
        </div>
        <div className="tile">
          <span>Execution Time</span>
          <div className="tile-data-list">
            <span className="tile-data-item">40</span>
            <span className="tile-data-item">sec</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Insights;
