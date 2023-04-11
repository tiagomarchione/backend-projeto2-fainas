import { useEffect, useState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import { useAxios } from "../useAxios";
import toast from "react-simple-toasts";
import { useZorm } from "react-zorm";
import { ErrorMessage } from "../Components/ErrorMessage";
import { delay } from "../delay";
import { categories } from "../Constants/categories";
import { todoSchema } from "../todoSchema";

const texts = {
    title: "Editar Faina",
    titleLabel: "Título",
    titlePlaceholder: "Digite o título da Faina",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Digite a descrição da Faina",
    categoryLabel: "Categoria",
    deadlineLabel: "Prazo",
    submitButton: "Salvar edição",
    submitSucess: "Sua Faina foi editada com sucesso!",
    submitFailure: "Não foi possível editar sua Faina devido a um erro",
}


const initialEditTodoState = {
    title: '',
    description: '',
    category: '',
    deadline: '',
} 

export function EditTodo() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialEditTodoState);
    
    const todoForm = useZorm('edit-todo', todoSchema, {
        async onValidSubmit(event) {
            event.preventDefault();
            await EditTodo({
                data: event.data
            });
            setDisabled(true);
            toast(texts.submitSucess)
            await delay(2);
            navigate('/fainas');
        },
    });

    const [disabled, setDisabled] = useState(false);
    const { id } = useParams();
    const [ {data: todoData }, getTodo] = useAxios(
        {
            url: `/todolist/${id}`,
            method: "get",
        },
        {
            manual: true,
        }
    );

    const [, EditTodo] = useAxios(
        {
            url: `/todolist/${id}`,
            method: 'put',
        },
        {
            manual: true,
        }
    ) 

    useEffect(() => {
        getTodo();
    }, []);

    useEffect(() => {
        if(todoData) {
            setForm(todoData);
        }
    }, [todoData]);

    return (
        <section className='flex flex-col md w-11/12 p-6'>
            <form ref={todoForm.ref} className="flex flex-col gap-1 bg-slate-300 shadow-md rounded-xl p-6 w-full">
                <h2 className="font-bold text-4xl text-center w-full">{texts.title}</h2>
                <label className="font-bold mt-6" htmlFor="">{texts.titleLabel}</label>
                <input
                    type="text"
                    disabled={disabled}
                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                    placeholder={texts.descriptionPlaceholder}
                    value={form.title}
                    name={todoForm.fields.title()}
                />
                {todoForm.errors.title(event => <ErrorMessage message={event.message} />)}
                <label className="font-bold mt-6" htmlFor="">{texts.descriptionLabel}</label>
                <textarea
                    rows={5}
                    disabled={disabled}
                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full resize-none"
                    placeholder={texts.descriptionPlaceholder}
                    value={form.description}
                    name={todoForm.fields.description()}
                />
                {todoForm.errors.description(event => <ErrorMessage message={event.message} />)}
                <label className="font-bold mt-6" htmlFor="">{texts.categoryLabel}</label>
                <select
                    required
                    disabled={disabled}
                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                    name={todoForm.fields.category()}
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category, index) => {
                        return  <option key={index} value={category.value}>{category.name}</option>
                    })}
                
                </select>
                {todoForm.errors.category(event => <ErrorMessage message={event.message} />)}
                <label className="font-bold mt-6" htmlFor="">{texts.deadlineLabel}</label>
                <input
                    type="date"
                    disabled={disabled}
                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                    name={todoForm.fields.deadline()}
                />
                {todoForm.errors.deadline(event => <ErrorMessage message={event.message} />)}
                <button
                    type="submit"
                    disabled={disabled}
                    className=" self-center bg-blue-500 hover:bg-blue-700 text-2xl text-white px-4 py-2 font-bold rounded-lg w-full mt-6"
                >{texts.submitButton}</button>  
            </form>
        </section>
    );
}