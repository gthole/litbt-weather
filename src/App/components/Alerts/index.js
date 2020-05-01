import React, { useState } from 'react';
import './style.css';
import { AlertsSummary } from './components/AlertsSummary';
import { AlertsModal } from './components/AlertsModal';

export function Alerts({forecast}) {
    const [showModal, setShowModal] = useState(false);

    if (!forecast || forecast.alerts.length === 0) return '';

    return (
        <div className="Alerts">
            <AlertsSummary
                alerts={ forecast.alerts }
                setShowModal={ setShowModal }
            />
            <AlertsModal
                alerts={ forecast.alerts }
                show={ showModal }
                setShow={ setShowModal }
            />
        </div>
    );
}
