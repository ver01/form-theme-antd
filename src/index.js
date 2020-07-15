//--- widget Schemas
import {
    stringWidgets,
    numberWidgets,
    integerWidgets,
    booleanWidgets,
    nullWidgets,
    rootWidgets,
    arrayWidgets,
    objectWidgets,
    controlWidgets,
} from "./widgetSchema";

//--- pickWidgetMethod
import { pickReadonlyWidget, pickSelectWidget, pickTimeWidget, pickCheckboxWidget } from "./widgetPickFunction";

//--- validators; when check fail return { [errorType]: string, [errorData]: any }
import {
    minLengthValidator,
    minimumValidator,
    maximumValidator,
    minItemsValidator,
    maxItemsValidator,
    multipleOfValidator,
    requiredValidator,
    formatValidator,
    patternValidator,
    typeofValidator,
    uniqueItemsValidator,
    dependenciesValidator,
} from "./validators";

//--- error handlers; generate errorObj using validators check result array;
//    [{ [errorType]: string, [errorData]: any }] -> errorObj
import { errorObjGenerator } from "./errorHandlers";

// Export Theme
export default {
    validators: {
        // buildin just need msgBuilder
        minLength: minLengthValidator,
        minimum: minimumValidator,
        maximum: maximumValidator,
        minItems: minItemsValidator,
        maxItems: maxItemsValidator,
        multipleOf: multipleOfValidator,
        required: requiredValidator,
        format: formatValidator,
        pattern: patternValidator,
        typeof: typeofValidator,
        uniqueItems: uniqueItemsValidator,
        dependencies: dependenciesValidator,
        // custom need checkLogic
    },
    components: {
        // base type
        string: {
            getWidget: [pickReadonlyWidget, pickSelectWidget, pickTimeWidget], // special widget pick logic: return { widgetName, widgetData }
            widgets: stringWidgets, // widget define: { [widgetName]: widgetSchema }
            errorObjGenerator, // generator errorObj for widgetSchema render widget
        },
        number: {
            getWidget: [pickReadonlyWidget, pickSelectWidget, pickTimeWidget],
            widgets: numberWidgets,
            errorObjGenerator,
        },
        integer: {
            getWidget: [pickReadonlyWidget, pickSelectWidget],
            widgets: integerWidgets,
            errorObjGenerator,
        },
        boolean: {
            getWidget: [pickReadonlyWidget],
            widgets: booleanWidgets,
            errorObjGenerator,
        },
        null: {
            getWidget: [pickReadonlyWidget],
            widgets: nullWidgets,
        },
        // root only
        root: {
            widgets: rootWidgets,
        },
        // control only
        control: {
            widgets: controlWidgets,
        },
        // 2 type container
        array: {
            getWidget: [pickCheckboxWidget],
            widgets: arrayWidgets,
            errorObjGenerator,
        },
        object: {
            widgets: objectWidgets,
            errorObjGenerator,
        },
    },
};
