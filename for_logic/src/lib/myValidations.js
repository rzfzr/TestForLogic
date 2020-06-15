export const masks = (masks) => (value) => {
    let response = false;
    masks.forEach(mask => {
        if (mask.length == value.length) {
            response = true;
        }
    });
    return response;
};