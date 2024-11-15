// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
 
contract ShipmentTracking {
    struct Shipment {
        string id;
        string origin;
        string destination;
        string status;
        address owner;
    }
 
    mapping(string => Shipment) public shipments;
    event ShipmentCreated(string id, string origin, string destination, address owner);
    event StatusUpdated(string id, string status);
 
    // Create a new shipment
    function createShipment(string memory id, string memory origin, string memory destination) public {
        require(bytes(shipments[id].id).length == 0, "Shipment ID already exists");
 
        shipments[id] = Shipment({
            id: id,
            origin: origin,
            destination: destination,
            status: "In Transit",
            owner: msg.sender
        });
 
        emit ShipmentCreated(id, origin, destination, msg.sender);
    }
 
    // Update shipment status
    function updateStatus(string memory id, string memory status) public {
        Shipment storage shipment = shipments[id];
        require(shipment.owner == msg.sender, "Not authorized");
        shipment.status = status;
 
        emit StatusUpdated(id, status);
    }
 
    // Get shipment details
    function getShipment(string memory id) public view returns (string memory, string memory, string memory, string memory, address) {
        Shipment storage shipment = shipments[id];
        return (shipment.id, shipment.origin, shipment.destination, shipment.status, shipment.owner);
    }
}
 
 