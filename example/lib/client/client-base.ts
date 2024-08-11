import camelcaseKeys from "camelcase-keys";

export class ClientBase {
  apiBaseUrl: string;

  constructor() {
    if (process.env.NEXT_PUBLIC_API_BASE_URL === undefined) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set");
    }
    this.apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }

  async get<ResT>(path: string): Promise<ResT> {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.toCamel(responseJson);
  }

  async post<ReqT, ResT>(path: string, body: ReqT): Promise<ResT> {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.toCamel(responseJson);
  }

  async delete<ResT>(path: string): Promise<ResT> {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.toCamel(responseJson);
  }

  async throwOnError(response: Response): Promise<void> {
    if (response.status !== 200) {
      const responseJson = await response.json();
      console.error(responseJson);
      throw Error(JSON.stringify(responseJson));
    }
  }

  toCamel(obj: any): any {
    return camelcaseKeys(obj);
  }
}
