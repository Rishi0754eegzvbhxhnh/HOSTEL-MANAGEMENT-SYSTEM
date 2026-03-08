import { useState, useMemo } from 'react';
import './RoomBooking.css';

// Floor 5 to 1 (top to bottom)
const floors = [5, 4, 3, 2, 1];
const roomsPerFloor = Array.from({ length: 15 }, (_, i) => i + 1);

const bedOptions = [
    { count: 1, label: 'Single', icon: '🛏️' },
    { count: 2, label: 'Double', icon: '🛏️🛏️' },
    { count: 3, label: 'Triple', icon: '🛏️×3' },
    { count: 4, label: 'Quad', icon: '🛏️×4' },
    { count: 5, label: 'Five-Bed', icon: '🛏️×5' }
];

const RoomBooking = () => {
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBeds, setSelectedBeds] = useState<number | null>(null);

    const bookedRooms = useMemo(() => {
        const booked = new Set<string>();
        for (let i = 0; i < 20; i++) {
            const f = floors[Math.floor(Math.random() * floors.length)];
            const r = roomsPerFloor[Math.floor(Math.random() * roomsPerFloor.length)];
            booked.add(`${f}${r.toString().padStart(2, '0')}`);
        }
        return booked;
    }, []);

    const handleRoomClick = (room: string) => {
        if (bookedRooms.has(room)) { alert(`Room ${room} is already booked!`); return; }
        setSelectedRoom(room);
        setSelectedBeds(null);
        setIsModalOpen(true);
    };

    const closeModal = () => { setIsModalOpen(false); setSelectedRoom(null); setSelectedBeds(null); };

    return (
        <div className="room-booking-container">
            <h2>Hostel Room Availability Table</h2>
            <div className="legend">
                <div className="legend-item"><div className="room-box premium"></div><span>Premium AC (Floors 4 &amp; 5)</span></div>
                <div className="legend-item"><div className="room-box standard"></div><span>Standard Non-AC (Floors 1-3)</span></div>
                <div className="legend-item"><div className="room-box booked-legend"></div><span>Booked / Unavailable</span></div>
            </div>

            <div className="table-wrapper">
                <table className="room-table">
                    <thead><tr><th className="floor-column-header">Floor</th><th colSpan={roomsPerFloor.length}>Rooms</th></tr></thead>
                    <tbody>
                        {floors.map((floor) => (
                            <tr key={floor}>
                                <td className="floor-label">Floor {floor}</td>
                                {roomsPerFloor.map((col) => {
                                    const roomId = `${floor}${col.toString().padStart(2, '0')}`;
                                    const isBooked = bookedRooms.has(roomId);
                                    const isPremium = floor >= 4;
                                    return (
                                        <td key={roomId} className="room-cell">
                                            <div
                                                className={`room-block ${isPremium ? 'premium' : 'standard'} ${isBooked ? 'booked' : ''}`}
                                                onClick={() => handleRoomClick(roomId)}
                                                title={isBooked ? 'Booked' : `Room ${roomId}`}
                                            >{roomId}</div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedRoom && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <h3>Room {selectedRoom} — 360° View</h3>
                        <p>Experience an immersive view of the room and attached bathroom.</p>

                        <div className="pano-viewport">
                            <div className="pano-image-container">
                                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Main Room" className="pano-image" />
                            </div>
                            <div className="pano-label">Main Room View</div>
                        </div>

                        <div className="pano-viewport">
                            <div className="pano-image-container">
                                <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Bathroom" className="pano-image" />
                            </div>
                            <div className="pano-label">Bathroom View</div>
                        </div>

                        {/* Bed Selection */}
                        <div className="bed-selection">
                            <h4>Select Number of Beds</h4>
                            <div className="bed-options">
                                {bedOptions.map(opt => (
                                    <button
                                        key={opt.count}
                                        className={`bed-option-btn ${selectedBeds === opt.count ? 'selected' : ''}`}
                                        onClick={() => setSelectedBeds(opt.count)}
                                    >
                                        <span className="bed-icon">{opt.icon}</span>
                                        <span className="bed-label">{opt.label}</span>
                                        <span className="bed-count">{opt.count} Bed{opt.count > 1 ? 's' : ''}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="book-btn" onClick={() => {
                                if (!selectedBeds) { alert('Please select a bed option first.'); return; }
                                alert(`Successfully booked Room ${selectedRoom} with ${selectedBeds} bed(s)!`);
                                closeModal();
                            }}>
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomBooking;
