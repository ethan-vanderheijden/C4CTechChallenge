import { createRoot } from 'react-dom';
import React, { useEffect } from 'react';

import './styles.css';

class PartnerData {
    constructor(data) {
        if (data instanceof String) {
            data = JSON.parse(data);
        }

        this.id = data.id;
        this.name = data.name;
        this.logo = data.logo;
        this.description = data.description;
        this.active = data.active;
    }
}

function PartnerDisplay({ partnerData, onDelete }) {
    let img = null;
    if (partnerData.logo) {
        img = <img src={partnerData.logo} alt={`${partnerData.name}'s logo`}></img>;
    }
    return (
        <div className="partner-display">
            <div className="top-bar">
                {partnerData.active ? (
                    <span className="active">Active</span>
                ) : (
                    <span className="inactive">Inactive</span>
                )}
                <button onClick={onDelete}>Delete</button>
            </div>
            {img}
            <h2>{partnerData.name}</h2>
            <p>{partnerData.description}</p>
        </div>
    );
}

function App() {
    const [partners, setPartners] = React.useState([]);

    useEffect(() => {
        fetch('/api/partners/all').then(async (result) => {
            const data = await result.json();
            const partners = data.map((partner) => new PartnerData(partner));
            setPartners(partners);
        });
    }, []);

    const deletePartner = async (partnerId) => {
        const response = await fetch(`/api/partners/${partnerId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setPartners(partners.filter((partner) => partner.id !== partnerId));
        } else {
            alert('Something went wrong when deleting partner');
        }
    };

    let partnerDisplays = partners.map((partner) => (
        <PartnerDisplay
            key={partner.id}
            partnerData={partner}
            onDelete={() => {
                deletePartner(partner.id);
            }}
        />
    ));

    return (
        <>
            <h1 id="main-header">C4C: Partner Organizations</h1>
            <div id="partner-display-container">{partnerDisplays}</div>
        </>
    );
}

const rootDOM = document.createElement('div');
rootDOM.id = 'root';
document.body.appendChild(rootDOM);

const root = createRoot(rootDOM);
root.render(<App />);
