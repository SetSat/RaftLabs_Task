import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Select, message } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';

const { Option } = Select;

const TaskForm = ({ selectedTask, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue({
        ...selectedTask,
        dueDate: moment(selectedTask.dueDate),
      });
    }
  }, [selectedTask, form]);

  const handleFinish = (values) => {
    if (selectedTask) {
      dispatch(updateTask({
        ...values,
        id: selectedTask.id,
      }));
      message.success('Task updated successfully');
    } else {
      dispatch(addTask({
        ...values,
        id: Date.now(),
      }));
      message.success('Task added successfully');
    }
    form.resetFields();
    onFormSubmit();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter task description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select due date' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select priority' }]}
      >
        <Select>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {selectedTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
