import { Button, Form } from "antd";
import { FloatingInput } from "../components/input/FloatingInput/FloatingInput";

import moment from "moment";

export const Home = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    

    const worker = {
        dateOfBirth: moment(new Date())
    };

    return (
        <div className="homepage max-w-7xl">
            <h1>Home</h1>

            <div className="max-w-4xl mx-auto">
                <div className="layoutBox">
                    <Form
                        name="basic"
                        initialValues={ worker }
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <FloatingInput classes="w-full" type="text" name="username" label="Username" />
                            <FloatingInput type="text" name="email" label="Email" />
                            <FloatingInput type="datepicker" name="startDate" label="Start Date" />

                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            
            </div>
        </div>
    );
};