// src/components/DjangoPipelineDiagram/ExternalComponents.jsx
import React from 'react';
import { colors, Tooltip } from '../DiagramComponents';

const ExternalComponents = ({ getSectionStyle, handleSectionHover, clearActiveSection }) => {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '20px',
                left: '230px',
                display: 'flex',
                gap: '20px',
                ...getSectionStyle('external')
            }}
            onMouseEnter={() => handleSectionHover('external')}
            onMouseLeave={clearActiveSection}
        >
            {/* Models Directory */}
            <div style={{
                border: `2px solid ${colors.gray01}`,
                borderRadius: '6px',
                width: '220px',
                padding: '8px',
                backgroundColor: 'rgba(86, 85, 87, 0.1)'
            }}>
                <Tooltip content="Directory containing trained ML models and associated files">
                    <div style={{
                        color: colors.gray01,
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>models/ (ML Models)</span>
                        <span style={{ fontSize: '10px' }}>XGBoost v2.5</span>
                    </div>
                </Tooltip>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <Tooltip content="Trained XGBoost model with 94.2% accuracy on test set">
                        <div style={{
                            backgroundColor: colors.gray01,
                            color: colors.white,
                            padding: '6px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>xgb_model_v2.5.pkl</span>
                            <span style={{ fontSize: '9px' }}>15MB</span>
                        </div>
                    </Tooltip>

                    {/* Other model files would be similar components */}
                    {/* ... */}
                </div>
            </div>

            {/* Database */}
            <div style={{
                border: `2px solid ${colors.gray02}`,
                borderRadius: '50%',
                width: '140px',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.gray02,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
            }}>
                <Tooltip content="PostgreSQL database storing all application data including movements, cargo, units, and prediction results">
                    <div style={{
                        width: '70%',
                        height: '5px',
                        backgroundColor: colors.white,
                        marginBottom: '8px',
                        borderRadius: '2px'
                    }}></div>
                    <div style={{
                        width: '70%',
                        height: '5px',
                        backgroundColor: colors.white,
                        marginBottom: '8px',
                        borderRadius: '2px'
                    }}></div>
                    <div style={{
                        width: '70%',
                        height: '5px',
                        backgroundColor: colors.white,
                        marginBottom: '8px',
                        borderRadius: '2px'
                    }}></div>
                    <div style={{
                        color: colors.armyBlack,
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        PostgreSQL<br />Database
                    </div>
                    <div style={{ fontSize: '9px', color: colors.armyBlack, marginTop: '5px' }}>
                        AWS RDS • 14 Tables
                    </div>
                </Tooltip>
            </div>

            {/* Additional external components would be similar */}
            {/* ... */}
        </div>
    );
};

export default ExternalComponents;