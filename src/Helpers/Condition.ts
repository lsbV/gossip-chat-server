export class Condition {
    public constructor(
        public property: string,
        public value: string | number | boolean,
        public operator: string = "="
    ) {
    }

    public convertToMongooseFilter(): any {
        switch (this.operator) {
            case "=":
                return {[this.property]: this.value};
            case "!=":
                return {[this.property]: {$ne: this.value}};
            case ">":
                return {[this.property]: {$gt: this.value}};
            case "<":
                return {[this.property]: {$lt: this.value}};
            case ">=":
                return {[this.property]: {$gte: this.value}};
            case "<=":
                return {[this.property]: {$lte: this.value}};
            case "like":
                return {[this.property]: {$regex: this.value as string, $options: "i"}};
            case "not like":
                return {[this.property]: {$not: {$regex: this.value as string, $options: "i"}}};
            case "in":
                return {[this.property]: {$in: this.value}};
            case "not in":
                return {[this.property]: {$nin: this.value}};
            default:
                throw new Error("Invalid operator");
        }
    }
}