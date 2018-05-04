import Vue from 'vue'
import moment from 'moment'



Vue.filter('daysRemaining', function(date) {
        var str;
        var endDate = moment(date,'x');
        var now = moment()
        var diff = endDate.diff(now, 'days')
        // console.log(diff)
        if(diff === 0) str = (diff + 1)
        if(diff === 1) str = (diff)
        else if (diff > 1)  str = diff
        else str = 'closed'
        return str;
});