import {
    AbsoluteCenter,
    Box,
    Button,
    Center,
    Container,
    FormControl,
    FormLabel,
    Image,
    Input,
    InputRightAddon,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";


import React, { useEffect, useState } from 'react'
import axios from "axios";





function HomePage() {
    const toast = useToast();


    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState();



    const [taskTitle, setTaskTitle] = useState();
    const [taskDescription, setTaskDescription] = useState();
    const [taskDueDate, setTaskDueDate] = useState();

    let in_progress_tasks = [];
    let pending_tasks = [];
    let completed_tasks = [];

    useEffect(() => {
        fetchTasks();
        // in_progress_tasks = tasks.filter((task) => task.status === "in_progress");
        // pending_tasks = tasks.filter((task) => task.status === "pending");
        // completed_tasks = tasks.filter((task) => task.status === "completed");
    }, [selectedTask]);


    useEffect(() => {
        in_progress_tasks = tasks.filter((task) => task.status === "in_progress");

        // console.log("tasks")
        // console.log(typeof (tasks))
        // console.log(in_progress_tasks)
        // console.log(typeof (in_progress_tasks))
        pending_tasks = tasks.filter((task) => task.status === "pending");
        completed_tasks = tasks.filter((task) => task.status === "completed");


    }, [tasks]);

    in_progress_tasks = tasks.filter((task) => task.status === "in_progress");
    pending_tasks = tasks.filter((task) => task.status === "pending");
    completed_tasks = tasks.filter((task) => task.status === "completed");


    const fetchTasks = async () => {
        const response = await axios.get('api/tasks');
        setTasks(response.data);
        console.log("feteched data, task", tasks);
    };

    // const handleDelete = async (id) => {
    //     await axios.delete(`http://localhost:5000/tasks/${id}`);
    //     fetchTasks();
    // };

    const submitHandler = async () => {
        if (!taskTitle) {
            toast({
                title: "Please write the title for the task",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        const task = {
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate
        }

        try {
            await axios.post('api/tasks', task);

            toast({
                title: "Task added",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });

            setSelectedTask = task;
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }



    }

    return (
        <Box>
            <Text
                fontSize={"xxx-large"}
                marginY={"30px"}
                maxWidth={"fit-content"}
                marginX={"auto"}
                border={"2px solid black"}
            >
                To Do Application
            </Text>


            <Box
                display={"flex"}
                border={"3px solid red"}
                justifyContent={"space-evenly"}
            >

                <Box
                    maxWidth={"40%"}
                    minWidth={"40%"}
                    border={"3px solid blue"}

                >
                    <VStack>
                        <FormControl id="taskTitle" isRequired>
                            <FormLabel>Task Title</FormLabel>
                            <Input
                                placeholder="Enter task title"
                                onChange={(e) => setTaskTitle(e.target.value)}
                                borderRadius={15}
                            ></Input>
                        </FormControl>
                        <FormControl id="taskDescription" >
                            <FormLabel>Task Description</FormLabel>
                            <Input
                                placeholder="Enter task desciption"
                                onChange={(e) => setTaskDescription(e.target.value)}
                                borderRadius={15}
                            ></Input>
                        </FormControl>
                        <FormControl id="dueDate">
                            <FormLabel>Due Date</FormLabel>
                            <Input
                                placeholder='Select Date'
                                size='md'
                                type='date'
                                onChange={(e) => setTaskDueDate(e.target.value)}
                            />
                        </FormControl>

                        <Button
                            colorScheme="blue"
                            width="100%"
                            style={{ marginTop: 45 }}
                            onClick={submitHandler}
                            borderRadius={15}

                        >
                            Add Task
                            {/* {console.log(tasks)} */}
                        </Button>
                    </VStack>
                </Box>


                <Box
                    border={"3px solid green"}
                    maxWidth={"40%"}
                    minWidth={"40%"}

                >
                    <Box>
                        <Text
                            fontSize={"xx-large"}
                        >
                            In-progress Task
                        </Text>

                        {in_progress_tasks.length ? (
                            <Stack>
                                {in_progress_tasks.map((task) => (
                                    <Box>
                                        <Text>{task.title}</Text>
                                    </Box>
                                ))}
                            </Stack>
                        ) :
                            (<Text> No data </Text>)
                        }

                    </Box>
                    <Box>
                        <Text
                            fontSize={"xx-large"}
                        >
                            Pending Task
                        </Text>

                        {pending_tasks.length ? (
                            <Stack>
                                {pending_tasks.map((task) => (
                                    <Box>
                                        <Text>{task.title}</Text>
                                    </Box>
                                ))}
                            </Stack>
                        ) :
                            (<Text> No data </Text>)
                        }

                    </Box>
                    <Box>
                        <Text
                            fontSize={"xx-large"}
                        >
                            Completed Task
                        </Text>

                        {completed_tasks.length ? (
                            <Stack>
                                {completed_tasks.map((task) => (
                                    <Box>
                                        <Text>{task.title}</Text>
                                    </Box>
                                ))}
                            </Stack>
                        ) :
                            (<Text> No data </Text>)
                        }

                    </Box>
                </Box>
            </Box>


        </Box>

    )
}

export default HomePage