export function lastUpdated(updated) {
  const oldDate = new Date(updated);
  const todaysDate = new Date();

  const timeDifference = Math.abs(todaysDate - oldDate);
  const seconds = Math.round(timeDifference / 1000);

  if (seconds < 60) {
    return `Updated ${seconds} seconds ago`;
  } else {
    let minutes = Math.round(seconds / 60);

    if (minutes < 60) {
      return `Updated ${minutes} minutes ago`;
    } else {
      let hours = Math.round(minutes / 60);

      if (hours < 24) {
        return `Updated ${hours} hours ago`;
      } else {
        let days = Math.round(hours / 24);

        if (days < 30) {
          return `Updated ${days} days ago`;
        } else {
          if (days < 365) {
            let getOldDate = oldDate.getDate();
            return `Updated on ${new Date(updated).toLocaleString('default', {
                 month: 'short'
               })} ${getOldDate}`;
          } else {
            return `Updated on ${oldDate.toDateString()}`;
          }
        }
      }
    }
  }
};