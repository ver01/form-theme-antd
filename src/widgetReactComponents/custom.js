import React from "react";
import { Upload, Button, Icon, Input } from "antd";

export const Div = props => <div {...props}>{props.children}</div>;
export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: props.fileList || [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.fileList) !== JSON.stringify(nextProps.fileList)) {
            this.setState({
                fileList: nextProps.fileList || [],
            });
        }
    }
    handleChange = info => {
        let { fileList } = info;
        if (!this.props.multiple) {
            fileList = fileList.slice(-1);
        }

        this.setState({ fileList });
        this.props.onChange && this.props.onChange(fileList);
    };
    handleRemove = info => {
        let fileList = this.state.fileList.filter(it => it.uid !== info.uid);
        this.setState({ fileList });
        this.props.onChange && this.props.onChange(fileList);
    };

    render() {
        return (
            <Upload
                action="file/posts"
                {...this.props}
                onChange={this.handleChange}
                onRemove={this.handleRemove}
                fileList={this.state.fileList}
            >
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        );
    }
}
export class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    onChange = e => {
        let { value } = e.target;
        value = value.trim();
        const reg = /^-?(0|[1-9][0-9]*)?(\.[0-9]*)?$/;
        if (reg.test(value)) {
            if (!Number.isNaN(Number(value))) {
                this.props.onChange(Number(value));
            } else {
                this.setState({
                    value,
                });
            }
        }
    };
    render() {
        return <Input {...this.props} value={this.state.value} onChange={this.onChange} />;
    }
}
