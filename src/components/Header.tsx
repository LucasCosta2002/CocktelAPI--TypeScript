import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

	const [searchFilters, setSearchFilters] = useState({
		ingridient: '',
		category: ''
	})

	const { pathname } = useLocation();

	const isHome = useMemo(() => pathname === '/', [pathname]);

	const fetchCategories = useAppStore(state => state.fetchCategories);
	const categories = useAppStore(state => state.categories);
	const searchRecipies = useAppStore(state => state.searchRecipies);
	const showNotification = useAppStore(state => state.showNotification);

	useEffect(() => {
		fetchCategories()
	}, []);

	const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setSearchFilters({
			...searchFilters,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (Object.values(searchFilters).includes('')) {
			showNotification({
				text: "Todos los campos son obligatorios",
				error: true
			});
			return;
		}
		searchRecipies(searchFilters);
	}

	return (
		<header className={isHome ? 'bg-header bg-cover bg-center' : "bg-slate-800"}>
			<div className="mx-auto container px-4 py-16">
				<div className="flex justify-between items-center">
					<div>
						<img className="w-32" src="/logo.svg" alt="logotipo" />
					</div>
			
					<nav className="flex gap-4">
						<NavLink 
							to="/"
							className={ ({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }
						>Inicio
						</NavLink>
						<NavLink 
							className={ ({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }
							to="/favoritos"
						>Favoritos
						</NavLink>
					</nav>
				</div>

				{ isHome && (
					<form 
						className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
						onSubmit={handleSubmit}
					>
						<div className="space-y-4">
							<label 
								htmlFor="ingridient"
								className="block text-white uppercase font-extrabold text-lg"
							>
								Nombre o Ingrediente
							</label>

							<input 
								type="text" 
								id="ingridient"
								name="ingridient"
								className="p-3 w-full rounded-lg focus:outline-none"	
								placeholder="Ej. Vodka"
								value={searchFilters.ingridient}
								onChange={handleChange}
							/>
						</div>
						<div className="space-y-4">
							<label 
								htmlFor="category"
								className="block text-white uppercase font-extrabold text-lg"
							>
								Categoria
							</label>

							<select 
								id="category"
								name="category"
								className="p-3 w-full rounded-lg focus:outline-none"	
								value={searchFilters.category}
								onChange={handleChange}
							>
								<option value="">-- Seleccione --</option>
								{categories.drinks.map(category => (
									<option 
										key={category.strCategory}
										value={category.strCategory}
									>
										{category.strCategory}
									</option>
								))}
							</select>

							<input 
								type="submit"
								value="Buscar"
								className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg p-2 uppercase"
							/>
						</div>
					</form>
				)}
			</div>
		</header>
	)
}
