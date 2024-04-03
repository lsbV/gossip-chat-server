export class Filter {
    public constructor(
        public property: string,
        public value: string | number | boolean,
        public operator: string
    ) {
    }

    public convertToMongooseFilter(): any {
        switch (this.operator) {
            case "eq":
                return {[this.property]: this.value};
            case "ne":
                return {[this.property]: {$ne: this.value}};
            case "gt":
                return {[this.property]: {$gt: this.value}};
            case "lt":
                return {[this.property]: {$lt: this.value}};
            case "gte":
                return {[this.property]: {$gte: this.value}};
            case "lte":
                return {[this.property]: {$lte: this.value}};
            case "in":
                return {[this.property]: {$in: this.value}};
            case "nin":
                return {[this.property]: {$nin: this.value}};
            case "like":
                return {[this.property]: {$regex: this.value, $options: "i"}};
            case "nlike":
                return {[this.property]: {$not: {$regex: this.value, $options: "i"}}};
            default:
                throw new Error("Invalid operator");
        }
    }
}