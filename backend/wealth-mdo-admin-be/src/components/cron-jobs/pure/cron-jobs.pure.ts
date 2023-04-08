export function getInterval(configValue: number) {
    if (configValue === 0) return '0 0 * * *'; // every midnight
    return `0 */${configValue} * * * *`; // every X minutes
}
