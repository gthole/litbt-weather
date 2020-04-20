import React from 'react';
import './style.css';
import { extractIcon, formatTime } from '../../utility';

export function Timeline(props) {

    props.hours.forEach((h) => {
        const [resource] = extractIcon(h.icon);
        h.key = resource ? resource.section : 'Unknown';
    });

    const sections = props.hours.reduce((s, h, i) => {
        if (i === 0 || h.key !== props.hours[i - 1].key) {
            s.push({key: h.key, count: 1});
        } else {
            s.slice(-1)[0].count += 1;
        }
        return s;
    }, []);

    return (
        <div className="Timeline">
            <div className="timeline-container">
                <div className="timeline-row timeline-blocks">
                    { sections.map((s, i) => (
                        <div
                            key={'timeline-section-' + i}
                            style={{width: (32 * s.count) + 'px'}}
                            className={ `timeline-section timeline-section-${s.count} ${s.key.replace(' ', '-')}` }>
                            <span>{ s.key }</span>
                        </div>
                    ))}
                </div>
                <div className="timeline-row timeline-ticks">
                    { props.hours.map((h, i) => <div key={'ticks' + i}></div>) }
                </div>
                <div className="timeline-row timeline-hours">
                    { props.hours
                        .map((h, i) => {
                            if (i % 2 === 0) {
                                return <div key={'hours-' + i}>
                                    <div>
                                        { formatTime(h.startTime) }
                                    </div>
                                    <div className="timeline-temp">
                                        { h.temperature }°
                                    </div>
                                </div>
                            }
                            return <div key={'hours-' + i}></div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}
