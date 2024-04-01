
// Filename - pages/Cal.js
import React from 'react';
import './CalStyle.css';

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';

const Cal = () => {
    return (
        <div>
            <ScheduleComponent>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    )
}

export default Cal;