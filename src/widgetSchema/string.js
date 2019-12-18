import {
    FormItem,
    InputPassword,
    InputTextArea,
    ColorPicker,
    DatePicker,
    TimePicker,
    Uploader,
} from "../widgetReactComponents";
import { formItemProps, inputWidget, selectWidget, radioWidget, readonly } from "./common";

const dateFormat = (date, type) => {
    const value = date || new Date();
    const ret = [];
    (type || "").split(" ").map(key => {
        switch (key) {
            case "day":
                ret.push(`${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`);
                break;
            case "time":
                ret.push(`${value.getHours()}:${value.getMinutes()}:${value.getMinutes()}`);
                break;
            default:
                break;
        }
    });
    return ret.join(" ");
};

const stringDefault = {
    component: FormItem,
    props: formItemProps,
    children: [inputWidget],
};

const stringPassword = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: InputPassword,
            propsMixinList: ["autoFocus"],
            props: {
                $vf_value: ({ value }) => value,
                $vf_disabled: ({ schemaOption }) => schemaOption.disabled,
                $vf_onChange: ({ handle, schemaOption }) =>
                    schemaOption.readonly ? () => {} : e => handle.onChange(e.target.value),
            },
        },
    ],
};

const stringTextarea = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: InputTextArea,
            propsMixinList: ["autoFocus"],
            props: {
                autosize: { minRows: 2 },
                $vf_value: ({ value }) => value,
                $vf_disabled: ({ schemaOption }) => schemaOption.disabled,
                $vf_onChange: ({ handle, schemaOption }) =>
                    schemaOption.readonly ? () => {} : e => handle.onChange(e.target.value),
            },
        },
    ],
};

const stringColor = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: ColorPicker,
            props: {
                $vf_color: ({ value }) => value,
                $vf_onChange: ({ handle }) => val => handle.onChange(val.color),
            },
        },
    ],
};

const stringHidden = {
    component: null,
};

const stringDate = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: DatePicker,
            props: {
                $vf_value: ({ value }) => dateFormat(value, "day"),
                $vf_onChange: ({ handle }) => (_, str) => handle.onChange(str),
            },
        },
    ],
};

const stringTime = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: TimePicker,
            props: {
                $vf_value: ({ value }) => dateFormat(value, "time"),
                $vf_onChange: ({ handle }) => (_, str) => handle.onChange(str),
            },
        },
    ],
};

const stringDateTime = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: DatePicker,
            props: {
                $vf_value: ({ value }) => dateFormat(value, "day time"),
                $vf_onChange: ({ handle }) => (m, str) => {
                    handle.onChange(m.format("YYYY-MM-DD HH:mm:ss"));
                },
                showTime: true,
                format: "YYYY-MM-DD HH:mm:ss",
            },
        },
    ],
};

const stringUploader = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Uploader,
            props: {
                multiple: false,
                $vf_onChange: ({ handle }) => flist => {
                    if (flist && flist.length) {
                        handle.onChange(JSON.stringify(flist[0]));
                    } else {
                        handle.onChange("");
                    }
                },
                $vf_fileList: ({ value }) => (value ? [JSON.parse(value)] : []),
            },
        },
    ],
};

export default {
    select: selectWidget,
    radio: radioWidget,
    "date-time": stringDateTime,
    default: stringDefault,
    password: stringPassword,
    textarea: stringTextarea,
    color: stringColor,
    hidden: stringHidden,
    date: stringDate,
    time: stringTime,
    dateTime: stringDateTime,
    uploader: stringUploader,
    readonly,
};
