export interface ICompany {
  name: string;
  size?: string | null;
  industry?: string | null;
}

export interface IJobTitleObject {
  name: string;
  role?: string | null;
  sub_role?: string | null;
  levels?: string[];
}

export interface IExperienceItem {
  company: ICompany;
  title: IJobTitleObject;
  start_date?: string | null;
  end_date?: string | null;
  is_primary: boolean;
  summary?: string | null;
}


export interface IUser {
  _id?: string;
  first_name: string;
  full_name: string;
  last_name:string
  
  industry?: string | string[] | null; 
  
  job_title?: string | IExperienceItem[] | null; 
  
  linkedin_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBaseQuery {
  page?: number;
  limit?: number;
}

export interface IUserQuery extends IBaseQuery {
  search?: string;
  industry?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}