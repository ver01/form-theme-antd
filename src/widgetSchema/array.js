import { Card, Div, Button, ButtonGroup, FormItem, Uploader, checkboxGroup } from "../widgetReactComponents";
import { cardTitleProps, formItemProps, withHide } from "./common";

const arrayDefault = {
    component: Card,
    props: cardTitleProps,
    children: [
        {
            mode: "repeaterHolder",
            component: Div,
            repeater: {
                component: Div,
                children: [
                    {
                        // array control btn group
                        component: withHide(ButtonGroup), // suport hide props
                        props: {
                            $vf_hide: ({ handle }) => {
                                const { canMoveUp, canMoveDown, canRemove } = handle;
                                return !(canMoveUp || canMoveDown || canRemove);
                            },
                            style: {
                                float: "right",
                                $vf_width: ({ extOption: { orderable, removable } }) => {
                                    if (!orderable) {
                                        return "32px";
                                    }
                                    if (!removable) {
                                        return "63px";
                                    }
                                    return "95px";
                                },
                                $vf_marginTop: ({ widgetName, schema: { type, title } }) => {
                                    if (widgetName === "default") {
                                        if (["object", "array"].includes(type)) {
                                            return "0";
                                        } else {
                                            if (title) {
                                                return "48px";
                                            } else {
                                                return "4px";
                                            }
                                        }
                                    }
                                    return "0";
                                },
                            },
                        },
                        children: [
                            {
                                // move down btn
                                component: withHide(Button),
                                props: {
                                    icon: "arrow-down",
                                    $vf_onClick: ({ handle }) => handle.moveDown,
                                    $vf_hide: ({ handle }) => !handle.canMoveDown,
                                },
                            },
                            {
                                component: withHide(Button),
                                props: {
                                    icon: "arrow-up",
                                    $vf_onClick: ({ handle }) => handle.moveUp,
                                    $vf_hide: ({ handle }) => !handle.canMoveUp,
                                },
                            },
                            {
                                component: withHide(Button),
                                props: {
                                    icon: "delete",
                                    type: "danger",
                                    $vf_onClick: ({ handle }) => handle.remove,
                                    $vf_hide: ({ handle }) => !handle.canRemove,
                                },
                            },
                        ],
                    }, // END: array control btn group
                    {
                        mode: "editorHolder",
                        component: Div,
                        props: {
                            style: {
                                $vf_marginRight: ({ handle, extOption: { orderable, removable } }) => {
                                    const { canMoveUp, canMoveDown, canRemove } = handle;
                                    if (canMoveUp || canMoveDown || canRemove) {
                                        if (!orderable) {
                                            return "40px";
                                        }
                                        if (!removable) {
                                            return "71px";
                                        }
                                        return "102px";
                                    }
                                    return "0";
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            // array add btn
            component: withHide(FormItem),
            props: {
                $vf_hide: ({ handle }) => !handle.canAppend,
            },
            children: [
                {
                    component: Button,
                    props: {
                        icon: "plus",
                        type: "primary",
                        $vf_onClick: ({ handle }) => handle.append,
                    },
                },
            ],
        },
        {
            // error Info
            component: withHide(FormItem),
            props: {
                $vf_validateStatus: ({ errorObj }) => (errorObj && errorObj.message ? "error" : undefined),
                $vf_help: ({ errorObj }) => (errorObj && errorObj.message) || null,
            },
        },
    ],
};

const arrayUploader = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: Uploader,
            props: {
                multiple: true,
                $vf_onChange: ({ handle }) => flist => {
                    if (flist && flist.length) {
                        handle.onChange(flist.map(JSON.stringify));
                    } else {
                        handle.onChange([]);
                    }
                },
                $vf_fileList: ({ value }) => (value ? value.map(JSON.parse) : []),
            },
        },
    ],
};

const arrayCheckbox = {
    component: FormItem,
    props: formItemProps,
    children: [
        {
            component: checkboxGroup,
            props: {
                $vf_value: ({ value }) => value,
                $vf_onChange: ({ handle }) => handle.onChange,
                $vf_options: ({ widgetData }) => widgetData,
            },
        },
    ],
};

export default {
    default: arrayDefault,
    uploader: arrayUploader,
    checkbox: arrayCheckbox,
};
