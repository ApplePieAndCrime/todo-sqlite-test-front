import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';

import Main from '../../components/Main';
import { apiUrl } from '../../helpers/baseVars';
import AuthContext from '../../helpers/AuthContext';

import {
  Box,
  Paper,
  Divider,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  IconButton,
  ListItemText,
  Pagination,
} from '@mui/material';
import {
  Mode as ModeIcon,
  Delete as DeleteIcon,
  SaveAsRounded,
} from '@mui/icons-material';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [limit, setLimit] = useState(5);
  const { user } = useContext(AuthContext);
  const [createdTodoTitle, setCreatedTodoTitle] = useState('');
  const [selectedId, setSelectedId] = useState([0]);
  const [selectedTodo, setSelectedTodo] = useState({ id: '', title: '' });
  const [count, setCount] = useState(1);
  const textRef = useRef(null);

  const addTodo = useCallback(async () => {
    console.log({ createdTodoTitle });
    await axios
      .post(apiUrl + '/todos/', {
        title: createdTodoTitle,
        userId: user.sub,
      })
      .then(() => {
        setCreatedTodoTitle('');
      });
  }, [createdTodoTitle, user.sub]);

  const saveTodoTitle = useCallback(async () => {
    await axios
      .patch(apiUrl + '/todos/' + selectedTodo.id, {
        title: selectedTodo.title,
      })
      .then(() => {
        setSelectedTodo({ id: '', title: '' });
        setSelectedId('io');
      });
  }, [selectedTodo]);

  const removeTodo = useCallback(
    async todo => {
      console.log({ todoId: todo.id });
      await axios.delete(apiUrl + '/todos/' + todo.id).then(() => {
        setSelectedId('io');
      });
    },
    [selectedTodo]
  );

  const checkTodo = async todo => {
    console.log('check todo ', todo);
    todo.status = !todo.status;

    await axios
      .patch(apiUrl + '/todos/' + todo.id, { status: todo.status })
      .then(res => {
        console.log('patched ', res.data);
        setSelectedId(todo.id);
      });
  };

  useEffect(() => {
    axios
      .get(apiUrl + '/todos/count', { params: { where: { userId: user.sub } } })
      .then(res => setCount(res.data));
    axios
      .get(apiUrl + '/todos', {
        params: {
          where: { userId: user.sub },
          offset: (pageIndex - 1) * limit,
          limit,
        },
      })
      .then(res => {
        console.log({ res });
        setTodos(res.data);
      });
  }, [pageIndex, createdTodoTitle, limit, user.sub, selectedId]);

  return (
    <Main>
      <Paper sx={{ width: '30%', margin: 'auto', marginTop: 20, padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Todos ({count})
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          <TextField
            value={createdTodoTitle}
            onChange={e => setCreatedTodoTitle(e.target.value)}
            placeholder="Ented todo here"
            sx={{ width: '70%' }}
            ref={textRef}
            autoFocus
            onFocus={() => setSelectedTodo({ id: '', title: '' })}
          />
          <Button
            variant="contained"
            onClick={() => addTodo()}
            sx={{ width: '25%' }}
          >
            SUBMIT
          </Button>
        </Box>
        <List sx={{ bgcolor: 'background.paper' }}>
          {todos.map(todo => {
            return (
              <Box
                key={todo.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '50px',
                  margin: 'auto',
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.status}
                  onChange={() => checkTodo(todo)}
                />
                <Box sx={{ width: '70%' }}>
                  {selectedTodo.id === todo.id ? (
                    <TextField
                      value={selectedTodo.title}
                      onChange={e =>
                        setSelectedTodo(prev => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      sx={{ margin: 0, padding: 0, width: '100%' }}
                    />
                  ) : (
                    <Typography sx={{ margin: 0, padding: 0, width: '100%' }}>
                      {todo.title}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {selectedTodo.id == todo.id ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      sx={{ margin: 2, marginRight: 1 }}
                      onClick={() => saveTodoTitle()}
                    >
                      <SaveAsRounded />
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        setSelectedTodo({ id: todo.id, title: todo.title })
                      }
                      variant="contained"
                      color="success"
                      sx={{ margin: 2, marginRight: 1 }}
                    >
                      <ModeIcon />
                    </Button>
                  )}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => removeTodo(todo)}
                    sx={{ margin: 2, marginLeft: 0 }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
              // <ListItem
              //   key={todo.id}
              //   secondaryAction={
              //     <Box>
              //       <IconButton
              //         edge="end"
              //         onClick={() => setSelectedTodo({ id: todo.id })}
              //       >
              //         <ModeIcon />
              //       </IconButton>
              //       <IconButton edge="end">
              //         <DeleteIcon />
              //       </IconButton>
              //     </Box>
              //   }
              //   disablePadding
              // >
              //   <ListItemButton role={undefined} dense>
              //     <ListItemIcon>
              //       <Checkbox
              //         edge="start"
              //         checked={todo.status}
              //         onChange={() => checkTodo(todo)}
              //       />
              //     </ListItemIcon>
              //     <Box>
              //       {selectedTodo.id === todo.id ? (
              //         <TextField
              //           value={selectedTodo.title}
              //           onChange={e =>
              //             setSelectedTodo({ title: e.target.value })
              //           }
              //         />
              //       ) : (
              //         <ListItemText primary={todo.title} />
              //       )}
              //     </Box>
              //   </ListItemButton>
              // </ListItem>
              // );
            );
          })}
        </List>
        <Pagination
          count={Math.ceil(count / limit)}
          variant="outlined"
          color="primary"
          page={pageIndex}
          onChange={(e, value) => setPageIndex(value)}
        />
      </Paper>
    </Main>
  );
};

export default TodoPage;
