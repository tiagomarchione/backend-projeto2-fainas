import { useState } from "react";
import { useAxios } from "../useAxios";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import { useZorm } from "react-zorm";
import { delay } from "../delay";
import { ErrorMessage } from "../components/ErrorMessage";
import { categories } from "../constants/categories";
import { todoSchema } from "../todoSchema";

const texts = {
    title: "Criar Faina",
    titleLabel: "Título",
    titlePlaceholder: "Digite o título da Faina",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Digite a descrição da Faina",
    categoryLabel: "Categoria",
    deadlineLabel: "Prazo",
    submitButton: "Criar Faina",
    submitSucess: "Sua Faina foi criada com sucesso!",
    submitFailure: "Não foi possível cria sua Faina devido a um erro",
}

export function CreateTodo() {
    const navigate = useNavigate();
    const todoForm = useZorm('create-todo', todoSchema, {
        async onValidSubmit(event) {
            event.preventDefault();
            await CreateTodo({
                data: event.data
            });
            setDisabled(true);
            toast(texts.submitSucess)
            await delay(2);
            navigate('/fainas');
        },
    });
    const [disabled, setDisabled] = useState(false);
    const [, CreateTodo] = useAxios(
        {
            url: '/todolist',
            method: 'post',
        },
        {
            manual: true,
        }
    )   
    
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
                    name={todoForm.fields.title()}
                />
                {todoForm.errors.title(event => <ErrorMessage message={event.message} />)}
                <label className="font-bold mt-6" htmlFor="">{texts.descriptionLabel}</label>
                <textarea
                    rows={5}
                    disabled={disabled}
                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full resize-none"
                    placeholder={texts.descriptionPlaceholder}
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
                    className=" self-center bg-green-500 hover:bg-green-700 text-2xl text-white px-4 py-2 font-bold rounded-lg w-full mt-6"
                >{texts.submitButton}</button>  
            </form>
        </section>
    );
}