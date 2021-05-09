export function getOperatingSystem(window) {
    let operatingSystem = 'Not known';
    if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'win'; }
    if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'mac'; }
    if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'linux'; }
  
    return operatingSystem;
}