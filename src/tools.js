export const getByPath = (obj = {}, path = "") => {
    const pathArr = path.split("/").filter(it => it);
    let ret = obj;
    for (let index = 0; index < pathArr.length; index++) {
        const p = pathArr[index];
        ret = ret[p];
        if (ret === undefined) {
            return;
        }
    }
    return ret;
};
