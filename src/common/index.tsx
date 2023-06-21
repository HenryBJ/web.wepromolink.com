export function timeSince(date: Date | null | string): string {
    // if (date === null) return "never";
  
    // const parsedDate = typeof date === 'string' ? new Date(date) : date;
    // const localDate = new Date(parsedDate.getTime() + (parsedDate.getTimezoneOffset() * 60000));
  
    // let now = new Date();
    // let dif = now.getTime() - localDate.getTime();
    // const seconds = Math.floor(dif / 1000);
    // let interval = Math.floor(seconds / 31536000);
  
    // if (interval >= 1) {
    //   return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    // }
    // interval = Math.floor(seconds / 2592000);
    // if (interval >= 1) {
    //   return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    // }
    // interval = Math.floor(seconds / 86400);
    // if (interval >= 1) {
    //   return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    // }
    // interval = Math.floor(seconds / 3600);
    // if (interval >= 1) {
    //   return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    // }
    // interval = Math.floor(seconds / 60);
    // if (interval >= 1) {
    //   return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    // }
    return "just now";
  }
  