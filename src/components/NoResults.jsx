import React from 'react';
import { Alert } from "@mui/material";

const NoResults = (props) => {
    return (
        <div>
            <Alert severity="info" className="no-results-badge">{props.resultsMessage}</Alert>
        </div>
    );
}

export default NoResults;