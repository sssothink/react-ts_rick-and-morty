import axios from "axios";

export default class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	public async fetchData(endpoint: string): Promise<any> {
		try {
			const response = await axios.get<any>(`${this.baseURL}${endpoint}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching users: ", error);
			throw error;
		}
	}
}
