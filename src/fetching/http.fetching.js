export const POST = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'POST',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
		
	}
	
}

export const GET = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'GET',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
		
	}
}

export const PUT = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'PUT',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
		
	}
}

export const DELETE = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'DELETE',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
		
	}
}

const getunnauthenticatedHeaders = () =>{
	const unnauthenticatedHeaders = new Headers()
	unnauthenticatedHeaders.set('Content-Type', 'application/json')
	unnauthenticatedHeaders.set('x-api-key', 'cf336ca7-b72f-4389-b939-f51bfb8b7d0e')
	return unnauthenticatedHeaders
}

const getauthenticatedHeaders = () =>{
	const authenticatedHeaders = new Headers()
	authenticatedHeaders.set('Content-Type', 'application/json')
	authenticatedHeaders.set('x-api-key', 'cf336ca7-b72f-4389-b939-f51bfb8b7d0e')	
	authenticatedHeaders.set('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`)
	return authenticatedHeaders
}
export {getunnauthenticatedHeaders, getauthenticatedHeaders}