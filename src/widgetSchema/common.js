import React from "react";
import { FormItem, Meta, Select, SelectOption, Radio, RadioGroup, Slider, Div, Input } from "../widgetReactComponents";

export const cardTitleProps = {
    $vf_title: ({ schema, arrayIndex, objectKey }) => {
        let title = schema.title || "";
        if (arrayIndex !== null) {
            title = `${title || "Item"} - ${arrayIndex + 1}`;
        } else if (objectKey !== null) {
            title = title || objectKey;
        }
        if (schema.description) {
            return (
                <div>
                    {title}
                    <Meta description={schema.description} style={{ whiteSpace: "initial" }} />
                </div>
            );
        }
        return title;
    },
    style: {
        marginBottom: "24px",
    },
};

export const formItemPropsWithoutLabel = {
    $vf_style: ({ schemaOption, ...args }) => {
        if (schemaOption.hideBy === true) {
            return { display: "none" };
        } else if (typeof schemaOption.hideBy === "function") {
            if (schemaOption.hideBy({ schemaOption, ...args })) {
                return { display: "none" };
            }
        }
    },
    $vf_extra: ({ schema }) => schema.description,
    $vf_required: ({ parentSchema, isArray, objectKey }) => {
        if (parentSchema && parentSchema.required instanceof Array && !isArray) {
            return parentSchema.required.includes(objectKey);
        }
        return false;
    },
    $vf_validateStatus: ({ errorObj }) => (errorObj && errorObj.message ? "error" : undefined),
    $vf_help: ({ errorObj }) => (errorObj && errorObj.message) || null,
};

export const formItemProps = {
    $vf_label: ({ schema, arrayIndex, objectKey }) => {
        let title = schema.title;
        if (typeof title === "undefined") {
            title = "";
        } else if (arrayIndex !== null) {
            title = `${title || "Item"} - ${arrayIndex + 1}`;
        } else if (objectKey !== null) {
            title = title || objectKey;
        }
        return title;
    },

    ...formItemPropsWithoutLabel,
};

export const withHide = Component => {
    return props => {
        const { hide, ...other } = props || {};
        return hide ? null : <Component {...other} />;
    };
};

export const selectWidget = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Select,
            propsMixinList: ["style", "placeholder"],
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
                $vf_children: ({ schema, schemaOption }) => {
                    const { enumNames = [] } = schema;
                    const { enumDisabled = [] } = schemaOption;
                    return (schema.enum || []).map((it, key) => (
                        <SelectOption
                            value={it}
                            key={key}
                            disabled={
                                enumDisabled.some(i => i.hasOwnProperty("value") && i.value === it) ||
                                enumDisabled.some(i => i.hasOwnProperty("index") && i.index === key) ||
                                (key < enumDisabled.length &&
                                    enumDisabled.some(i => i.hasOwnProperty("label") && i.label === enumNames[key]))
                            }
                        >
                            {key < enumNames.length ? enumNames[key] : `Option ${key + 1}`}
                        </SelectOption>
                    ));
                },
            },
        },
    ],
};

export const radioWidget = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: RadioGroup,
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => e => handle.onChange(e.target.value),
                $vf_children: ({ schema, schemaOption }) => {
                    const { enumNames = [] } = schema;
                    const { enumDisabled = [] } = schemaOption;
                    return (schema.enum || []).map((it, key) => (
                        <Radio
                            value={it}
                            key={key}
                            disabled={
                                enumDisabled.some(i => i.hasOwnProperty("value") && i.value === it) ||
                                enumDisabled.some(i => i.hasOwnProperty("index") && i.index === key) ||
                                (key < enumDisabled.length &&
                                    enumDisabled.some(i => i.hasOwnProperty("label") && i.label === enumNames[key]))
                            }
                        >
                            {key < enumNames.length ? enumNames[key] : `Option ${key + 1}`}
                        </Radio>
                    ));
                },
            },
        },
    ],
};

export const sliderWidget = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Slider,
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
                $vf_min: ({ schema }) => (schema.minimum === undefined ? 0 : schema.minimum),
                $vf_max: ({ schema }) => (schema.maximum === undefined ? 100 : schema.maximum),
                $vf_step: ({ schema }) => (schema.multipleOf === undefined ? 1 : schema.multipleOf),
                tooltipVisible: false,
            },
        },
        {
            component: Div,
            props: {
                $vf_children: ({ value }) => <span>{value}</span>,
            },
        },
    ],
};

export const inputWidget = {
    component: Input,
    propsMixinList: ["autoFocus", "style"],
    props: {
        $vf_value: ({ value }) => value,
        $vf_disabled: ({ schemaOption }) => schemaOption.disabled,
        $vf_onChange: ({ handle, schemaOption }) =>
            schemaOption.readonly ? () => {} : e => handle.onChange(e.target.value),
    },
};

export const readonly = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Div,
            props: {
                $vf_children: ({ widgetData }) => {
                    const { text = "" } = widgetData || {};
                    if (text) {
                        return <span>{text}</span>;
                    }
                    return null;
                },
            },
        },
    ],
};
