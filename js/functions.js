const sumMinutes = (string) => (Number(string.split(':')[0]) * 60) + Number(string.split(':')[1]);

const checkTime = (startDay, endDay, beginMeeting, meetingDuration) => (sumMinutes(endDay) - sumMinutes(beginMeeting)) >= meetingDuration && sumMinutes(startDay) <= sumMinutes(beginMeeting);

checkTime('08:00', '17:30', '14:00', 90);// true
checkTime('8:0', '10:0', '8:0', 120);// true
checkTime('08:00', '14:30', '14:00', 90);// false
checkTime('14:00', '17:30', '08:0', 90);// false
checkTime('8:00', '17:30', '08:00', 900);// false
