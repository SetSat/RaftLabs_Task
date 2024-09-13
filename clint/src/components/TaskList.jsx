import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Modal, Select, DatePicker, Tag, Input } from "antd";
import { deleteTask, updateTask } from "../redux/tasksSlice";
import TaskForm from "./TaskForm";
import moment from "moment";
import Countdown from "react-countdown";

const { Option } = Select;
const { Search } = Input;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    filterTasks();
  }, [searchQuery, priorityFilter, dateFilter, tasks]);

  const filterTasks = () => {
    let updatedTasks = [...tasks];

    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priorityFilter !== "all") {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    if (dateFilter) {
      updatedTasks = updatedTasks.filter((task) =>
        moment(task.dueDate).isSameOrBefore(moment(dateFilter), "day")
      );
    }

    setFilteredTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalVisible(false);
  };

  const handleUpdateStatus = (task, status) => {
    dispatch(updateTask({ ...task, status }));
  };

  const getPriorityTag = (priority) => {
    if (priority === "high") return <Tag color="red">High</Tag>;
    if (priority === "medium") return <Tag color="yellow">Medium</Tag>;
    return <Tag color="green">Low</Tag>;
  };

  const getStatusTag = (status) => {
    if (status === "completed") return <Tag color="green">Completed</Tag>;
    return <Tag color="gold">In Progress</Tag>;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Task List</h2>

      <Search
        placeholder="Search tasks by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Select
          placeholder="Filter by Priority"
          onChange={(value) => setPriorityFilter(value)}
          value={priorityFilter}
          style={{ width: "150px" }}
        >
          <Option value="all">All</Option>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>

        <DatePicker
          placeholder="Filter by Due Date"
          onChange={(date) => setDateFilter(date)}
          style={{ width: "200px" }}
        />
      </div>

      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "1rem" }}
      >
        Add New Task
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEdit(task)}>Edit</Button>,
              task.status === "completed" ? (
                <Button onClick={() => handleUpdateStatus(task, "in progress")}>
                  Mark as Incomplete
                </Button>
              ) : (
                <Button onClick={() => handleUpdateStatus(task, "completed")}>
                  Mark as Completed
                </Button>
              ),
              <Button danger onClick={() => handleDelete(task.id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  {task.title} {getStatusTag(task.status)}
                </div>
              }
              description={`${task.description} - Due: ${moment(
                task.dueDate
              ).format("MM/DD/YYYY")}`}
            />
            <div>
              Priority: {getPriorityTag(task.priority)}
              <br />
              <Countdown
                date={new Date(task.dueDate)}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return <span>Expired</span>;
                  } else {
                    return (
                      <span>
                        {days} days {hours} hrs {minutes} min {seconds} sec left
                      </span>
                    );
                  }
                }}
              />
            </div>
          </List.Item>
        )}
      />

      <Modal
        title={selectedTask ? "Edit Task" : "Add Task"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <TaskForm selectedTask={selectedTask} onFormSubmit={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default TaskList;
