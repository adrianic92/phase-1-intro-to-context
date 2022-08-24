// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date,
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date,
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employee, dateTime) {
    let enter = employee.timeInEvents.find(event => (event.date === dateTime));
    let exit = employee.timeOutEvents.find(event => event.date === dateTime);

    return ((exit.hour - enter.hour) / 100);
}

function wagesEarnedOnDate(employee, dateTime) {
    const wage = hoursWorkedOnDate(employee, dateTime) * employee.payPerHour;
    return parseFloat(wage.toString());
}

function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(event => event.date);
    let pay = allDates.reduce(((a,b) => a + wagesEarnedOnDate(employee, b)), 0);
    return pay;
}

function calculatePayroll(array){
    return array.reduce(((a,b) => a + allWagesFor(b)), 0)
}