export enum NamespaceKind {
  User = 'User',
  Organization = 'Organization',
}

export interface Namespace {
  kind: NamespaceKind;
  name: string;
  path: string;
}

export interface Application {
  path: string;
  name: string;
  enable_os: string[];
  namespace: Namespace;
  install_slug: string;
  icon_file: string;
  description: string;
  create_time: string;
}


export interface ApplicationRequest {
  path: string;
  name: string;
  enable_os: string[];
  install_slug: string;
  visibility: string;
  description: string;
}

export function get_namespace_url(namespace: Namespace): string {
  if (namespace.kind == NamespaceKind.User) {
    return `users/${namespace.path}`;
  } else if (namespace.kind == NamespaceKind.Organization) {
    return `orgs/${namespace.path}`;
  }
  return '';
}

export interface Uploader  {
  kind: string;
  name: string;
}

export interface Package {
  package_id: number;
  uploader: Uploader;
  os: string;
  install_url: string;
  name: string;
  version: string;
  short_version: string;
  size: number;
  bundle_identifier: string;
  package_file: string;
  icon_file: string;
  fingerprint: string;
  commit_id: string;
  description: string;
  create_time: string;
}

export interface Release {
  release_id: number;
  release_notes: string;
  enabled: boolean;
  package_id: number;
  os: string;
  install_url: string;
  name: string;
  version: string;
  short_version: string;
  size: number;
  bundle_identifier: string;
  package_file: string;
  icon_file: string;
  fingerprint: string;
  update_time: string;
}