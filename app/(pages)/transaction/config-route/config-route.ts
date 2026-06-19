export const ROUTES_TRANSACTION = {
  GET_INDEX: ({
    key,
    year,
    limit,
    pageParam,
    currentPath,
    id,
    type,
    publicIdProject,
    searchQuery,
  }: any) => {
    switch (key) {
      case "searchProject":
        return `/admin/${currentPath}/api?key=${key}&search=${searchQuery}`;
      case "projectYear":
        return `/admin/${currentPath}/api?key=${key}&limit=${limit}&pageParam=${pageParam}`;
      case "projectList":
        return `/admin/${currentPath}/api?key=${key}&year=${year}&limit=${limit}&pageParam=${pageParam}`;
      case "projectDescription":
        return `/admin/${currentPath}/api?key=${key}&id=${id}&type=${type}`;
      case "projectUpdate":
        return `/admin/${currentPath}/api?key=${key}&year=${year}&publicIdProject=${publicIdProject}`;
      default:
        return "";
    }
  },
  POST: ({
    key,
    currentPath,
  }: {
    key: "postTransaction" | "uploadNewProject";
    currentPath?: string;
  }) => {
    switch (key) {
      case "postTransaction":
        return `/transaction/api/action?key=${key}`;
      default:
        return "";
    }
  },
  UPDATE_ACTION: ({
    key,
    currentPath,
    year,
  }: {
    key: "updateImage";
    currentPath: string;
    year: string;
  }) => {
    switch (key) {
      case "updateImage":
        return `/admin/${currentPath}/api/action?key=${key}&year=${year}`;
      default:
        return "";
    }
  },
  DELETE_ACTION: ({
    key,
    currentPath,
  }: {
    key: "putDeleteProject";
    currentPath: string;
  }) => {
    switch (key) {
      case "putDeleteProject":
        return `/admin/${currentPath}/api/action?key=${key}`;
      default:
        return "";
    }
  },
};
