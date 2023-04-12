import { type } from "os";
import type { ToDo } from "../types";
import { getColorByValue } from "../Constants/categories";

const texts = {
  loadNextButton: "Próxima",
  loadPreviousButton: "Anterior",
};

export type TodoListProps = {
    todoList: ToDo[];
    getTodo: (id?: number) => Promise<void> | void;
    loadNext?: boolean;
    loadPrevious?: boolean;
    onLoadNext?: () => Promise<void>;
    onLoadPrevious?: () => Promise<void>;
};

export function TodoList({ todoList, getTodo, loadNext = false, loadPrevious = false, onLoadNext, onLoadPrevious }: TodoListProps) {
    return (
        <section className='flex flex-row'>  
          <div className="p-6">
            <ul className="flex flex-wrap gap-6 justify-evenly">
              {todoList?.map(({ id, title, description, deadline, category }) => (
                <li
                  key={id} 
                  className="bg-slate-200 flex-wrap shadow-md rounded-xl p-3 w-[45%] cursor-pointer hover:bg-slate-300"
                  onClick={() => {
                    getTodo(id);
                  }}
                >
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl border-b-2 border-b-slate-300">{ title }</p>
                    <div className="flex justify-between p-2">
                      <p className="flex font-semibold self-end items-center gap-1"><span style={{backgroundColor: getColorByValue(category)}} className="flex border h-3 w-3 rounded-full"></span>{ category }</p>
                      <time dateTime={deadline} className="font-semibold self-end text-red-600">
                        Prazo: {new Date(deadline).toLocaleDateString()}
                        </time>
                    </div>
                  </div>
                  <p>{ description }</p>
                </li>))} 
            </ul>
            <div className="flex gap-10 justify-center p-4">
              <button disabled={!loadPrevious} onClick={onLoadPrevious} className="bg-blue-600 text-white text-md py-2 px-4 font-bold rounded-md w-1/4 hover:bg-blue-700 disabled:b-blue-300">{texts.loadPreviousButton}</button>
              <button disabled={!loadNext} onClick={onLoadNext} className="bg-blue-600 text-white text-md py-2 px-4 font-bold rounded-md w-1/4 hover:bg-blue-700 disabled:bg-blue-300">{texts.loadNextButton}</button>
            </div>
          </div>
        </section>
    )
}