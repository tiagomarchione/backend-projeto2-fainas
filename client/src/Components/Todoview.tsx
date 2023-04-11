import { Http2ServerRequest } from "http2";
import type { ToDo } from "../types";
import { getColorByValue } from "../Constants/categories";
import { Link } from "./Link";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { divide } from "lodash";

const texts = {
    deleteButton: "Deletar",
    editButton: "Editar"
};

export type TodoViewProps = Partial<ToDo> & {
    onDelete?: () => Promise<void> | void;
};

export function TodoView({
    id,
    title,
    description,
    deadline = "",
    createdAt,
    category = "",
    onDelete,
}: TodoViewProps) {
    const [{ data: comments }, getComments] = useAxios<{ id: number, todoId: number, message: string }[]>({
        method: 'get',
    }, {
        manual: true,
    });

    useEffect(() => {
        if (id !==undefined) {
            getComments({
                url: `/todolist/comments/${id}`
            });
        }
    }, [id]);

    return (
        <section className='flex flex-row justify-center p-6'>
            <div className="bg-slate-200 shadow-md rounded-xl p-3 w-11/12 justify-center">
                <div className="flex flex-row justify-evenly w-full">
                    {id === undefined && (
                        <div className="flex flex-col p-10">
                            <img src="/logo.png" alt="" className="w-full self-center"/>
                            <h3 className="font-bold text-xl p-4">Escolha uma Faina para ver mais detalhes</h3>
                        </div>
                    )}
                    {id !== undefined && (
                        <div className="w-full">
                            <h3 className="font-bold text-2xl p-4 border-b-slate-300 border-b-2">{title}</h3>
                            <p className="flex font-semibold self-end items-center gap-1 p-4"><span style={{backgroundColor: getColorByValue(category)}} className="flex border h-3 w-3 rounded-full"></span>{ category }</p>
                            <p className="font-semibold text-red-600 p-4">Prazo: {new Date(deadline).toLocaleDateString()}</p>
                            <p className='p-4'>{description}</p>
                            <div className="flex flex-row justify-evenly p-4">
                                <button className="bg-blue-600 text-white text-md w-5/12 py-2 px-4 font-bold rounded-md hover:bg-blue-700">
                                    <Link to={`/editar-faina/${id}`}>{texts.editButton}</Link>
                                </button>
                                <button className="bg-red-600 text-white text-md w-5/12 py-2 px-4 font-bold rounded-md hover:bg-red-700" onClick={onDelete}>{texts.deleteButton}</button>
                            </div>
                            <div>
                                {comments?.map(({ message, id }) => (<p key={id}>{message}</p>))}
                            </div>
                        </div>
                    )}              
                </div>          
            </div>
        </section>
    )
}
