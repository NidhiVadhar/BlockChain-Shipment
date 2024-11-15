import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [shipmentId, setShipmentId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('');
    const [shipmentDetails, setShipmentDetails] = useState(null);

    const createShipment = async () => {
        await axios.post('http://localhost:5000/api/shipments', {
            id: shipmentId,
            origin,
            destination
        });
        alert("Shipment created successfully!");
    };

    const updateStatus = async () => {
        await axios.post(`http://localhost:5000/api/shipments/${shipmentId}/status`, {
            status
        });
        alert("Shipment status updated successfully!");
    };

    const fetchShipment = async () => {
        const response = await axios.get(`http://localhost:5000/api/shipments/${shipmentId}`);
        setShipmentDetails(response.data);
    };

    return (
        <div>
            <h1>Shipment Tracking</h1>
            <div>
                <h3>Create Shipment</h3>
                <input type="text" placeholder="Shipment ID" onChange={(e) => setShipmentId(e.target.value)} />
                <input type="text" placeholder="Origin" onChange={(e) => setOrigin(e.target.value)} />
                <input type="text" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
                <button onClick={createShipment}>Create Shipment</button>
            </div>
            
            <div>
                <h3>Update Status</h3>
                <input type="text" placeholder="Shipment ID" onChange={(e) => setShipmentId(e.target.value)} />
                <input type="text" placeholder="Status" onChange={(e) => setStatus(e.target.value)} />
                <button onClick={updateStatus}>Update Status</button>
            </div>

            <div>
                <h3>Fetch Shipment</h3>
                <input type="text" placeholder="Shipment ID" onChange={(e) => setShipmentId(e.target.value)} />
                <button onClick={fetchShipment}>Fetch Shipment</button>
                {shipmentDetails && (
                    <div>
                        <p><b>ID:</b> {shipmentDetails.id}</p>
                        <p><b>Origin:</b> {shipmentDetails.origin}</p>
                        <p><b>Destination:</b> {shipmentDetails.destination}</p>
                        <p><b>Status:</b> {shipmentDetails.status}</p>
                        <p><b>Owner:</b> {shipmentDetails.owner}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
