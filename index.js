const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
    // Add the ABI from the compiled Solidity contract here
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

// Route to create a shipment
app.post('/api/shipments', async (req, res) => {
    const { id, origin, destination } = req.body;
    try {
        const tx = await contract.createShipment(id, origin, destination);
        await tx.wait();
        res.status(201).json({ message: 'Shipment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update shipment status
app.post('/api/shipments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const tx = await contract.updateStatus(id, status);
        await tx.wait();
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get shipment details
app.get('/api/shipments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const shipment = await contract.getShipment(id);
        res.status(200).json({
            id: shipment[0],
            origin: shipment[1],
            destination: shipment[2],
            status: shipment[3],
            owner: shipment[4]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
