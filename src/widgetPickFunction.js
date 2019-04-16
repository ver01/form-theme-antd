// input { schema, parentSchema }
// output { widgetName: string, widgetData: any }
export const pickReadonlyWidget = ({ schema }) => {
    let data = undefined;
    if (schema.enum instanceof Array && schema.enum.length === 1) {
        data = schema.enum;
    } else if (schema.hasOwnProperty("const")) {
        data = schema.const;
    }
    if (data !== undefined) {
        let value = data;
        let label = "";
        if (typeof data === "object" && data !== null) {
            value = data.value;
            label = data.label;
        }
        label = label ? `${label} - ` : "";

        switch (schema.type) {
            case "string":
                return {
                    widgetName: "readonly",
                    widgetData: { text: `${label}${value || ""}` },
                };
            case "number":
                return {
                    widgetName: "readonly",
                    widgetData: { text: `${label}${value}` },
                };
            case "integer":
                return {
                    widgetName: "readonly",
                    widgetData: { text: `${label}${value}` },
                };
            case "boolean":
                return {
                    widgetName: "readonly",
                    widgetData: { text: `${label}${value ? "True" : "False"}` },
                };
            case "null":
                return {
                    widgetName: "readonly",
                    widgetData: { text: `${label}Null` },
                };
            default:
        }
    }
};
export const pickSelectWidget = ({ schema }) => {
    if (schema.enum instanceof Array) {
        return {
            widgetName: "select",
        };
    }
};
export const pickTimeWidget = ({ schema }) => {
    switch (schema.format) {
        case "date": {
            return {
                widgetName: "date",
            };
        }
        case "time": {
            return {
                widgetName: "time",
            };
        }
        case "date-time": {
            return {
                widgetName: "date-time",
            };
        }
        default: {
            break;
        }
    }
};
export const pickCheckboxWidget = ({ schema }) => {
    switch (schema.type) {
        case "array": {
            if (schema.items && schema.items.enum instanceof Array && schema.uniqueItems === true) {
                return {
                    widgetName: "checkbox",
                    widgetData: schema.items.enum,
                };
            }
            break;
        }
        default: {
            break;
        }
    }
};
