function getTypeCss (type) {
    let icon = null;
    switch (type) {
        case 'Success':
            icon = 'success';
            break;
        case 'Info':
            icon = 'info';
            break;
        case 'Warning':
            icon = 'warning';
            break;
        case 'Error':
            icon = 'error';
            break;
        default:
            icon = 'info';
            break;
    }
    return icon;
}

export { getTypeCss };