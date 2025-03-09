import React from 'react';

const defaultSites = [
    {
        name: "MadElevator",
        url: "https://madelevator.com/"
    },
    {
        name: "Yahoo Finance",
        url: "https://ca.finance.yahoo.com/"
    },
    {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Main_Page"
    },
    {
        name: "BBC News",
        url: "https://www.bbc.com/"
    }
];

function QuickLinks({ onSelect }) {
    return (
        <div className="content-section">
            <div className="section-header">
                <h3>Quick Links</h3>
            </div>
            <div className="quick-links-grid">
                {defaultSites.map((site, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(site.url)}
                        className="quick-link-button"
                    >
                        {site.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuickLinks;
