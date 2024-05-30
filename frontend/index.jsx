import { createRoot } from 'react-dom';
import React, { useEffect, useId } from 'react';

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
        <div className="partner-display box-shadow">
            <div className="top-bar">
                {partnerData.active ? (
                    <span className="active">Active</span>
                ) : (
                    <span className="inactive">Inactive</span>
                )}
                <button className="btn-red" onClick={onDelete}>
                    Delete
                </button>
            </div>
            {img}
            <h2>{partnerData.name}</h2>
            <p>{partnerData.description}</p>
        </div>
    );
}

function EditPartnerData({ title, initialPartnerData, onDone }) {
    const [name, setName] = React.useState(initialPartnerData ? initialPartnerData.name : '');
    const [logo, setLogo] = React.useState(initialPartnerData ? initialPartnerData.logo : '');
    const [description, setDescription] = React.useState(
        initialPartnerData ? initialPartnerData.description : '',
    );
    const [active, setActive] = React.useState(
        initialPartnerData ? initialPartnerData.active : false,
    );

    const nameId = useId();
    const logoId = useId();
    const descriptionId = useId();
    const activeId = useId();

    const formSubmit = () => {
        onDone(
            new PartnerData({
                name: name,
                logo: logo,
                description: description,
                active: active,
            }),
        );
    };

    const formCancel = () => {
        onDone(null);
    };

    return (
        <div>
            <form
                className="partner-details-form box-shadow"
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    formSubmit();
                }}
            >
                <h2>{title}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor={nameId}>Name:</label>
                            </td>
                            <td>
                                <input
                                    id={nameId}
                                    type="text"
                                    defaultValue={name}
                                    maxLength={255}
                                    required
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor={logoId}>Logo:</label>
                            </td>
                            <td>
                                <input
                                    id={logoId}
                                    type="text"
                                    defaultValue={logo}
                                    maxLength={500}
                                    onChange={(event) => {
                                        setLogo(event.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor={descriptionId}>Description:</label>
                            </td>
                            <td>
                                <textarea
                                    id={descriptionId}
                                    defaultValue={description}
                                    maxLength={5000}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor={activeId}>Active:</label>
                            </td>
                            <td>
                                <input
                                    id={activeId}
                                    type="checkbox"
                                    defaultChecked={active}
                                    onChange={(event) => {
                                        setActive(event.target.checked);
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button className="btn-gray" type="submit">
                        Submit
                    </button>
                    <button className="btn-gray" type="button" onClick={formCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

function App() {
    const [partners, setPartners] = React.useState([]);
    const [creating, setCreating] = React.useState(false);

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

    const addPartner = async (partnerData) => {
        setCreating(false);
        if (!partnerData) {
            return;
        }

        const response = await fetch('/api/partners/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partnerData),
        });
        if (response.ok) {
            const json = await response.json();
            const id = json.id;
            partnerData.id = id;
            setPartners([...partners, partnerData]);
        } else {
            alert('Something went wrong when adding partner');
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
            {creating ? (
                <EditPartnerData
                    title={'Add a New Partner'}
                    initialPartnerData={null}
                    onDone={addPartner}
                />
            ) : (
                <>
                    <div id="add-partner-container">
                        <button
                            className="btn-gray"
                            onClick={() => {
                                setCreating(true);
                            }}
                        >
                            Add partner
                        </button>
                    </div>
                    <div id="partner-display-container">{partnerDisplays}</div>
                </>
            )}
        </>
    );
}

const rootDOM = document.createElement('div');
rootDOM.id = 'root';
document.body.appendChild(rootDOM);

const root = createRoot(rootDOM);
root.render(<App />);
