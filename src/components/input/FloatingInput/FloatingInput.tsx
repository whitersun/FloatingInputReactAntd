import { DatePicker, DatePickerProps, Form, Input, InputNumber, Space, Typography } from "antd"

import "./style.scss";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

type TypeInput = 'number' | 'text' | 'password' | 'textarea' | 'select' | 'date' | 'datepicker';

type PropsFloatingInput = {
    label: string,
    type: TypeInput,
    name: string,
    min?: number,
    max?: number,
    defaultValue?: string,
    keyboard?: boolean,
    placeholder?: string,
    classes?: string
    onChange?: (value: string) => void
}

export const FloatingInput = (props: PropsFloatingInput) => {
    const { type, name, label, min, max, keyboard, defaultValue, placeholder, classes } = props;

    const [value, setValue] = useState('');
    const [floating, setFloating] = useState(false);

    const onBlur = () => value 
        ? setFloating(true) 
        : setFloating(false);

    const onFocus = () => setFloating(true);

    const onChangeValue = (event: any) => {
        if (type === 'number') {
            setValue(event);
        } else {
            setValue(event.target.value);
        }

    }

    const onChangeOnDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date);
        console.log(dateString);

        setValue(dateString);
    };

    const conditionRender = () => {
        const floatingClass = (defaultValue: string | undefined, floating: boolean) => 
            `floating-title ${defaultValue ? 'floating-active' : ''} 
            ${!defaultValue && floating ? 'floating-active' : ''}`;
    
        const commonProps = {
            onChange: onChangeValue,
            onBlur: onBlur,
            onFocus: onFocus
        };
    
        const inputProps = {
            name: name,
            classes: classes,
            className: "floating-control",
            placeholder: placeholder,
            defaultValue: defaultValue
        };
    
        const numberProps = {
            min: min,
            max: max,
            keyboard: keyboard
        };
    
        const textareaProps = {
            rootClassName: "floating-control",
            rows: 4,
            maxLength: max
        };
    
        const passwordProps = {
            iconRender: (visible: boolean) => 
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        };
    
        const datePickerProps = {
            className: "floating-control",
            onChange: onChangeOnDatePicker,
            placeholder: placeholder
        };
    
        const renderInput = (type: string, renderProps: any) => {
            switch (type) {
                case 'number':
                    return <InputNumber {...commonProps} 
                        {...numberProps} {...renderProps} />;
                case 'text':
                    return <Form.Item name={name}> 
                        <Input {...commonProps} {...renderProps} />
                    </Form.Item>
                case 'password':
                    return <Form.Item name={name}>
                        <Input.Password {...commonProps} 
                            {...passwordProps} {...renderProps} />
                    </Form.Item>
                case 'textarea':
                    return <Form.Item name={name}>
                        <TextArea {...commonProps} 
                            {...textareaProps} {...renderProps} />
                    </Form.Item>
                case 'datepicker': 
                    return <Space direction="vertical" 
                        onBlur={onBlur} onFocus={onFocus}>
                        <Form.Item name={name}>
                            <DatePicker {...datePickerProps} {...renderProps} />
                        </Form.Item>
                    </Space>;
            }
        };
    
        return <div className={`floating-${type} relative`}>
            {renderInput(type, inputProps)}
            <Typography.Title className={floatingClass(defaultValue, floating)} 
                level={5}>{label}</Typography.Title>
        </div>;
    }


    return (
        <div className="floating-input w-full">
            {conditionRender()}
        </div>
    )
}