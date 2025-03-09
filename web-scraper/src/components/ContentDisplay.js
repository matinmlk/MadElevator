import React from 'react';

function ContentDisplay({ content, onLinkClick }) {
    const [expanded, setExpanded] = React.useState(false);
    const initialDisplayCount = 20;
    const hasMoreContent = content.length > initialDisplayCount;
    const displayedContent = expanded ? content : content.slice(0, initialDisplayCount);
    return (
        <>
            <div className="section-header">
                <h3>Extracted Content</h3>
            </div>
            <div className="content-grid content-list">
                {displayedContent.map((link, index) => (
                    <a 
                        key={index}
                        href={link}
                        onClick={(e) => {
                            e.preventDefault();
                            onLinkClick(link);
                        }}
                        className="content-link"
                    >
                        {link.length > 257 ? `${link.substring(0, 257)}...` : link}
                    </a>
                ))}
                {hasMoreContent && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="show-more-button"
                    >
                        {expanded ? (
                            <>
                                Show Less
                                <span>↑</span>
                            </>
                        ) : (
                            <>
                                Show More ({content.length - initialDisplayCount} more)
                                <span>↓</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </>
    );
}

export default ContentDisplay;
