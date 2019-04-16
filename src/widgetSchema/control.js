import React from "react";
import { Menu, Dropdown, Icon, MenuItem } from "../widgetReactComponents";

const controlDefault = {
    component: null,
    children: [
        {
            component: props => {
                const { schemaList } = props;
                if (!schemaList) {
                    return null;
                }
                const activeInd = schemaList.findIndex(it => it.selected);
                return (
                    <div>
                        <Dropdown
                            overlay={
                                <Menu onClick={({ key }) => props.schemaSelect(key)}>
                                    {schemaList.map((it, ind) => {
                                        const { schema } = it;
                                        return (
                                            <MenuItem key={ind}>{`${
                                                schema.title ? schema.title : `Option ${ind + 1}`
                                            }`}</MenuItem>
                                        );
                                    })}
                                </Menu>
                            }
                        >
                            <a className="ant-dropdown-link">
                                {`${
                                    schemaList[activeInd].schema.title
                                        ? schemaList[activeInd].schema.title
                                        : `Option ${activeInd + 1}`
                                } `}
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                );
            },
            props: {
                $vf_schemaList: ({ schemaList }) => schemaList,
                $vf_schemaSelect: ({ handle }) => handle.schemaSelect,
            },
        },
        {
            mode: "editorHolder",
            component: null,
        },
    ],
};

export default {
    default: controlDefault,
};
