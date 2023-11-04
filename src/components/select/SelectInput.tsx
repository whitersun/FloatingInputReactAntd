import { Input, Select } from "antd"
import { useEffect, useState } from "react";

export const SelectInput = () => {
    const { Option } = Select;
    const [defaultCountry, setDefaultCountry] = useState('');
    const [country, setCountry] = useState<Array<{ label: string; value: string, flat: string }>>();

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) => {

        return (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            console.log('data: ', data);
            
            const nationalInfo = data.map((item: any) => {
                const code = item.idd.root + item.idd.suffixes?.join('');
                return {
                    value: item.name.common,
                    label: `${code} ${item.cca2}`,
                    flat: item.flags.svg
                }
            });

            const defaultCountry = nationalInfo.find((item: any) => item.value === 'Vietnam');

            console.log(defaultCountry?.value);
            setDefaultCountry(defaultCountry?.value);
            setCountry(nationalInfo)
        }

        if (!country) {
            fetchData();
        } else {
            console.log('country: ', country);
        }
    
    }, [country])

    const renderOption = (index: number, item: { label: string; value: string, flat: string }) => {
        const { value, label, flat: icon } = item;
        const haveVn = label.includes('VN');

        return (
            <Option value={value} selected={haveVn ? true : false} key={index}>
                <div className="flex items-center">
                    <img decoding="async" loading="lazy" width={24} height={24} src={icon} className="flagImage object-contain" alt="Flag" style={{ width: 24, height: 24, marginRight: 8 }} />
                    <span className="flagName">{label}</span>
                </div>
            </Option>
        )
    };


    return (
        <div className="stackedGroup bg-white px-4 pt-3 pb-1 rounded-3 border border-solid border-#d9d9d9">
            <div className="stacked-label text-dark text-start text-sm mb-0">Phone Number</div>
            <div className="flex flex-row inputGroup">
                {defaultCountry && (
                    <Select
                        showSearch
                        className="selectedBorder border-none"
                        defaultValue={defaultCountry}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        style={{ width: 120 }}
                        onChange={handleChange}
                    >
                        {country?.map((item: any, idx: number) => renderOption(idx, item))}
                    </Select>
                )}
                <Input
                    className="border-none bg-transparent w-full"
                    placeholder="Enter phone number"
                    defaultValue="0329594513"
                />
            </div>
        </div>
    )

}