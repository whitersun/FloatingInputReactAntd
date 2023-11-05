import { Button, Form } from "antd";
import { FloatingInput } from "../components/input/FloatingInput/FloatingInput";

type FieldType = {
    username?: string,
    email?: string
}

export const Home = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    

    return (
        <div className="homepage max-w-7xl">
            <h1>Home</h1>

            <div className="max-w-4xl mx-auto">
                <div className="layoutBox">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <Form.Item<FieldType> name="username">
                                <div className="floatingBox">
                                    <FloatingInput classes="w-full" type="text" label="Username" />
                                </div>
                            </Form.Item>

                            <Form.Item<FieldType> name="email">
                                <div className="floatingBox">
                                    <FloatingInput type="number" label="Email" />
                                </div>
                            </Form.Item>
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