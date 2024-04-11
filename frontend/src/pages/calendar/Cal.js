
// Filename - pages/Cal.js
import React from 'react';
import './CalStyle.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtecXVWRmhcV0x1WUM=');


const Cal = () => {
    return (
        <div>
            <ScheduleComponent>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
            </ScheduleComponent>
        </div>
    )
}

export default Cal;
