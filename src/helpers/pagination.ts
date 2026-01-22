interface PaginationInput {
  page: string;
  limit: string;
}

interface PaginationResult {
  limit: number;
  offset: number;
}

const paginationHelper = (options: PaginationInput): PaginationResult => {
  const page = options.page ? Number(options.page as string) : 1;
  const limit = options.limit ? Number(options.limit as string) : 10;
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
  };
};

export default paginationHelper;
