export function timeSince(date: Date | null | string | number): string {
    if (date === null) return "never";

    let parsedDate: Date;

    if (typeof date === 'string') {
        parsedDate = new Date(date);
    } else if (typeof date === 'number') {
        parsedDate = new Date(date);
    } else {
        parsedDate = date;
    }

    const localDate = new Date(parsedDate.getTime() - (new Date().getTimezoneOffset() * 60000));

    let now = new Date();
    let dif = now.getTime() - localDate.getTime();
    const seconds = Math.floor(dif / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 7) {
        const day = String(localDate.getDate()).padStart(2, '0');
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const year = localDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    if (minutes > 2) {
        const dayStr = days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : '';
        const hoursStr = hours % 24 > 0 ? `${hours % 24} hour${(hours % 24) > 1 ? 's' : ''} ` : '';
        const minutesStr = minutes % 60 > 0 ? `${minutes % 60} min${(minutes % 60) > 1 ? 's' : ''}` : '';
        return `${dayStr}${hoursStr}${minutesStr} ago`;
    }

    return "just now";
}

  