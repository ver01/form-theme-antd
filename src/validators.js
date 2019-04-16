// input { value, ruleValue, schema }
// output { errorType: string, errorData: any }
export const minLengthValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `should NOT be shorter than ${ruleValue} characters`,
});
export const requiredValidator = ({ value, schema }) => ({
    errorType: "feedbackStr",
    errorData: `${schema.title || "this"} is required`,
});
export const typeofValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `should be ${ruleValue}`,
});
export const minItemsValidator = ({ value, ruleValue }) => ({
    errorType: "feedbackStr",
    errorData: `should NOT have less than ${ruleValue}`,
});
export const maxItemsValidator = ({ value, ruleValue }) => ({
    errorType: "feedbackStr",
    errorData: `should NOT have more than ${ruleValue}`,
});
export const minimumValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `value is less then ${ruleValue}`,
});
export const maximumValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `value is greatter then ${ruleValue}`,
});
export const multipleOfValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `value is not multiple of ${ruleValue}`,
});
export const formatValidator = ({ value, ruleValue, schema }) => {
    switch (ruleValue) {
        case "email":
            return {
                errorType: "feedbackStr",
                errorData: `value should match format "email"`,
            };
        case "uri":
            return {
                errorType: "feedbackStr",
                errorData: `value should match format "uri"`,
            };
        // more custom format case
        // case "customType":
        default:
            return;
    }
};
export const patternValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `should match pattern "${ruleValue}"`,
});
export const uniqueItemsValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `this item is duplicate with item ${ruleValue}`,
});
export const dependenciesValidator = ({ value, ruleValue, schema }) => ({
    errorType: "feedbackStr",
    errorData: `should have this property when "${ruleValue}" property is present`,
});
