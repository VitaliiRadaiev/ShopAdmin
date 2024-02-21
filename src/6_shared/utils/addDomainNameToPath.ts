export function addDomainNameToPath(path: string): string {
    return `http://${window.currentHost}` + path
}