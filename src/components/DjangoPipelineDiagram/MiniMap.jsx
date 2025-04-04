// src/components/DjangoPipelineDiagram/MiniMap.jsx
import React from 'react';
import { colors } from '../DiagramComponents';

const MiniMap = ({ state }) => {
    return (
        <div className="mini-map absolute bottom-4 right-4 z-10 border border-gray-300 bg-white shadow-md rounded-md overflow-hidden">
            <div className="mini-map-title bg-gray-100 p-1 text-xs font-medium border-b">Overview</div>
            <div className="mini-map-content relative" style={{ width: '150px', height: '120px' }}>
                <div
                    className="mini-map-diagram bg-white p-1"
                    style={{
                        transform: 'scale(0.15)',
                        transformOrigin: 'top left',
                        width: '1000px',
                        height: '800px',
                        position: 'absolute'
                    }}
                >
                    {/* Simplified version of the diagram for mini-map */}
                    <div style={{
                        border: `3px solid ${colors.armyBlack}`,
                        borderRadius: '8px',
                        position: 'absolute',
                        left: '30px',
                        top: '80px',
                        width: '900px',
                        height: '750px',
                        backgroundColor: 'rgba(34, 31, 32, 0.03)'
                    }}>
                        <div style={{ backgroundColor: colors.armyBlack, height: '20px' }}></div>

                        {/* Simplified Loadout App */}
                        <div style={{
                            position: 'absolute',
                            top: '50px',
                            left: '20px',
                            width: '180px',
                            height: '370px',
                            backgroundColor: 'rgba(255, 204, 1, 0.5)',
                            border: `2px solid ${colors.armyGold}`
                        }}></div>

                        {/* Simplified Predictions App */}
                        <div style={{
                            position: 'absolute',
                            top: '50px',
                            left: '220px',
                            width: '650px',
                            height: '520px',
                            backgroundColor: 'rgba(241, 228, 199, 0.5)',
                            border: `2px solid ${colors.tan}`
                        }}></div>

                        {/* Simplified External Components */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '230px',
                            width: '440px',
                            height: '140px',
                            backgroundColor: 'rgba(86, 85, 87, 0.2)'
                        }}></div>
                    </div>
                </div>

                {/* Viewport indicator */}
                <div
                    className="mini-map-viewport absolute border-2 border-blue-500"
                    style={{
                        width: `${100 / state?.scale}%`,
                        height: `${100 / state?.scale}%`,
                        transform: `translate(${-state?.positionX * 0.15 / state?.scale}px, ${-state?.positionY * 0.15 / state?.scale}px)`,
                        maxWidth: '150px',
                        maxHeight: '120px'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default MiniMap;