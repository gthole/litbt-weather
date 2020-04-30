import React from 'react';
import './style.css';

export function AlertSection({wAlert}) {
    return (
        <div className="AlertSection">
             <div className="alert-header">
                <div className="alert-title">{ wAlert.properties.event }</div>
                <div className="alert-headline">{ wAlert.properties.headline }</div>
            </div>
            <div className="alert-body">
                { wAlert.properties.description.split('\n').map((line, i) => {
                    return <p key={ 'alert-line-' + i }>{ line }</p>;
                })}
            </div>
        </div>
    );
}
