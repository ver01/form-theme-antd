import React from "react";
import { FormItem, Switch, Radio, Checkbox, Select, RadioGroup, SelectOption } from "../widgetReactComponents";
import { formItemProps, formItemPropsWithoutLabel, readonly } from "./common";

const booleanDefault = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Switch,
            props: {
                $vf_checked: ({ value }) => (value === true ? true : value === false ? false : undefined),
                $vf_onChange: ({ handle }) => handle.onChange,
            },
        },
    ],
};

const booleanSelect = {
    formatter: val => (val ? "true" : "false"),
    normalizer: val => (val === "true" ? true : false),
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Select,
            propsMixinList: ["style", "placeholder"],
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
                $vf_children: () => [
                    <SelectOption value="true" key="true">
                        Yes
                    </SelectOption>,
                    <SelectOption value="false" key="false">
                        No
                    </SelectOption>,
                ],
            },
        },
    ],
};

const booleanCheckbox = {
    component: FormItem,
    props: formItemPropsWithoutLabel,
    children: [
        {
            component: props => {
                const { title, ...other } = props;
                return <Checkbox {...other}>{title}</Checkbox>;
            },
            props: {
                $vf_checked: ({ value }) => value,
                $vf_onChange: ({ handle }) => e => handle.onChange(e.target.checked),
                $vf_title: ({ schema }) => schema.title,
            },
        },
    ],
};

const booleanRadio = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: RadioGroup,
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => e => handle.onChange(e.target.value),
                $vf_children: () => [
                    <Radio value={true} key="t">
                        yes
                    </Radio>,
                    <Radio value={false} key="f">
                        no
                    </Radio>,
                ],
            },
        },
    ],
};

export default {
    default: booleanDefault,
    select: booleanSelect,
    checkbox: booleanCheckbox,
    radio: booleanRadio,
    readonly,
};
