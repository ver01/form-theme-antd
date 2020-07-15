import { FormItem, DataPicker, NumericInput, InputNumber } from "../widgetReactComponents";
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

const numberDateTime = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: DatePicker,
            props: {
                $vf_value: ({ value }) => (value ? +new Date(value) : +new Date()),
                $vf_onChange: ({ handle }) => (m, str) => {
                    handle.onChange(+new Date(m));
                },
                showTime: true,
                format: "YYYY-MM-DD HH:mm:ss",
            },
        },
    ],
};

export default {
    default: numberDefault,
    "date-time": numberDateTime,
    updown: numberUpdown,
    select: selectWidget,
    radio: radioWidget,
    readonly,
};
