import { FormItem } from "../widgetReactComponents";
import { formItemProps, hideWidget, readonly } from "./common";

const nullDefault = {
    component: FormItem,
    props: formItemProps,
};
export default {
    default: nullDefault,
    readonly,
    hide: hideWidget,
};
