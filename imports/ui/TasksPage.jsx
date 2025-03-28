import React, { Fragment, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Fab,
  ListSubheader,
  Container,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AssignmentIcon from "@mui/icons-material/Assignment";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export const TasksPage = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const isLoading = useSubscribe("tasks").isLoading;
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleToggleChecked = async (task) => {
    try {
      await Meteor.callAsync("tasks.toggleChecked", {
        _id: task._id,
        isChecked: !task.isChecked,
      });
    } catch (error) {
      console.error("Erro ao alternar tarefa:", error);
    }
  };

  const handleEdit = (id) => {
    let founded = false;
    tasks.map((task) => {
      if (task._id === id && task.userId === user._id) {
        founded = true;
        navigate(`/edit/${id}`);
      }
    });
    if (!founded) alert("Erro. Essa tarefa pode pertencer a outro usuário.");
    // console.log("cliquei no edit: ", id);
    // navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    let founded = false;
    tasks.map((task) => {
      if (task._id === id && task.userId === user._id) {
        founded = true;
        Meteor.callAsync("tasks.delete", { _id: id });
      }
    });
    if (!founded) alert("Erro. Essa tarefa pode pertencer a outro usuário.");
  };

  const handleClick = (id) => {
    if (id) {
      navigate(`/view/${id}`);
    }
  };

  const logout = () => Meteor.logout();

  const columns = [
    {
      field: "iconTask",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => <AssignmentIcon style={{ marginTop: "13px" }} />,
    },
    {
      field: "Tarefa",
      headerName: "Tarefa",
      width: 200,
      sortable: false,
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(params.row.id)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "Usuário",
      headerName: "Usuário",
      width: 180,
      sortable: false,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      sortable: false,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      // headerAlign: "right",
      // align: "right",
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = tasks.map((task, index) => ({
    id: task._id,
    Tarefa: task.text,
    Usuário: task.user,
    Status: task.situation,
    // isChecked: task.isChecked,
    index: index + 1,
  }));

  const paginationModel = { page: 0, pageSize: 5 };
  {
    /** */
  }
  return (
    <Container maxWidth="xl">
      <Fragment>
        {/* <TaskForm /> */}
        <Box
          sx={{ bottom: 16, left: 16 }}
          style={{
            marginLeft: "10px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            marginRight: "10px",
          }}
        >
          <h2 style={{ display: "flex", justifyContent: "flex-start" }}>
            Tarefas
          </h2>
          {/*
          <div
            className="filter"
            style={{
              marginTop: "20px",
              right: "20px",
            }}
          >
            
             <Button
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
            variant="contained"
            onClick={() => setHideCompleted(!hideCompleted)}
          >
            {hideCompleted ? "Show All" : "Hide Completed"}
          </Button> 
          </div>
          */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/newTask")}
            style={{ marginTop: "15px", bottom: "15px" }}
          >
            <AddIcon />
          </Fab>
        </Box>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            checkboxSelection={false}
            disableColumnMenu
            disableSelectionOnClick
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15, 20]}
            sx={{ border: 0 }}
            localeText={{
              noRowsLabel: "Nenhuma tarefa encontrada.",
            }}
          />
        </Paper>
        {/** */}
      </Fragment>
    </Container>
  );
};
