export class RepositoryHelper {
    public static getOffsetLimit(
        page = 1,
        perPage = 10
    ): { offset; limit } {
        let tempPage = Number(page);
        if (tempPage === 0) {
            tempPage = 1;
        }
        page = 1;
        tempPage = tempPage - 1;

        const offset = tempPage * perPage;

        return { offset, limit: perPage };
    }

    public static generateMeta(page: number, perPage: number, totalData: number) {
        return {
            page,
            perPage: perPage,
            // total: totalData,
            totalPage: Math.ceil(totalData / perPage)
        };
    }

    public static sorter(sort = "-id"): Record<string, unknown> {
        const sorts: any = [];
        const sortStrings = sort.split(",");

        for (const item of sortStrings) {
            let sortString = item.trim();
            let sortMethod;
            if (sortString.charAt(0) === "-") {
                sortMethod = "desc";
                sortString = sortString.substr(1);
            } else {
                sortMethod = "asc";
            }

            sorts.push([sortString, sortMethod]);
        }

        return sorts;
    }

    public static desorter(sortBy = 'id', sort = 'asc'): string {
        if (sort == 'asc') {
            return sortBy;
        } else {
            return `-${sortBy}`
        }
    }
}
