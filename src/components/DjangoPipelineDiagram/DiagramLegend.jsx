// src/components/DjangoPipelineDiagram/DiagramLegend.jsx
import React from 'react';
import { colors } from '../DiagramComponents';

const DiagramLegend = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '480px',
            right: '30px',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '8px',
            borderRadius: '4px',
            border: `1px solid ${colors.gray02}`,
            zIndex: 5
        }}>
            {/* Django */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: colors.armyBlack, borderRadius: '2px' }}></div>
                <div style={{ fontSize: '10px', color: colors.armyBlack }}>Django Project</div>
            </div>

            {/* Loadout App */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: colors.armyGold, borderRadius: '2px' }}></div>
                <div style={{ fontSize: '10px', color: colors.armyBlack }}>Loadout App</div>
            </div>

            {/* More legend items */}
            {/* ... */}

            {/* Hover instructions */}
            <div style={{ fontSize: '9px', color: colors.armyBlack, marginTop: '5px', textAlign: 'center' }}>
                Hover over sections for details
            </div>
        </div>
    );
};

export default DiagramLegend;