export const deleteExtraFields = (object: any, keysToKeep: string[]) => {
    Object.keys(object).forEach(key => {
        let toKeep = false;
        for (let k of keysToKeep) {
            if (key === k) {
                toKeep = true;
                break;
            }
        }
        if (!toKeep) delete object[key];
    });
};