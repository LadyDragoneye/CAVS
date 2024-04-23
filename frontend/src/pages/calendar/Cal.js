
// Filename - pages/Cal.js
import { registerLicense } from '@syncfusion/ej2-base';
import React from 'react';
import ReactDOM from 'react-dom';
import './CalStyle.css';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtecXVWRmhcV0x1WUM=');

const Cal = () => {

    var dManager = [{
        Id: 100,
        Subject: "Wild Discovery",
        StartTime: new Date(2015, 11, 2, 9, "00"),
        EndTime: new Date(2015, 11, 2, 10, 30),
        Location: "CHINA"
    }];
    
    var Scheduler = React.createClass({
        render: function () {
            return (
                <EJ.Schedule id="Schedule1" currentDate={new Date(2017, 5, 5)} appointmentSetings-dataSource={dManager}>
                </EJ.Schedule>
           );
        }
    });
    
    var Button = React.createClass({
        onScheduleImport: function(args) {
            var dataManger = ej.DataManager({ url: '@Url.Action("ScheduleImportData", "Schedule")', crossDomain: true });
            $("#Schedule1").ejSchedule({
                appointmentSettings: {
                    dataSource: dataManger
                }
            });
        },
        render: function () {
            return (
                <EJ.Button id="btnExport" width="70px" height="30px" click={this.onScheduleImport}>
                </EJ.Button>
           );
        }
    });
    
    ReactDOM.render(<Button />, document.getElementById('exportButton'));
    ReactDOM.render(<Scheduler />, document.getElementById('schedule-default'));
}

export default Cal;
