import type { ToDo } from "../types";
import { getColorByValue } from "../Constants/categories";
import toast from "react-simple-toasts";
import { Link } from "./Link";
import { useAxios, axios } from "../useAxios";
import { useEffect, useState } from "react";

const texts = {
    deleteButton: "Deletar",
    editButton: "Editar",
    commentsLabel: "Comentários",
    newComment: "Novo Comentário",
    newCommentPlaceholder: "Adicione um comentário",
    createdNewCommentButton: "Comentar"
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
    const [message, setMessage] = useState("");
    const [{ data: comments }, getComments] = useAxios<{ todoId: number, message: string, commentCreatedAt: string, commentId: number }[]>({
        url: `/todolist/comments/${id}`,
        method: 'get',
    }, {
        manual: true,
    });

    useEffect(() => {
        if (id !==undefined) {
            getComments();
        }
    }, [id]);

    return (
        <section className="flex flex-row justify-center p-6 h-full max-h-[calc(100%-96px)] min-h-[80vh]">
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
                            <div className="flex flex-row justify-evenly p-4 border-b-slate-300 border-b-2">
                                <button className="bg-blue-600 text-white text-md w-5/12 py-2 px-4 font-bold rounded-md hover:bg-blue-700">
                                    <Link to={`/editar-faina/${id}`}>{texts.editButton}</Link>
                                </button>
                                <button className="bg-red-600 text-white text-md w-5/12 py-2 px-4 font-bold rounded-md hover:bg-red-700" onClick={onDelete}>{texts.deleteButton}</button>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-xl py-4">{texts.commentsLabel} ({comments?.length})</h4>
                                {comments?.map(({ commentId, commentCreatedAt, message }) => (
                                    <div key={commentId} className="py-4 border-b-slate-300 border-b">
                                        <div className="flex gap-4 items-center">
                                            <p className="font-bold text-lg">{commentId}</p>
                                            <p className="text-sm text-slate-600">Em {new Date(commentCreatedAt).toLocaleString().replace(","," às")}</p>
                                        </div>
                                        <p className="text-lg">{message}</p>
                                    </div>
                                ))}
                                <form
                                    noValidate
                                    onSubmit={async (event) => {
                                        event.preventDefault();
                                        const { data } = await axios.post("/todolist/comments", {
                                            todoId: id,
                                            message
                                        });

                                        if (data.success) {
                                            toast("Comentário criado com sucesso!");
                                            setMessage("");
                                            await getComments();
                                        } else {
                                            toast("Houve um erro ao criar seu omentário!");
                                        }
                                    }}
                                >
                                    <label className="flex font-bold pt-4 pb-1 pl-2" htmlFor="">{texts.newComment}</label>
                                    <textarea
                                        rows={5}
                                        className="border-2 border-slate-400 rounded-md px-2 py-1 w-full resize-none outline-green-600"
                                        placeholder={texts.newCommentPlaceholder}
                                        name={texts.newComment}
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                    />
                                    <button type="submit" className="bg-green-600 text-white text-md float-right w-5/12 py-2 px-4 font-bold rounded-md hover:bg-green-700">{texts.createdNewCommentButton}</button>
                                </form>
                            </div>
                        </div>
                    )}              
                </div>          
            </div>
        </section>
    )
}
