import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteNav from "./Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../globals";

export default function TaskList() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getTasklist = async () => {
      const response = await axios.get( '${BASE_URL}/tasks');
      setTaskList(response.data);
    };
    getTasklist();
  }, []);

  let navigate = useNavigate();

  const showTask = (key) => {
    navigate(`/tasks/${key}`);
  };

  return (
    <>
      <SiteNav />
      <div className="TaskList">
        <h2>Task List</h2>
        {taskList.map((task, key) => (
          <Card key={key} className="mb-3">
            <Card.Body>
              <Card.Title>{task.name}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Button variant="primary" onClick={() => showTask(task.id)}>
                View Task
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}