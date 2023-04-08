export interface FileFilterRequest {
  field: string;
  sortOrder: string;
  limit: number;
  offset: number;
  fileName: string;
  filterOptions: FileFilterOptions;
}

export interface FileFilterOptions {
  scheduleStatus: string[];
  fileDirection: string[];
  fileType: string[];
  supplier: string[];
  region: string[];
  entityType: string[];
  // ToDo: move to common
  quickFilter: {
    quickOption: {
      count: number;
      name: string;
      units: string;
    };
    fromDate?: string;
    toDate?: string;
  };
}
