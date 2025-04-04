// src/components/DjangoPipelineDiagram/VersionHistory.jsx
import React from 'react';
import { colors } from '../DiagramComponents';

const VersionHistory = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '150px',
            right: '45px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: `1px solid ${colors.gray02}`,
            borderRadius: '4px',
            padding: '8px',
            fontSize: '10px',
            color: colors.armyBlack,
            width: '160px'
        }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Pipeline Versions</div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: colors.success,
                fontWeight: 'bold'
            }}>
                <span>v2.5</span>
                <span>Current</span>
                <span>Apr 2025</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>v2.1</span>
                <span>+6 features</span>
                <span>Mar 2025</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>v2.0</span>
                <span>XGBoost</span>
                <span>Jan 2025</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>v1.0</span>
                <span>RandomForest</span>
                <span>Oct 2024</span>
            </div>
        </div>
    );
};

export default VersionHistory;