import { DatePicker, DatePickerProps, Input, InputNumber, Space, Typography } from "antd"

import "./style.scss";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

type TypeInput = 'number' | 'text' | 'password' | 'textarea' | 'select' | 'date' | 'datepicker';

type PropsFloatingInput = {
    title: string,
    type: TypeInput,
    min?: number,
    max?: number,
    defaultValue?: string,
    keyboard?: boolean,
    placeholder?: string,
    onChange?: (value: string) => void
}

export const FloatingInput = (props: PropsFloatingInput) => {
    const { type, title, min, max, keyboard, defaultValue, placeholder } = props;

    const [value, setValue] = useState('');
    const [floating, setFloating] = useState(false);

    const onBlur = () => value 
        ? setFloating(true) 
        : setFloating(false);

    const onFocus = () => setFloating(true);

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
            onChange: (event: any) => setValue(event.target.value),
            onBlur: onBlur,
            onFocus: onFocus
        };
    
        const inputProps = {
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
    
        const renderInput = (type: string, props: any) => {
            switch (type) {
                case 'number':
                    return <InputNumber {...commonProps} 
                        {...numberProps} {...props} />;
                case 'text':
                    return <Input {...commonProps} {...props} />;
                case 'password':
                    return <Input.Password {...commonProps} 
                        {...passwordProps} {...props} />;
                case 'textarea':
                    return <TextArea {...commonProps} 
                        {...textareaProps} {...props} />;
                case 'datepicker': 
                    return <Space direction="vertical" 
                        onBlur={onBlur} onFocus={onFocus}>
                        <DatePicker {...datePickerProps} />
                    </Space>;
            }
        };
    
        return <div className={`floating-${type}`}>
            {renderInput(type, inputProps)}
            <Typography.Title className={floatingClass(defaultValue, floating)} 
                level={5}>{title}</Typography.Title>
        </div>;
    }


    return (
        <div className="floating-input">
            {conditionRender()}
        </div>
    )
}