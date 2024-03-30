export function timeSince(date: Date | null | string | number): string {
    if (date === null || date === undefined) return "never";

    const parsedDate = new Date(date);
    let now = new Date();
    
    const localDate = new Date(parsedDate.getTime() - (new Date(now.toUTCString()).getTimezoneOffset() * 60000));
    // const localDate = new Date(parsedDate.getTime() - new Date(now.toUTCString()).getTime());
    
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

    if(days > 0) return `${days} day${days==1?'':'s'} ago`;
    if(hours > 0) return `${hours} hour${hours==1?'':'s'} ago`;
    if(minutes > 0) return `${minutes} min${minutes==1?'':'s'} ago`;
    
    return "just now";
}

export function splitNumberValue(value: number): string {
    const [intPart, decPart] = value.toString().split('.');
    if (decPart) {
        return `$${intPart}.<span class="text-gray-500 text-sm">${decPart}</span>`;
    }
    return `$${intPart}.<span class="text-gray-500 text-sm">00</span>`;
};

  