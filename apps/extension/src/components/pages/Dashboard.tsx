import "./tile.css";

function Dashboard() {
  const handleMessage = async () => {
    const res: any = await fetch("http://localhost:3000/message", {
      method: "POST",
    });
    const data = await res.json();
    console.log("Response from server:", data);
  };

  const handleConnect = async () => {
    const res: any = await fetch("http://localhost:3000/connect", {
      method: "POST",
    });
    const data = await res.json();
    console.log("Response from server:", data);
  };

  return (
    <main>
      <div className="tiles-container">
        <button onClick={handleMessage} className="tile text">
          Messaging
        </button>
        <button onClick={handleConnect} className="tile text">
          Connections
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
