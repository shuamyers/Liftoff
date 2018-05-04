import Vue from 'vue'
import moment from 'moment'



Vue.filter('daysRemaining', function(date) {
        var str;
        var endDate = moment('1525561200','X');
        var now = moment()
        var diff = endDate.diff(now, 'days')
        console.log(diff)
        if(diff === 0) str = (diff + 1) + ' day left'
        if(diff === 1) str = (diff) + ' day left'
        else if (diff > 1)  str = diff + ' days left'
        else str = 'closed'
        return str;
});