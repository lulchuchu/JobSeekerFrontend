import styles from "@/styles/infocard.module.css";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {Button, DatePicker, Form, Input, Select, Space, message} from "antd";

const {RangePicker} = DatePicker;

export default function AddJob({companyId, setAddJobShowing}) {
    // const [title, setTitle] = useState('');
    // const [experience, setExperience] = useState('');
    // const [type, setType] = useState('');
    // const [onSite, setOnSite] = useState('');
    // const [address, setAddress] = useState('');
    // const [description, setDescription] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    // const router = useRouter();
    const [token, setToken] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    const change_url = process.env.NEXT_PUBLIC_API_JOB_URL + "add";

// Handle form submission
    const onFinish = async (values) => {
        try {
            // Extract start and end dates from RangePicker
            const [startDate, endDate] = values.startDate || [];

            const payload = {
                title: values.title,
                experience: values.experience,
                type: values.type,
                onSite: values["type of work"],
                address: values.address,
                description: values.description,
                startDate: startDate ? startDate.toISOString() : null,
                endDate: endDate ? endDate.toISOString() : null,
                companyId: companyId,
            };

            // Send API request
            await axios.post(change_url, payload, {
                headers: {Authorization: `Bearer ${token?.accessToken}`},
            });

            message.success("Job successfully added!");
            form.resetFields(); // Clear the form
            setAddJobShowing(false); // Close the popup
            router.reload(); // Reload the page
        } catch (error) {
            console.error("Error adding job:", error);
            message.error("Failed to add job. Please try again.");
        }
    };

    return (
        <div className={styles.fixed}>
            <div className={styles.blur}></div>
            <div className={styles.popup}>
                <div className={styles.head}>
                    <div className={styles.title}>Add job</div>
                    <button
                        onClick={() => setAddJobShowing(false)}
                        className={styles.buttonSmall}
                    >
                        X
                    </button>
                </div>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{required: true, message: "Please input the title!"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="experience"
                        label="Experience"
                        rules={[{required: true, message: "Please select experience!"}]}
                    >
                        <Select placeholder="Select experience for job" allowClear>
                            {["Internship", "Entry", "Mid", "Senior", "Lead"].map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{required: true, message: "Please select job type!"}]}
                    >
                        <Select placeholder="Select type for job" allowClear>
                            {["Full-time", "Part-time", "Contract"].map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="type of work"
                        label="Type of work"
                        rules={[{required: true, message: "Please select type of work!"}]}
                    >
                        <Select placeholder="Select type of work for job" allowClear>
                            {["Remote", "On-site", "Hybrid"].map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{required: true, message: "Please input the address!"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{required: true, message: "Please input the description!"}]}
                    >
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item
                        name="startDate"
                        label="Start and End Date"
                        rules={[{required: true, message: "Please select the date range!"}]}
                    >
                        <RangePicker showTime/>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={() => setAddJobShowing(false)}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
