let isMaintenanceMode = false;  // Work as a Switch

export const toggleMaintenanceMode = (status) => {
    isMaintenanceMode = status;
};

export const getMaintenanceMode = () => {
    return isMaintenanceMode;
};
