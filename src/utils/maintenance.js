let isMaintenanceMode = true;

export const toggleMaintenanceMode = (status) => {
    isMaintenanceMode = status;
};

export const getMaintenanceMode = () => {
    return isMaintenanceMode;
};
