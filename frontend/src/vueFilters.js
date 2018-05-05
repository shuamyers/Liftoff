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
Vue.filter('monthYear', (date) =>{
        var str;
        var endDate = moment(date,'x').format('MMM YYYY');

        return endDate;
});
Vue.filter('shortDay', (date) =>{
        var str;
        var endDate = moment(date,'x').format('DD MMM YYYY');

        return endDate;
});
Vue.filter('timePassed', (date) =>{
        var str;
        var timePassed = moment(date,'x').fromNow()
        return timePassed;
});