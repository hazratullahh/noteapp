import React from 'react';
import moment from 'moment';

const TimeAgo = ({ specificDate }) => {
    const currentTime = moment();
    const customDate = moment(specificDate);

    const diffInHours = currentTime.diff(customDate, 'hours');
    const diffInDays = currentTime.diff(customDate, 'days');
    const diffInMonths = currentTime.diff(customDate, 'months');

    let displayText;

    if (diffInDays === 0) {
        displayText = 'Today';
        const minutes = currentTime.diff(customDate, 'minutes');
        if (minutes < 60) {
            displayText = `${minutes} min ago`;
        } else {
            displayText = `${Math.floor(diffInHours)} hr ago`;
        }
    } else if (diffInDays === 1) {
        displayText = 'Yesterday';
    } else if (diffInDays < 30) {
        displayText = `${diffInDays} days ago`;
    } else if (diffInMonths === 1) {
        displayText = 'Last month';
    } else {
        displayText = customDate.format('MMMM YYYY');
    }

    return (
        <div className='inline'>
            {displayText}
            {diffInDays === 0 &&
                <sup className="inline-flex animate-pulse items-center rounded-md px-1.5 py-0.5 text-xs font-semibold text-teal-700 bg-teal-600/10 ltr:ml-1.5 rtl:mr-1.5 lowercase">
                    Today
                </sup>
            }
            <small className='block text-gray-500 text-xs'>
                {customDate.format('D MMMM YYYY')}
            </small>
        </div>
    );
};

export default TimeAgo;
