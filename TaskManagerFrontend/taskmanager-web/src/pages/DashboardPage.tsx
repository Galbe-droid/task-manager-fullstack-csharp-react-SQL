import { useNavigate } from "react-router-dom";
import { SimpleListTodo } from "../components/ToDoList";
import { mapFormatDate, mapStatsKey } from "../mappers/mapper";
import { ToDoStatus } from "../enum/Stats";
import { isAuthenticated } from "../auth/AuthService";


export default function DashboardPage() {
    const navigate = useNavigate();
    const { 
        simpleTodos,
        loading,
        error,
        page,
        totalCount,
        pageSize,
        setPage,
        setSearch,
        setStatus,
        reload 
    } = SimpleListTodo();

    const totalPages = Math.ceil(totalCount / pageSize);   

    if (!isAuthenticated()) return <p className="text-center">Faça Login Primeiro</p>
    if (loading) return <p className="text-center">Carregando...</p>
    if (error) return <p className="text-center">{error}</p>    

    return(        
        <div className="bg-gray-200 flex-1 p-5 items-center">
            <h1 className="text-center text-xl font-bold">Minhas Tasks</h1>
            <div className="text-center pt-4 pb-4">
                <button className="bg-gray-800 text-white w-[125px] h-[30px] hover:bg-sky-700" onClick={reload}>Atualizar List</button>
            </div>
            <div className="flex-1 place-self-center">
                {/* SEARCH */}
                <div className="flex mt-3 mb-3">
                    <p>Busca: </p>
                    <input type="text" placeholder="Buscar:" onChange={(e) => setSearch(e.target.value)} className="ml-2 bg-white w-full"/>
                </div>
                {/* FILTER */}
                <div className="flex place-self-center">
                    <p>Filtro:</p>
                    <select onChange={(e) => setStatus(e.target.value ? Number(e.target.value) : undefined)} className="ml-2 bg-white">
                        <option value="" className="bg-white text-center">Todos</option>
                        {Object.entries(ToDoStatus).map(([key, value]) => (
                            <option key={key} value={value} className="bg-white text-center">{key}</option>
                        ))}
                    </select>
                    
                </div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden"> 
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-3 py-1 text-left">Titulo</th>
                            <th className="px-3 py-1 text-left">Estado</th>
                            <th className="px-3 py-1 text-left">Criado</th>
                            <th className="px-3 py-1 text-left">Termino</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {simpleTodos?.map(todo => (
                            <tr key={todo.id} className="hover:bg-gray-50 transition">
                                <td className="px-2 py-1">{todo.title}</td>
                                <td className="px-2 py-1">{mapStatsKey(todo.stats)}</td>
                                <td className="px-2 py-1">{mapFormatDate(todo.created)}</td>
                                <td className="px-2 py-1">{mapFormatDate(todo.dateLimit)}</td>
                                <td className="px-2 py-1"><button type="button" onClick={() => navigate(`/view/${todo.id}`)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition">Visualizar</button></td>
                                <td className="px-2 py-1"><button type="button" onClick={() => navigate(`/edit/${todo.id}`)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition">Atualizar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*PAGINATION*/}
            <div className="flex place-self-center pt-5">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition mr-4">Anterior</button>
                <span>Pagina {page} de {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition ml-4">Próxima</button>
            </div>
        </div>
    )
}