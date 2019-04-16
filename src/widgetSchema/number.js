import { FormItem, NumericInput, InputNumber } from "../widgetReactComponents";
import { formItemProps, selectWidget, radioWidget, readonly } from "./common";

const numberDefault = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: NumericInput,
            propsMixinList: ["autoFocus"],
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
            },
        },
    ],
};

const numberUpdown = {
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
    default: numberDefault,
    updown: numberUpdown,
    select: selectWidget,
    radio: radioWidget,
    readonly,
};
