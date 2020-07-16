import { FormItem, InputNumber } from "../widgetReactComponents";
import { formItemProps, selectWidget, radioWidget, sliderWidget, hideWidget, readonly } from "./common";

const integerDefault = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: InputNumber,
            propsMixinList: ["autoFocus"],
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
                style: {
                    width: "100%",
                },
            },
        },
    ],
};
export default {
    default: integerDefault,
    select: selectWidget,
    radio: radioWidget,
    range: sliderWidget,
    readonly,
    hide: hideWidget,
};
