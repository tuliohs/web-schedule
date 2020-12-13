import React from "react";
import { useLocation } from 'react-router-dom'


import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// components

const defaultDescr = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp"
export const currentItem = { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' }

const CardContent = ({ title, description, revision }) => {
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
            <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-retweet"></i>
                </div>
                <h6 className="text-xl font-semibold">{title}</h6>
                <p className="mt-2 mb-4 text-gray-600">{description}</p>
                <div className="divhoverbutton" style={{ width: "20%" }}>
                    <a className="ahoverbutton" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                </div>
            </div>
        </div>)
}

const itemRevision = [
    {
        idSchedule: 1,
        revisions: [
            { date: 'junho 2020', },
            { date: 'junho 2020', },
            { date: 'junho 2020', },
            { date: 'junho 2020', },
            { date: 'junho 2020', },
            { date: 'junho 2020', },
            { date: 'junho 2020', }],
    },
    {
        idSchedule: 3,
        revisions: [
            { date: 'junho 201', },
            { date: 'junho 201', },
            { date: 'junho 2021', },]
    },
    {
        idSchedule: 4,
        revisions: [
            { date: 'junho 2022', },
            { date: 'junho 2022', },
            { date: 'junho 2022', },
            { date: 'junho 2022', }]
    }
]

export function TimeLine({ id }) {
    return (
        <VerticalTimeline>
            {itemRevision
                .filter(c => id ? c.idSchedule == id : c.idSchedule == 3)
                .map(a =>
                    a.revisions.map(c => (
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }  }
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={c.date}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        //icon={<WorkIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">Creative Director</h3>
                            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                            <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                        </VerticalTimelineElement>
                    )))}
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            //icon={<StarIcon />}
            />
        </VerticalTimeline>)
}


export function EmptyRevision() {
    return (
        <div className="px-4 py-5 flex-auto ">
            <h6 className="text-xl font-semibold">The history of your revisions will appear here</h6>
        </div>
    )
}

export default function Revision() {
    let location = useLocation();
    const defaultItem = {

    }

    return (
        <>
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <CardContent title={location.state?.title} description={location.state?.description} />
                {
                    location.state?.id ?
                        <EmptyRevision /> :
                        <TimeLine id={location.state?.id} />
                }

            </div>
        </>
    );
}
