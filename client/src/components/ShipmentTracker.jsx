import  { useEffect, useState } from 'react';

const ShipmentTracker = () => {
    const [shipments, setShipments] = useState({});

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const updatedShipment = JSON.parse(event.data);
            setShipments((prev) => ({
                ...prev,
                [updatedShipment.id]: updatedShipment.status
            }));
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => socket.close();
    }, []);

    return (
        <div className='text-center p-5'>
            <h2 className='my-5 font-bold text-2xl'>Real-Time Shipment Tracking</h2>
            <table className='border-[1px] mx-auto w-[50%]'>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(shipments).map(([id, status]) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentTracker;
