import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import toast from "react-simple-toasts";
import { TodoList } from '../Components/Todolist';
import { TodoView } from '../Components/Todoview';
import type { ToDo } from '../types';
import { useAxios } from '../useAxios';

const texts = {
    orderByLabel: "Ordenar por:",
    searchLabel: "Pesquisar:",
    deleteTodoSuccess: "Sua Faina foi deletada com sucesso!",
    deleteTodoFailure: "Ifelizemente não foi possível deletar sua Faina por conta de um erro!",
  };

const todoOrderBy = {
    createdAtAsc: {
        direction: 'asc',
        orderBy: 'createdAt',
    },
    createdAtDesc: {
        direction: 'desc',
        orderBy: 'createdAt',
    },
    deadlineAsc: {
        direction: 'asc',
        orderBy: 'deadline',
    },
    deadlineDesc: {
        direction: 'desc',
        orderBy: 'deadline',
    },
};

const getTodoLimit = 10;
const getTodoOffset = 0;

export function TodoContainer() {
    const [todoParams, setTodoParams] = useState({
        ...todoOrderBy.deadlineAsc,
        limit: getTodoLimit,
        offset: getTodoOffset,
        search: ""
    });
    
    const [{ data: { count: todoCount, todolist: todoList } = { count: 0, todolist: [], }, }, getTodoList] = useAxios<{ count: number, todolist: ToDo[]}>({
        url: '/todolist',
        method: 'get' 
    }, {
        manual: true,
    });

    const [{ data: currentToDoAxios ={} as Partial<ToDo> }, getToDo] = useAxios<ToDo>(
        {
            method: 'get',
        },
        {
            manual: true,
        }
    );
    
    const [, deleteTodo] = useAxios(
        {
            method: 'delete'
        },
        {
            manual: true,
        }
    );

    const [currentToDo, setCurrentToDo] = useState(currentToDoAxios);

    const debounceGetTodoList = useCallback(
        debounce(
            (params: typeof todoParams) =>
                getTodoList({
                    params,
                }),
            2000
        ),
        [todoList]
    );

    useEffect(() => {
        if (currentToDo.id !== currentToDoAxios.id) {
            setCurrentToDo(currentToDoAxios);
        }
    }, [currentToDoAxios]);

    useEffect(() => {
        getTodoList({
            params: todoParams,
        });
    }, []);
    
    return (
        <div className="flex">
            {TodoList && (
                <div className="w-3/5 p-6">
                    <div className="flex flex-row justify-end gap-4 w-[95.83%] px-6">
                        <label className="font-bold self-center" htmlFor="">{texts.orderByLabel}</label>
                        <select name="" id="" className="self-center bg-slate-200 border-2 border-slate-400 rounded-md px-2 py-1" onChange={(event) => {
                            const params = {
                                ...todoParams,
                                offset: 0,
                                search: "",
                                ...todoOrderBy[
                                        event.target.value as keyof typeof todoOrderBy
                                    ],
                            };
                            setTodoParams(params);
                            getTodoList({
                                params,
                            });
                        }}>
                            <option defaultChecked value="deadlineAsc">Prazo mais próximo</option>
                            <option value="deadlineDesc">Prazo mais longe </option>
                            <option value="createdAtDesc">Criados mais recentes</option>
                            <option value="createdAtAsc">Criados mais antigos</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-bold self-center" htmlFor="">{texts.searchLabel}</label>
                        <input type="text" placeholder="Digite um texto para pesquisar" className="self-center bg-slate-200 border-2 border-slate-400 rounded-md px-2 py-1" value={todoParams.search} onChange={(event) => {
                            const search = event.target.value;
                            const params = {
                                ...todoParams,
                                offset: 0,
                                search,
                            };
                            setTodoParams(params);
                            debounceGetTodoList(params);
                        }}/>
                    </div>
                    <TodoList
                        loadNext={todoParams.offset + todoParams.limit < todoCount}
                        loadPrevious={todoParams.offset > 0}
                        onLoadPrevious={async () => {
                            const nextTodoOffset = todoParams.offset - todoParams.limit;
                            const params = {
                                ...todoParams,
                                offset: nextTodoOffset
                            }
                            setTodoParams(params);
                            getTodoList({
                                params,
                            });
                        }}
                        onLoadNext={async () => {
                            const nextTodoOffset = todoParams.offset + todoParams.limit;
                            const params = {
                                ...todoParams,
                                offset: nextTodoOffset
                            }
                            setTodoParams(params);
                            getTodoList({
                                params,
                            });
                        }}
                        todoList={todoList || []}
                        getTodo={(id) => {
                            getToDo({
                                url: `/todolist/${id}`,
                            })
                        }}
                    />
                </div>           
            )}
            
            <div className="w-2/5">
                <TodoView 
                    {...currentToDo}
                    onDelete={ async () => {
                        await deleteTodo({
                            url: `/todolist/${currentToDo?.id}`,
                        });
                        getTodoList({
                            params: todoParams,
                        });
                        currentToDo.id = undefined;
                        toast(texts.deleteTodoSuccess);
                    }}
                />
            </div>
        </div> 
    ); 
}