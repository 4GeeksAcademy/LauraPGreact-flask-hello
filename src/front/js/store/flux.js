const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: sessionStorage.getItem("token") || null,
            email: sessionStorage.getItem("email") || null,
			users:[],
			validation: false,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			logIn: async (email, password) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await resp.json();
					
                    if (data.token) {
                        sessionStorage.setItem("token", data.token);
                        sessionStorage.setItem("email", email); 
                        setStore({ ...store, token: data.token, email: data.email, validation: true });
                        console.log("Success:", data);
						
                    } else {
                        console.log("Token no recibido:", data);
                    }
                } catch (error) {
                    console.error("Network error", error);
                }
            },

			addUser: async(email, password, name, last_name, is_active)=>{
				const store = getStore();
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`,{
						method :"POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({email, password, name, last_name, is_active})
						
					});
					if (!resp.ok) {
					
						const errorData = await resp.json();
						console.error("Error:", errorData);
						return;
					}
	
					const data = await resp.json();
					const newUsers = [...store.users, data];
					  // Si el backend devuelve un token, guardarlo en sessionStorage y en el store
					if (data.token) {
						
						sessionStorage.setItem("token", data.token);
						sessionStorage.setItem("email", data.email); // También guardar el email en sessionStorage
						
						setStore({ ...store, token: data.token, email: data.email, users: newUsers, validation: true });
						
					} else {
						// Si no hay token, solo actualizamos la lista de usuarios en el store
						setStore({ ...store, users: newUsers });
					}
					console.log("Success:", data);
				} catch (error) {
					// Manejo de errores de red u otros errores
					console.error("Network error:", error);
				}
			},
			handValidation:() => {
				setStore({ validation: false})

			}

	
			
		}
	};
};

export default getState;
