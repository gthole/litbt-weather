import React from 'react';
import './style.css';
import { AlertSection } from '../AlertSection';

export function AlertsModal({show, alerts, setShow}) {
    return (
        <div
            className={ 'AlertsModal ' + (show ? 'shown' : 'hidden') }
            onClick={ () => setShow(false) }>
                <div className="content" onClick={ (ev) => ev.stopPropagation() }>
                    <div className="modal-close" onClick={ () => setShow(false) }>&times;</div>
                    <div className="modal-title">Weather Alerts</div>
                    { alerts.map((a, i) => <AlertSection key={ 'alert-' + i } wAlert={ a } /> ) }
                </div>
        </div>
    );
}
