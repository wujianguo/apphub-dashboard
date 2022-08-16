
export interface Organization {
  path: string;
  name: string;
  visibility: string;
  icon_file: string;
  description: string;
  create_time: string;
}

export interface OrganizationRequest {
  path: string;
  name: string;
  visibility: string;
  description: string;
}

