class QueryModel {
  query: string;
  description: string;
  id?: number;
  userEmail?: string;
  adminEmail?: string;
  response?: string;
  closed?: boolean;

  constructor(query: string, description: string) {
    this.query = query;
    this.description = description;
  }
}

export default QueryModel;
