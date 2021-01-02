import React from 'react'
import moment from 'moment'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

export default function TimeLine({ itemRevision }) {
    return (
        <VerticalTimeline>
            {itemRevision.map((c, index) =>
                <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }  }
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={moment(c.revisionDate).format('DD/MM/YYYY HH:mm')}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<OfflineBoltIcon />}
                >
                    {/*<h3 className="vertical-timeline-element-title">Creative Director</h3>*/}
                    {/*<h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>*/}
                    <p>{c.note}</p>
                </VerticalTimelineElement>
            )}
            {/*last element for complementary content*/}
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            //icon={<StarIcon />}
            />
        </VerticalTimeline>)
}