// src/components/DjangoPipelineDiagram/DjangoProjectContainer.jsx
import React from 'react';
import { colors, Badge } from '../DiagramComponents';
import LoadoutApp from './LoadoutApp';
import PredictionsApp from './PredictionsApp';
import ExternalComponents from './ExternalComponents';
import MetricsDisplay from './MetricsDisplay';
import VersionHistory from './VersionHistory';
import DiagramLegend from './DiagramLegend';

const DjangoProjectContainer = ({ activeSection, handleSectionHover, clearActiveSection, getSectionStyle }) => {
    return (
        <div style={{
            border: `3px solid ${colors.armyBlack}`,
            borderRadius: '8px',
            position: 'absolute',
            left: '30px',
            top: '80px',
            width: '900px',
            height: '750px',
            backgroundColor: 'rgba(34, 31, 32, 0.03)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                backgroundColor: colors.armyBlack,
                color: colors.white,
                padding: '8px 15px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>loadoutBackEnd (Django Project)</span>
                <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Django 4.2 • Python 3.10 • PostgreSQL 13</span>
            </div>

            {/* Environment Section */}
            <div style={{
                position: 'absolute',
                top: '4px',
                right: '250px',
                display: 'flex',
                gap: '10px',
                backgroundColor: 'rgba(255,255,255,0.7)',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '9px'
            }}>
                <span>Environment: <Badge text="PRODUCTION" color={colors.white} backgroundColor={colors.success} /></span>
                <span>|</span>
                <span>Deployed: <span style={{ fontWeight: 'bold' }}>AWS EC2</span></span>
                <span>|</span>
                <span>CI/CD: <span style={{ fontWeight: 'bold' }}>GitHub Actions</span></span>
            </div>

            {/* Apps Section */}
            <div style={{
                position: 'absolute',
                top: '50px',
                left: '20px',
                display: 'flex',
                gap: '20px'
            }}>
                <LoadoutApp 
                    getSectionStyle={getSectionStyle}
                    handleSectionHover={handleSectionHover}
                    clearActiveSection={clearActiveSection}
                />
                
                <PredictionsApp 
                    getSectionStyle={getSectionStyle}
                    handleSectionHover={handleSectionHover}
                    clearActiveSection={clearActiveSection}
                />
            </div>

            <ExternalComponents 
                getSectionStyle={getSectionStyle}
                handleSectionHover={handleSectionHover}
                clearActiveSection={clearActiveSection}
            />

            <MetricsDisplay />
            <VersionHistory />
            <DiagramLegend />
        </div>
    );
};

export default DjangoProjectContainer;